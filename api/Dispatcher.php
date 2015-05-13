<?php

class Dispatcher
{
    public static $filePrefix = '';

    public static function initAutoLoad()
    {

        function __autoload($className)
        {

            $className = Dispatcher::$filePrefix.$className;

            $classNameArr = explode('_', $className);
            $pathToClass = '';
            $ds = DIRECTORY_SEPARATOR;

            foreach($classNameArr as $partOfPath){
                if($pathToClass){
                    $pathToClass .= $ds;
                }
                $pathToClass .= $partOfPath;
            }
            
            $pathToClass .= '.php';

            if(!is_file($pathToClass)){
            	throw new AppException(501,"File -- {$pathToClass} -- No found to include");
            }
            
            require_once $pathToClass;
        }
    }


}

class AppException extends Exception
{

    public function __construct($code, $message = null)
    {
        parent::__construct($message, $code);
    }

}