<?php
/**
 * Created by PhpStorm.
 * User: giladtakoni
 * Date: 5/10/15
 * Time: 23:42
 */

class Controller_Site_Users extends Controller_Users{

    /**
     * @url GET /
     */
    public function index()
    {
        return 'user model';
    }

    /**
     * @url POST /
     */
    public function signUp()
    {
        $user = $this->preSignUp();
        $user->insertOrUpdate();

        return $user;
    }

}