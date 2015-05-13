<?php

class Http
{
	const DEFAULT_LAYOUT = 'Site';
	
    private static $_instance;

    public static function getInstance()
    {
        if(self::$_instance === null){
            self::$_instance = new self();
        }
        
        return self::$_instance;
    }

    private function __construct()
    {

    }

    public function __get($paramName)
    {
        return $this->getParam($paramName);
    }

    public function __set($paramName, $paramVal)
    {
        $this->$paramName = $paramVal;
    }
    
    public function getParam($paramName)
    {
    	return isset($_REQUEST[$paramName]) ? $_REQUEST[$paramName] : null;
    }

    public function getPost(){
        return $_POST;
    }

    public function isPost(){
    	
    }
    
    public function isGet(){
    	
    }
    
    public function isXHR(){
    	return array_key_exists('HTTP_X_REQUESTED_WITH', $_SERVER) && $_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest';
    }
    

}