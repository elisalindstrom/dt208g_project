import { Component, computed, inject, signal } from '@angular/core';
import { CourseService } from '../../services/course-service';
import { Course } from '../../interfaces/course';
import { CommonModule } from '@angular/common';
import { ScheduleService } from '../../services/schedule-service';

@Component({
  selector: 'app-courses',
  imports: [CommonModule],
  templateUrl: './courses.html',
  styleUrl: './courses.scss',
})
export class Courses {
  courses = signal<Course[]>([]);
  filterInput = signal(""); // Filtrering
  sortOrder = signal(""); // Sortering
  selectedSubject = signal(""); // Ämne

  courseService = inject(CourseService);
  scheduleService = inject(ScheduleService);

  // Körs vid start
  ngOnInit(): void {
    this.loadCourses();
  }

  // Filtrering
  filteredCourses = computed(() => {
    const filter = this.filterInput().trim().toLowerCase();
    const subject = this.selectedSubject();
    let filtered = this.courses();

    if (filter) {
      filtered = filtered.filter(c =>
        c.courseCode.toLowerCase().includes(filter) ||
        c.courseName.toLowerCase().includes(filter)
      )
    }

    if (subject) {
      filtered = filtered.filter(c =>
        c.subject === subject
      )
    }

    return filtered;
  })

  // Ämnesval
  subjects = computed(() => {
    const allSubjects = this.courses().map(course => course.subject);

    return [...new Set(allSubjects)].sort();
  })

  // Sortering
  sortedCourses = computed(() => {
    const sort = this.sortOrder();

    // A-Ö
    if (sort === 'courseNameAsc') {
      return [...this.filteredCourses()].sort((a, b) =>
        a.courseName.localeCompare(b.courseName))
    }

    // Ö-A
    if (sort === 'courseNameDesc') {
      return [...this.filteredCourses()].sort((a, b) =>
        b.courseName.localeCompare(a.courseName))
    }

    // Ämne
    if (sort === 'subject') {
      return [...this.filteredCourses()].sort((a, b) =>
        a.subject.localeCompare(b.subject))
    }

    // HP
    if (sort === 'points') {
      return [...this.filteredCourses()].sort((a, b) =>
        a.points - b.points)
    }

    // Kurskod
    if (sort === 'courseCode') {
      return [...this.filteredCourses()].sort((a, b) =>
        a.courseCode.localeCompare(b.courseCode))
    }

    // Returnerar alltid ett värde
    return this.filteredCourses();
  })

  // Lägg till kurs
  addCourse(course: Course) {
 this.scheduleService.addCourse(course);
  }

  // Ändrar signalvärdet för filtrering
  onCoursesFiltered(filter: string) {
    this.filterInput.set(filter);
  }

  // Ändrar signalvärdet för ämnesval
  onSubjectChange(subject: string) {
    this.selectedSubject.set(subject);
  }

  // Ändrar signalvärdet för sortering
  onCoursesSorted(order: string) {
    this.sortOrder.set(order);
  }

  /* trackCourse(course: Course): string {
    return `${course.courseCode}-${course.subjectCode}`;
  } */

  // Anropar course-service
  async loadCourses() {
    try {
      const response = await this.courseService.getCourses();
      this.courses.set(response);
      console.table(response); // TA BORT!!
    } catch (error) {
      console.error(error);
    }
  }
}
