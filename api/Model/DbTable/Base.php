<?php
/**
 * Created by PhpStorm.
 * User: giladtakoni
 * Date: 5/11/15
 * Time: 22:20
 */

class Model_DbTable_Base {

    protected $tableName;
    protected $fields;
    protected $fieldPDOTypeByName = array();

    public function __construct()
    {

    }

    /**
     * @return PDO
     */
    protected function getConn()
    {
        return Db::getInstance()->getConn();
    }

    public function getTableName(){
        return $this->tableName;
    }

    private function createPlaceholder($text, $count=0, $separator=","){
        $result = array();
        if($count > 0){
            for($x=0; $x<$count; $x++){
                $result[] = $text;
            }
        }
        return implode($separator, $result);
    }

    /**
     * @doc  $rows = array(array("date"=>"יט כסלו"),
     * 				 array("date"=>"ח כסלו")
     * 		);
     * @param array $rows
     * @return int
     * @throws App_Mysql_Exceptions
     */
    public function insertOrUpdateCollection(array $rows)
    {
        $typePDOArr = array();
        $question_marks = array();
        $fields_ref =array();
        $row = $this->fields;

        foreach ($rows as &$row){
            foreach ($row as $filed_name=>$val){
                if(isset($this->fieldPDOTypeByName[$filed_name])){
                    $typePDOArr[] =  $this->fieldPDOTypeByName[$filed_name];
                }else{
                    unset($row[$filed_name]);
                }
            }
            $question_marks[] = '('  . $this->createPlaceholder('?', sizeof($row),",",$row) . ')';
            foreach ($row as $key=>$field){
                if(isset($this->fieldPDOTypeByName[$key])){
                    $fields_ref[] = $field;
                }
            }
        }

        $keys = array_keys($rows[0]);
        $query = 'INSERT '.$this->tableName."  (" . implode(",", $keys ) . ") VALUES  ". implode(',', $question_marks);

        $query .= " ON DUPLICATE KEY UPDATE ";
        foreach ($keys as $key){
            $query .= " $key= VALUES($key) ,";
        }
        $query = trim(trim($query),",");

//        die($query);
        $conn = $this->getConn();

        //INSERT users  (first_name,last_name,email,password,permission,status) VALUES  (?,?,?,?,?,?) ON DUPLICATE KEY UPDATE  first_name= VALUES(first_name) , last_name= VALUES(last_name) , email= VALUES(email) , password= VALUES(password) , permission= VALUES(permission) , status= VALUES(status)
        if (!($stmt = $conn->prepare($query))) {
            $error = "error";
            if(DISPLAY_MYSQL_ERRORS){
                $error = "Prepare failed: " .$conn->errorInfo();
            }
            throw new App_Mysql_Exceptions( $error );
        }

        $index = 1;
        foreach ($fields_ref as $key=>&$filed){
            $stmt->bindValue($index, $filed,$typePDOArr[$key]);
            $index++;
        }

        if (!$stmt->execute()) {
            $error = "error";
            if(DISPLAY_MYSQL_ERRORS){
                $error = "Execute failed: " .$conn->errorInfo();
            }
            throw new App_Mysql_Exceptions( $error );
        }

        $result = new stdClass();
        $result->affected = $stmt->rowCount();
        $result->lastInsertId = $conn->lastInsertId();

        return $result;
    }

    public function insertOrUpdate(){
        $row = array();
        foreach($this->fields as $key){
            $row[$key] = $this->$key;
        }

        $result = $this->insertOrUpdateCollection(array($row));
        $this->id = $result->lastInsertId;
        return $result;
    }


    /**
     * @return mixed|string
     */
    private function getQueryJoin(){
        $query  = "SELECT tablefileds fileds FROM $this->tableName ";
        $fields = '';
        $tablefileds ='';
        foreach ($this->fieldPDOTypeByName as $prop=>$val){
            if(strstr($prop, "_id")){
                $table = str_replace("_id", "", $prop)."s";
                $modelName = "Model_DbTable_".ucfirst($table);
                $model = new $modelName();
                foreach ($model->fieldPDOTypeByName as $propModel=>$val){
                    $fields .=" ,`{$table}`.`{$propModel}` as `{$table}_{$propModel}`";
                }
                $query .="INNER JOIN `{$table}` ON `{$this->tableName}`.`{$prop}` = `{$table}`.`id` ";
            }
            $tablefileds .= " `{$this->tableName}`.`{$prop}` ,";
        }

        $tablefileds = rtrim(trim($tablefileds),",");
        $query = str_replace("tablefileds", $tablefileds, $query);
        $fields = rtrim(trim($fields),",");
        $query = str_replace("fileds", $fields, $query);
        return $query;
    }

    /**
     * @param array $where
     * @param bool $hasJoin
     * @param null $limit
     * @param int $start
     * @param null $order
     * @return array
     * @desc $where = array("table_name"=>array("field_name"=>value))
     * @desc $where = array(
     *                  "main_table_name"=>array("field_name"=>value),
     *                  "join_table_name"=>array("field_name"=>value))
     *
     * @throws App_Mysql_Exceptions
     */
    public function fetchAll(array $where = array(), $hasJoin = false, $limit = null, $start = 0, $order = null){
        $query = '';
        $whereQuery = '';
        if(!$hasJoin){
            $query = "SELECT * FROM $this->tableName";
        }
        if($hasJoin){
            $query = $this->getQueryJoin($this->tableName);
        }

        if(!empty($where)){
            $whereQuery = ' WHERE';
            $fileds =array();
            $fileds_ref =array();
            $types= "";
            foreach ($where as $tableName=>$fields){
                $modelName = "Model_DbTable_".ucfirst($tableName);

                $model = new $modelName();
                foreach ($fields as $fieldName=>$val){
                    $types .= $model->fieldPDOTypeByName[$fieldName];
                    $fileds_ref[] = $val;
                    $whereQuery .= " `$tableName`.`$fieldName` = ? AND";
                }
            }
            $whereQuery = trim($whereQuery,"AND");

// 			for ($i=0; $i<count($fileds_ref); $i++){
// 				$fileds[] = &$fileds_ref[$i];
// 			}
        }
        $query .= $whereQuery;

        if($order != null){
            $query .= 'ORDER BY '.$order;
        }

        if($limit != null){
            $query .=" LIMIT {$start},{$limit}";
        }


        $conn = $this->getConn();


        if (!($stmt = $conn->prepare($query))) {
            $error = "error";
            if(DISPLAY_MYSQL_ERRORS){
                $error = "Prepare failed: " .$conn->errorInfo();
            }
            throw new App_Mysql_Exceptions( $error );
        }

        if(!empty($where)){
// 			$ref = new ReflectionClass('mysqli_stmt');
// 			$method = $ref->getMethod("bind_param");
// 			$refArr = array_merge(array("0"=>$types),$fileds);
// 			$method->invokeArgs($stmt,$refArr);
            $index =1;
            foreach ($fileds_ref as $key=>&$filed){
                $stmt->bindParam($index, $filed,PDO::PARAM_STR);
                $index++;
            }
        }

        if (!$stmt->execute()) {
            $error = "error";
            if(DISPLAY_MYSQL_ERRORS){
                $error = "Execute failed: " .$conn->errorInfo();
            }
            throw new App_Mysql_Exceptions( $error );
        }

        $result = $stmt->fetchAll(PDO::FETCH_OBJ);
// 		$rows = array();
// 		while($row = $result->fetch_object()){
// 			$rows[] = $row;
// 		}
        return $result;
    }


    /**
     * @desc $where = array("table_name"=>array("field_name"=>value))
     *
     * @param array $where
     * @param $withJoin
     * @return null
     * @throws App_Mysql_Exceptions
     */
    public function fetchOne(array $where,$withJoin = false)
    {
        #TODO App_Mysql_Exceptions
        $rows = $this->fetchAll($where,$withJoin,1);
//        foreach($rows[0] as $key=>$val){
//            if(isset($this->$key)){
//                $this->$key = $rows[0]->$key;
//            }
//        }
        return count($rows) ? $rows[0] : null;
    }

}