<?php
Class Controller
{
    protected $_http;

    public function __construct()
    {
        $this->_http = Http::getInstance();
    }

    
    public function indexAction()
    {

    }


    protected function getModel()
    {
    	$ctrlNameArr = explode('_', get_class($this));
        $len = count($ctrlNameArr);
        $modelName = 'Model';

        for($i=1; $i<$len; $i++){
            $modelName .= '_'.$ctrlNameArr[$i];
        }

    	return  $modelName;
    }

    public function csrfIsValid(){
        return $this->_http->isXHR() && CSRFUtil::getInstance()->isValid();
    }
}