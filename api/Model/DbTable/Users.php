<?php
/**
 * Created by PhpStorm.
 * User: giladtakoni
 * Date: 5/11/15
 * Time: 22:13
 */

class Model_DbTable_Users extends Model_DbTable_Base{

    const PERMISSION_PUBLIC = 1;
    const PERMISSION_USER= 2;
    const PERMISSION_ADMIN = 3;

    const STATUS_WAIT_TO_MAIL_CONFIRM = 1;
    const STATUS_CONFIRM = 4;


    public $first_name;
    public $last_name;
    public $permission;
    public $email;
    public $status;
    public $id;
    public $password;
    public $picture;
    public $session;
    public $registration_token;
    public $userRole;

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
            'password',
            'picture',
            'session',
            'registration_token'
        );

        $this->fieldPDOTypeByName = array(
            'first_name'        =>PDO::PARAM_STR,
            'last_name'         =>PDO::PARAM_STR,
            'permission'        =>PDO::PARAM_INT,
            'email'             =>PDO::PARAM_STR,
            'status'            =>PDO::PARAM_INT,
            'password'          =>PDO::PARAM_STR,
            'picture'           =>PDO::PARAM_STR,
            'registration_token'=>PDO::PARAM_STR,
            'session'           =>PDO::PARAM_STR,
            'id'                =>PDO::PARAM_INT
        );

        parent::__construct();



    }
}