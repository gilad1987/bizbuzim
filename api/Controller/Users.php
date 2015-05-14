<?php
/**
 * Created by PhpStorm.
 * User: giladtakoni
 * Date: 5/10/15
 * Time: 23:42
 */

class Controller_Users extends Controller{


    const PERMISSION_PUBLIC = 1;
    const PERMISSION_USER= 2;
    const PERMISSION_ADMIN = 3;

    const STATUS_CONFIRM = 2;
    const STATUS_NOT_CONFIRM = 1;

    /**
     * @return Model_DbTable_Users
     * @throws RestException
     */
    protected function preSignUp()
    {
        $post = $this->_http->getPost();
        $this->signUpValidation($post);

        $modelName = $this->getModel();

        $user = new $modelName();

        $user->first_name = $post['first_name'];
        $user->last_name = $post['last_name'];
        $user->password = $post['password'];
        $user->permission = self::PERMISSION_USER;
        $user->email = $post['email'];
        $user->status = self::STATUS_CONFIRM;

        if(!$this->isExist($user)){
            return null;
        }

        return $user;
    }

    /**
     * @param Model_DbTable_Base $user
     * @return bool
     */
    private function isExist(Model_DbTable_Base $user){
        $terms = array(
            $user->getTableName() => array('email'=>$user->email)
        );
        return $user->fetchOne($terms) == null;
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
          throw new RestException(400);
        }

        return $validator->sanitize($post);
    }


    /**
     * @return Model_DbTable_Users|null
     */
    public function getLogin()
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
}