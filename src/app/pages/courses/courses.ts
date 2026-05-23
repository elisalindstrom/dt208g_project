import { Component, inject } from '@angular/core';
import { CourseService } from '../../services/course-service';
import { Course } from '../../interfaces/course';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-courses',
  imports: [CommonModule],
  templateUrl: './courses.html',
  styleUrl: './courses.scss',
})
export class Courses {
  courses: Course[] = [];
  courseService = inject(CourseService);

  // Körs vid start
  ngOnInit(): void {
    this.loadCourses();
  }

  /* trackCourse(course: Course): string {
    return `${course.courseCode}-${course.subjectCode}`;
  } */

  // Anropar course-service
  async loadCourses() {
    try {
      const response = await this.courseService.getCourses();
      this.courses = response;
      console.table(response);
    } catch (error) {
      console.error(error);
    }
  }
}
