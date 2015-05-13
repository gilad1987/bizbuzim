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

}