<?php
/**
 * Created by PhpStorm.
 * User: giladtakoni
 * Date: 5/10/15
 * Time: 23:42
 */

class Controller_Site_Users extends Controller_Users{

    /**
     * @url POST /
     */
    public function signUp()
    {
        $user = $this->preSignUp();
        if($user==null){
            return array('error'=>array('msg'=>'user exist'));
        }

        $user->insertOrUpdate();

        return $user;
    }

    /**
     * @return bool
     */
    public function authorize(){
        return true || $this->csrfIsValid();
    }

}