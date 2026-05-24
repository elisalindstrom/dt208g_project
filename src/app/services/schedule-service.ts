import { Injectable, signal } from '@angular/core';
import { Course } from '../interfaces/course';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  scheduleCourses = signal<Course[]>([]);

 constructor() {
    this.loadCourses();
  }

  addCourse(course: Course) {
    // Kontroll om kursen redan finns
    const courseExists = this.scheduleCourses().some(c => c.courseCode === course.courseCode);

    if (!courseExists) {
      const updatedCourses = [...this.scheduleCourses(), course];
      this.scheduleCourses.set(updatedCourses);
      localStorage.setItem("schedule", JSON.stringify(updatedCourses));
    }
  }

  loadCourses() {
    const savedCourses = localStorage.getItem("schedule");

    if (savedCourses) {
      this.scheduleCourses.set(JSON.parse(savedCourses))
    }
  }
}
