<?php
/**
 * Created by PhpStorm.
 * User: giladtakoni
 * Date: 5/10/15
 * Time: 23:42
 */

class Controller_Site_Users extends Controller_Users{


    /**
     * @url POST /user
     */
    public function _login(){
        $this->checkAuth();
        $post = $this->_http->getPost();
        $user = new Model_Site_User();
        $terms = array();
        if(!empty($post->password)){
            $terms['password'] = $post->password;
        }
        if(!empty($post->email)){
            $terms['email'] = $post->email;
        }


        $validations = array(
            'email'=>'email',
            'password'=>'anything'
        );

        $required = array('email', 'password');
        $sanitize = array('first_name', 'last_name', 'email', 'password');
        $validator = new FormValidator($validations, $required, $sanitize);

        if( !$validator->validate($terms) ){
            throw new RestException(200,json_encode($validator->getErrors()));
        }

        $validator->sanitize($terms);
        $user->password = $terms['password'];
        $user->email = $terms['email'];
        $this->login($user);

        return array('success'=>true);

    }

    /**
     * @url POST /
     */
    public function signUp()
    {
        $this->checkAuth();

        $user = $this->buildUserPreSignUp();
        $fieldsToCheck = array(
            'email'=>$user->email
        );
        $userExist = $this->isExist($user,$fieldsToCheck);
        $response = new stdClass();
        if($userExist){
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
     * @throws RestException
     */
    public function checkAuth(){
        if(!$this->csrfIsValid()){
            throw new RestException(200,json_encode(array('msg'=>'Invalid auth')));
        }
        return true;
    }

}