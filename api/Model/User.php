<?php
/**
 * Created by PhpStorm.
 * User: giladtakoni
 * Date: 5/15/15
 * Time: 13:32
 */

class Model_User extends Model_DbTable_Users{

    public function __construct()
    {
        parent::__construct();
    }

    public function cleanOutput(){
        unset($this->registration_token);
        unset($this->session);
        unset($this->status);
        unset($this->password);
        unset($this->ip);
        unset($this->last_time_login);
        unset($this->permission);
        return $this;
    }
}