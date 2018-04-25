<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class User_model extends CI_Model
{	
	function __construct(){
		parent::__construct();
	}

	function getUsers()
	{
		$this->db->select('*');
		$query = $this->db->get('users');
		$result = $query->row_array();
		return $result;
	}
}
?>