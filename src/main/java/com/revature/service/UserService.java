package com.revature.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.revature.data.CourseRepository;
import com.revature.data.UserRepository;
import com.revature.models.Course;
import com.revature.models.User;

@Service
public class UserService {
	
	@Autowired
	UserRepository ur;
	
	@Autowired
	CourseRepository cr;
	
	public List<User> findAll(){
		return ur.findAll();
	}
	
	public User add(User u) {
		return ur.save(u);
	}
	
	public User update(User u) {
		return ur.save(u);
	}
	
	public boolean delete(User u) {
		ur.delete(u);
		return (ur.existsById(u.getId()) ? false : true);
	}
	public User getByUsername(String username) {
		return ur.getByUsername(username);
	}
	
	public User login(String username, String password) {
		User u = ur.getByUsername(username);
		// You might want to do some checking to make sure this is not null
		
		if(u == null || (!u.getPassword().equals(password))) {
			return null;
		}
		
		return u;
	}
	
	public User enroll(int id, String courseNum){
		// I plan to receive the id from the headers since the browser should store it after I log in
		// I'll use a path variable to denote the course I would like to enrll in
		
		User u = ur.findById(id).get();
		Course c = cr.getByCourseNum(courseNum);
		
		// Now we need to check if the user is already enrolled
		for (Course course: u.getCourses()) {
			if(course.equals(c)) {
				return null;
			}
		}
		
		// If not already enrolled check available seats and if good, then enroll and update values
		
		if (c.getAvailableSeats() >= 1) {
			// We should be able to enroll right now
			List<Course> courses = u.getCourses();
			courses.add(c);
			u.setCourses(courses);
			// Now remove one seat from the available seats
			c.setAvailableSeats(c.getAvailableSeats() - 1);
			
			cr.save(c);
			ur.save(u);
		} 
		
		return u;
	}
	

}
