<?php
/**
 * Created by PhpStorm.
 * User: giladtakoni
 * Date: 5/12/15
 * Time: 21:10
 */

$mode = 'debug'; // 'debug' or 'production'

$server = new RestServer($mode);
// $server->refreshCache(); // uncomment momentarily to clear the cache if classes change in production mode

$server->addClass('Controller_Site_Users','user');
//$server->addClass('Test', '/products'); // adds this as a base to all the URLs in this class
$server->handle();