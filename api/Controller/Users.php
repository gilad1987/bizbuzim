<?php
/**
 * Created by PhpStorm.
 * User: giladtakoni
 * Date: 5/10/15
 * Time: 23:42
 */

class Controller_Users extends Controller{

    const COOKIE_NAME = 'SDFdsf098_sdf';

    /**
     * @var Model_User | null
     */
    private static $loggedUser = null;

    /**
     * @return Model_User | null
     */
    public function getLogged(){
        return self::$loggedUser;
    }

    /**
     * @return bool
     */
    public function isAdmin(){
        $this->getLogged() &&
        self::$loggedUser->permission == Model_DbTable_Users::PERMISSION_ADMIN;
    }

    /**
     * @return Model_User
     * @throws RestException
     */
    protected function buildUserPreSignUp()
    {
        $post = $this->_http->getPost();
        $this->signUpValidation($post);

        $modelName = $this->getModel();
        $user = new $modelName();

        $user->first_name = $post['first_name'];
        $user->last_name = $post['last_name'];
        $user->password = $this->encrypt($post['password']);
        $user->permission = Model_DbTable_Users::PERMISSION_USER;
        $user->email = $post['email'];
        #TODO check status to STATUS_WAIT_TO_MAIL_CONFIRM
        $user->status = Model_DbTable_Users::STATUS_CONFIRM;

        return $user;
    }


    /**
     * @param Model_User $user
     * @param array $fieldsToCheck
     * @return bool| Model_User
     */
    protected function isExist(Model_User $user, $fieldsToCheck = array()){

        $terms = array(
            $user->getTableName() => (!empty($fieldsToCheck) ? $fieldsToCheck : array('email'=>$user->email))
        );
        $row = $user->fetchOne($terms);
        $_user =new Model_User();
        foreach($user as $key=>$val){
            if(isset($row->$key)){
                $_user->$key = $row->$key;
            }
        }

        return $row == null ? false : $_user;
    }


    /**
     * @param array $post
     * @return array
     * @throws RestException
     */
    private function signUpValidation(array &$post){

        $validations = array(
            'first_name'=>'anything',
            'last_name'=>'anything',
            'email'=>'email',
            'password'=>'anything'
        );

        $required = array('first_name', 'last_name', 'email', 'password');
        $sanitize = array('first_name', 'last_name', 'email', 'password');
        $validator = new FormValidator($validations, $required, $sanitize);

        if( !$validator->validate($post) ){
          throw new RestException(200,json_encode($validator->getErrors()));
        }


        return $validator->sanitize($post);
    }


    /**
     * @return Model_DbTable_Users|null
     */
    public function get()
    {
        #TODO IMPLEMENT
        if(true){
            return null;
        }
        return new Model_DbTable_Users();
    }

    protected function getAll(){
        $model = new Model_DbTable_Users();
        return $model->fetchAll();
    }


    /**
     * @param Model_User $user
     * @return Model_User
     */
    public function login(Model_User $user){

        $user->session = md5($user->email.uniqid(rand(1,987987987)));
        setcookie(Controller_Users::COOKIE_NAME,$user->session,null,null,'/');
        $user->insertOrUpdate();
        return $user;

    }
}