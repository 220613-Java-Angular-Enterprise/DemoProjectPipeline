package com.revature.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.revature.data.CourseRepository;
import com.revature.models.Course;

@Service
public class CourseService {
	
	@Autowired
	CourseRepository cr;
	
	public List<Course> findAll(){
		// Calls upon a pre-generated method from repo
		return cr.findAll();
	}
	
	public Course add(Course c) {
		return cr.save(c);
	}
	
	public Course update(Course c) {
		return cr.save(c);
	}
	
	public boolean delete(Course c) {
		cr.delete(c);
		return (cr.existsById(c.getId()) ? false : true);
	}
	
	public Course findById(int id) {
		return cr.getReferenceById(id);
	}
	
	// Now we need our two methods that call upon our custom methods from the repo
	public Course getByCourseNum(String courseNum) {
		return cr.getByCourseNum(courseNum);
	}

	public List<Course> getAllAvailable(){
		return cr.getAvailableCourse();
	}
}
