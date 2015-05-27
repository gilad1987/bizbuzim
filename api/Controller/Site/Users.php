<?php
/**
 * Created by PhpStorm.
 * User: giladtakoni
 * Date: 5/10/15
 * Time: 23:42
 */

class Controller_Site_Users extends Controller_Users{


    public function __construct()
    {
        parent::__construct();
    }

    /**
     * @url GET /
     */
    public function getLogged(){
        $user = $this->_auth->getLoggedUser();
        if(isset($user->id)){
            $user->userRole = $user->permission;
            return array('user'=>$user->cleanOutput());
        }
        return array('status'=>'No user are logged');
    }


    /**
     * @url POST /
     * @return stdClass
     * @throws RestException
     */
    public function signUpOrLogin()
    {
        $this->checkCSRF();

        $loggedUser = $this->_auth->getLoggedUser();
        $response = new stdClass();

        if($loggedUser != null){
            $response->user = $loggedUser;
            $response->status = 'logged';
        }else{
            $post = $this->_http->getPost();

            if(!isset($post['email'])){
                throw new RestException(200,json_encode(array('message'=>'Email is missing')));
            }

            if(!FormValidator::validateItem($post['email'],'email')){
                throw new RestException(200,json_encode(array('message'=>'Invalid Email address')));
            }

            $userExist = $this->get(array('email'=>$post['email']));

            if($userExist != null){
                if(isset($post['password']) && ($userExist->password == $this->encrypt($post['password']))){
                    $this->login($userExist);
                    $response->status = 'login';
                    $response->user = $userExist;
                }else{
                    $response->message = 'Mail already exist';
                    throw new RestException(200,json_encode($response));
                }
            }else{
                $this->signUp();
                $response->status = 'signup';
            }
        }

        if(isset($response->user)){
            $response->user->userRole = $response->user->permission;
            $response->user->cleanOutput();
        }

        $response->token = CSRFUtil::getInstance()->getToken(true);
        return $response;


    }

    /**
     * @return Model_User
     */
    private function signUp()
    {
        $user = $this->buildUserPreSignUp();
        $user->insertOrUpdate();
        return $user;
    }

    /**
     * @param bool $throw
     * @return bool
     * @throws RestException
     */
    public function checkCSRF($throw = true){
        if(!$this->csrfIsValid()){
            if($throw){
                throw new RestException(200,json_encode(array('msg'=>'Invalid auth')));
            }else{
                return false;
            }
        }

        return true;
    }

}