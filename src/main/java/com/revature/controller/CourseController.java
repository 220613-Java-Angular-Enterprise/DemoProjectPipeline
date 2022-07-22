package com.revature.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.revature.models.Course;
import com.revature.service.CourseService;

@RestController
@RequestMapping("courses")
@CrossOrigin("*")
public class CourseController {
	
	@Autowired
	CourseService cs;
	
	@GetMapping // -> localhost:8080/courses/
	public List<Course> getAllCourses(){
		return cs.findAll();
	}
	
	
	@PostMapping // -> localhost:8080/courses/ but this is a POST request vs a GET request
	public Course addCourse(@RequestBody Course c) {
		return cs.add(c);
	}
	
	@GetMapping("available") // -> localhost:8080/courses/available
	public List<Course> getAllAvailableCourses(){
		return cs.getAllAvailable();
	}
	
	@GetMapping("{courseNum}") // -> localhost:8080/courses/MATH101 -> retrieve info for MATH101
	public Course getCourse(@PathVariable("courseNum") String courseNum) {
		return cs.getByCourseNum(courseNum);
	}
	
	@PutMapping
	public Course update(@RequestBody Course c) {
		return cs.update(c);
	}
	
	@DeleteMapping
	public boolean delete(@RequestBody Course c) {
		return cs.delete(c);
	}

}
