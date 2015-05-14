<?php
/**
 * Created by PhpStorm.
 * User: giladtakoni
 * Date: 5/1/15
 * Time: 01:09
 */
//echo 'before mail';
//$headers = array("From: gilad@support.com",
////    "Reply-To: replyto@example.com",
////    "X-Mailer: PHP/" . PHP_VERSION
//);
//$headers = implode("\r\n", $headers);
//$a = mail('gilad1987@gmail.com','sub','msg',$headers);
//var_dump($a);
//die();

include_once 'RestServer.php';
include_once 'Dispatcher.php';
Dispatcher::initAutoLoad();
Config::getInstance();
include_once 'RestRoutConfig.php';