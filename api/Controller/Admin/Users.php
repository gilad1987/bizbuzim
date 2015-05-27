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
        $user = $this->getLogged();
        return ($user != null && $user->permission == Controller_Users::PERMISSION_ADMIN);
    }

    /**
     * @url GET /
     */
    public function index()
    {
        return $this->getAll();
    }


}