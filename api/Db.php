<?php
class Db
{
	private $host = DB_HOST;	
	private $schema = DB_SCHEMA;	
	private $user = DB_USER;	
	private $pass = DB_PASS;	
	
	private static $_instance;
	private $_conn;
	
	public static function getInstance()
	{
		if(self::$_instance === null){
			self::$_instance = new self();
		}
	
		return self::$_instance;
	}
	
	private function __construct()
	{
		try{
 			$options = array(
 					PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES \'utf8\'',
 			);

			$this->_conn = new PDO("mysql:host=".$this->host.";dbname=".$this->schema, $this->user, $this->pass, $options );
			$this->_conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
// 			$this->_conn->setAttribute(PDO::MYSQL_ATTR_INIT_COMMAND, 'SET NAMES utf8');
		}catch (PDOException $e){
            die($e->getMessage());
		}
	}
	
	public function getConn()
	{
		return $this->_conn;
	}
	
	public  function __destruct()
	{
		$this->_conn = null;
	}
}