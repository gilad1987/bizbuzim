<?php
/**
 * Created by PhpStorm.
 * User: giladtakoni
 * Date: 5/10/15
 * Time: 23:42
 */

class Controller_Admin_Users extends Controller_Users{

    public function authorize()
    {
        return true;
    }

    /**
     * @url POST /
     */
    public function _signUp()
    {
        return $this->signUp();
    }
}