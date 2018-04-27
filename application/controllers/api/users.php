<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require APPPATH . '/libraries/REST_Controller.php';
/**
 * Example
 * This Class used for REST API
 * (All THE API CAN BE USED THROUGH POST METHODS)
 * @package     CodeIgniter
 * @subpackage  Rest Server
 * @category    Controller
 * @author      Phil Sturgeon
 * @link        http://philsturgeon.co.uk/code/
 */
// This can be removed if you use __autoload() in config.php OR use Modular Extensions
class Users extends REST_Controller {
    //header('Access-Control-Allow-Origin : *');

    /**
     * @Summary: call parent constructor
     * @create_date: Thursday, July 11, 2014
     * @last_update_date:
     * @access: public
     * @param:
     * @return:
     */
    function __construct() {
        parent::__construct();
    }

    function getUsers_post()
    {
        $Return['ResponseCode'] = 200;
        //$Return['Message'] = lang('success');
        $Return['Data'] = array();
        $Return['ServiceName'] = 'api/user/getUsers';
        $this->load->model('user_model');
        $Return['Data'] = $this->user_model->getUsers();
        $this->response($Return);
    }

    function uploadFile_post()
    {
         $this->load->helper(array('form', 'url'));
         $config['upload_path']          = './assets/img';
         $config['allowed_types']        = 'gif|jpg|png|pdf|doc';
         $config['max_size']             = 100;
         $config['max_width']            = 1024;
         $config['max_height']           = 768;
         print_r($config);
         die('aaa');

         $this->load->library('upload', $config);
         $this->load->library('form_validation');

         if ( ! $this->upload->do_upload('userfile'))
         {
            $this->form_validation->set_error_delimiters('<p class="error">', '</p>');
            $error = array('error' => $this->upload->display_errors());

                    $this->load->view('upload', $error);
                }
                else
                {
                    $data = array('upload_data' => $this->upload->data());

                    $this->load->view('success', $data);
                }
    }
}