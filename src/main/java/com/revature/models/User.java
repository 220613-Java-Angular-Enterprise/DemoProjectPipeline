package com.revature.models;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String first;
	
	private String last;
	
	private String username;
	
	private String password;
	
	private String email;
	
	@ManyToMany
	private List<Course> courses;

	public User(String first, String last, String username, String password, String email, List<Course> courses) {
		super();
		this.first = first;
		this.last = last;
		this.username = username;
		this.password = password;
		this.email = email;
		this.courses = courses;
	}

	public User(String first, String last, String username, String password, String email) {
		super();
		this.first = first;
		this.last = last;
		this.username = username;
		this.password = password;
		this.email = email;
	}
	
	

}
