package com.revature.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.revature.models.User;
import com.revature.service.UserService;

@RestController
@RequestMapping("users") // -> localhost:8080/users
@CrossOrigin("*")
public class UserController {
	
	@Autowired
	UserService us;
	
	@GetMapping
	public List<User> getAll(){
		return us.findAll();
	}
	
	@PostMapping
	public User createNewUser(@RequestBody User u) {
		return us.add(u);
	}
	
	@PutMapping
	public User updateUser(@RequestBody User u) {
		return us.update(u);
	}
	
	@DeleteMapping
	public boolean deleteUser(@RequestBody User u) {
		return us.delete(u);
	}
	
	// Get by Username
	@GetMapping("{username}") // -> localhost:8080/users/bserfozo -> pull info for user with username bserfozo
	public User getUser(@PathVariable("username") String username) {
		return us.getByUsername(username);
	}
	
	// Login
	@PostMapping("login")
	public ResponseEntity<User> login(@RequestBody LoginObj loginObj){
		User u = us.login(loginObj.username, loginObj.password);
		if (u == null) {
			return null; //You could probably return a response entity with some error code hint hint nudge nudge
		}
		HttpHeaders headers = new HttpHeaders();
		headers.set("id", String.valueOf(u.getId()));
		return new ResponseEntity<User>(u, headers,HttpStatus.OK);
	}
	
	
	// Enroll
	@PostMapping("enroll/{courseNum}")
	public ResponseEntity<User> enrollUser(@PathVariable("courseNum") String courseNum, @RequestHeader("id") int id) {
		User u = us.enroll(id, courseNum);
		
		return new ResponseEntity<User>(u, HttpStatus.OK);
	}
	

}
class LoginObj{
	public String username;
	public String password;
}
