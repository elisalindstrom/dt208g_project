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

  // Lägg till kurs
  addCourse(course: Course) {
    // Kontroll om kursen redan finns sparad
    const courseExists = this.scheduleCourses().some(c => c.courseCode === course.courseCode);

    if (!courseExists) {
      // Skapar ny array med de kurser som redan finns och lägger till den nya kursen sist
      const updatedCourses = [...this.scheduleCourses(), course];
      this.scheduleCourses.set(updatedCourses);
      localStorage.setItem("schedule", JSON.stringify(updatedCourses));
    }
  }

  // Ta bort kurs
  deleteCourse(remove: Course) {
    const updatedCourses = this.scheduleCourses().filter(course => course.courseCode !== remove.courseCode);
    this.scheduleCourses.set(updatedCourses);
    localStorage.setItem("schedule", JSON.stringify(updatedCourses));
  }

  // Hämta sparade kurser
  loadCourses() {
    const savedCourses = localStorage.getItem("schedule");

    // Kontroll om det finns sparade kurser
    if (savedCourses) {
      this.scheduleCourses.set(JSON.parse(savedCourses))
    }
  }
}
