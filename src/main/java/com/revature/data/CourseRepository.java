package com.revature.data;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.revature.models.Course;

@Repository
public interface CourseRepository extends JpaRepository<Course, Integer>{
	
	public Course getByCourseNum(String courseNum);
	
	@Query("FROM Course WHERE availableSeats > 0")
	public List<Course> getAvailableCourse();

}
