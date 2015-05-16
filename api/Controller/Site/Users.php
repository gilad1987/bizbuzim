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
        if(!$this->csrfIsValid()){
            throw new RestException(200,json_encode(array('msg'=>'invalid auth')));
        }

        $user = $this->buildUserPreSignUp();
        $fieldsToCheck = array(
            'email'=>$user->email
        );
        $user_exist = $this->isExist($user,$fieldsToCheck);

        $response = new stdClass();
        if($user_exist != null){
            if($this->encrypt($user_exist->password) != $this->encrypt($user->password)){
                $response->success = false;
                $response->message = 'Mail already exist';
                throw new RestException(200,json_encode($response));

            }
            $this->login($user_exist);
            $response->user = new stdClass();
            $response->user->first_name = $user_exist->first_name;
            $response->user->userRole = $user_exist->permission;
            $response->user->last_name = $user_exist->last_name;
            $response->user->id = $user_exist->id;
            $response->user->picture = $user_exist->picture;

            $response->token = CSRFUtil::getInstance()->getToken(true);

            return $response;
        }

        $user->insertOrUpdate();
        $response->success = true;

        return $response;
    }

    /**
     * @return bool
     */
    public function authorize(){
        return true || $this->csrfIsValid();
    }

}