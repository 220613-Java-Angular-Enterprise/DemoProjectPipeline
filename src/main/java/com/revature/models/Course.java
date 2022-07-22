package com.revature.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "courses")
public class Course {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String courseNum;
	
	private String name;
	
	private String description;
	
	private int availableSeats;

	public Course(String courseNum, String name, String description, int availableSeats) {
		super();
		this.courseNum = courseNum;
		this.name = name;
		this.description = description;
		this.availableSeats = availableSeats;
	}
	
	
}
