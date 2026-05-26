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

  // Services
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

    // Om input angetts
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

  // Ämnen från API
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

    // Ämne A-Ö
    if (sort === 'subject') {
      return [...this.filteredCourses()].sort((a, b) =>
        a.subject.localeCompare(b.subject))
    }

    // Ämne Ö-A
    if (sort === 'subjectDesc') {
      return [...this.filteredCourses()].sort((a, b) =>
        b.subject.localeCompare(a.subject))
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

  // Kontroll om kurs sparats för ändring av knapps UI
  courseAdded(courseCode: string): boolean {
    // Returnerar true/false
    return this.scheduleService.scheduleCourses().some(c => c.courseCode === courseCode);
  }

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

  // Anropar course-service
  async loadCourses() {
    try {
      const response = await this.courseService.getCourses();
      this.courses.set(response);
    } catch (error) {
      console.error(error);
    }
  }
}
