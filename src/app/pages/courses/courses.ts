import { Component, inject } from '@angular/core';
import { CourseService } from '../../services/course-service';
import { Course } from '../../interfaces/course';

@Component({
  selector: 'app-courses',
  imports: [],
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

  // Anropar course-service
  async loadCourses() {
    try {
      const response = await this.courseService.getCourses();
      console.table(response);
    } catch (error) {
      console.error(error);
    }
  }
}
