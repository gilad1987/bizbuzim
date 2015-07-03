<?php
/**
 * Created by PhpStorm.
 * User: giladtakoni
 * Date: 5/17/15
 * Time: 09:18
 */

class Auth {

    const COOKIE_NAME = 'SDFdsf098_sdf';

    private static $_instance;

    /**
     * @var Model_User | null
     */
    private static $loggedUser = null;

    public static function getInstance()
    {
        if(self::$_instance === null){
            self::$_instance = new self();
        }

        return self::$_instance;
    }

    public function __construct()
    {

    }

    /**
     * @return Model_User|null
     * @throws RestException
     */
    public function checkUserLogged()
    {
        if($this->getLoggedUser() == null){
            throw new RestException(401);
        }

        return $this->getLoggedUser();
    }

    /**
     * @return Model_User|null
     */
    public function getLoggedUser(){
        if(self::$loggedUser != null){
            return self::$loggedUser;
        }

        if(!isset($_COOKIE[self::COOKIE_NAME])){
            return null;
        }

        $user = new Model_User();
        $user->session = $_COOKIE[self::COOKIE_NAME];
        $terms = array(
            $user->getTableName()=>array('session'=>$_COOKIE[self::COOKIE_NAME])
        );

        return self::$loggedUser = $user->fetchOne($terms);
    }

    /**
     * @param Model_User $user
     * @return Model_User
     * @throws exception
     */
    public function login(Model_User $user)
    {
        if(!isset($user->id)){
            throw new exception('Invalid user to login - missing id');
        }
        $user->session = md5($user->email.uniqid(rand(1,987987987)));
        $user->ip = $_SERVER['REMOTE_ADDR'];
        $user->last_time_login = date('Y-m-d H:i:s');
        $user->insertOrUpdate();

        setcookie(self::COOKIE_NAME,$user->session);
        return self::$loggedUser = $user;
    }

}