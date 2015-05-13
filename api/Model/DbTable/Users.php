<?php
/**
 * Created by PhpStorm.
 * User: giladtakoni
 * Date: 5/11/15
 * Time: 22:13
 */

class Model_DbTable_Users extends Model_DbTable_Base{

    public $first_name;
    public $last_name;
    public $permission;
    public $email;
    public $status;
    public $id;
    public $password;

    public function __construct()
    {
        $this->tableName = 'users';

        $this->fields = array(
            'first_name',
            'last_name',
            'permission',
            'email',
            'status',
            'id',
            'password'
        );

        $this->fieldPDOTypeByName = array(
            'first_name'=>PDO::PARAM_STR,
            'last_name' =>PDO::PARAM_STR,
            'permission'=>PDO::PARAM_INT,
            'email'     =>PDO::PARAM_STR,
            'status'    =>PDO::PARAM_INT,
            'password'  =>PDO::PARAM_STR,
            'id'        =>PDO::PARAM_INT
        );

        parent::__construct();

    }
}