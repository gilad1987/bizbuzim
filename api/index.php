<?php
/**
 * Created by PhpStorm.
 * User: giladtakoni
 * Date: 5/1/15
 * Time: 01:09
 */
include_once 'RestServer.php';
include_once 'Dispatcher.php';
Dispatcher::initAutoLoad();
Config::getInstance();
$mode = 'debug'; // 'debug' or 'production'

$server = new RestServer($mode);
// $server->refreshCache(); // uncomment momentarily to clear the cache if classes change in production mode

$server->addClass('Controller_Site_Users','users');
$server->addClass('Controller_Admin_Users','admin/users');
//$server->addClass('Test', '/products'); // adds this as a base to all the URLs in this class
$server->handle();