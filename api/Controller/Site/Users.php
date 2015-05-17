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
            throw new RestException(200,json_encode(array('msg'=>'Invalid auth')));
        }

        $user = $this->buildUserPreSignUp();
        $fieldsToCheck = array(
            'email'=>$user->email
        );
        $userExist = $this->isExist($user,$fieldsToCheck);

        $response = new stdClass();
        if($userExist != null){
            if($this->encrypt($userExist->password) != $this->encrypt($user->password)){
//                $response->success = false;
                $response->message = 'Mail already exist';
                throw new RestException(200,json_encode($response));

            }
            $this->login($userExist);
            $userExist->userRole = $userExist->permission;
            $response->user = $userExist->cleanOutput();
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