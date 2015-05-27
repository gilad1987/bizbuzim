<?php
/**
 * Created by PhpStorm.
 * User: giladtakoni
 * Date: 5/10/15
 * Time: 23:42
 */

class Controller_Users extends Controller_Base{

    /**
     * @var auth
     */
    protected $_auth;

    public function __construct()
    {
        $this->_auth = Auth::getInstance();
        parent::__construct();
    }

    /**
     * @return Model_User | null
     */
    public function getLogged(){
        return $this->_auth->getLoggedUser();
    }

    /**
     * @return bool
     */
    public function isAdmin(){
        $this->getLogged() && $this->getLogged()->permission >= Model_DbTable_Users::PERMISSION_ADMIN;
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

        $user->first_name = isset($post['first_name']) ? $post['first_name'] : null;
        $user->last_name = isset($post['last_name']) ? $post['last_name'] : null;
        $user->password = isset($post['password']) ? $this->encrypt($post['password']) : null;
        $user->permission = Model_DbTable_Users::PERMISSION_USER;
        $user->email = $post['email'];
        #TODO change status to STATUS_WAIT_TO_MAIL_CONFIRM
        $user->status = Model_DbTable_Users::STATUS_CONFIRM;

        return $user;
    }


    /**
     * @param Model_User $user
     * @param array $fieldsToCheck
     * @return bool| Model_User
     */
    protected function isExist(Model_User $user, $fieldsToCheck = array())
    {
        $user = $this->get($user, $fieldsToCheck);
        return $user == null ? false : $user;
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
     * @param array $terms
     * @return null | Model_User
     */
    public function get(array $terms)
    {
        if(empty($terms)){
            return null;
        }

        $user = new Model_User();
        $fields = array();

        foreach($terms as $key => $val){
            if(property_exists($user,$key)){
                $fields[$key] = $val;
            }
        }

        $_terms = array($user->getTableName() => $fields);

        $user = $user->fetchOne($_terms);

        return $user == null ? null : $user;
    }

    protected function getAll(){
        $model = new Model_DbTable_Users();
        return $model->fetchAll();
    }


    /**
     * @param Model_User $user
     * @return Model_User
     * @throws exception
     */
    protected function login(Model_User $user){
        $this->_auth->login($user);
        return $this;
    }
}