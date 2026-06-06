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
  // SIGNALS
  filterInput = signal(""); // Filtrering
  selectedSubject = signal(""); // Ämne
  sortOrder = signal(""); // Sortering
  visibleCourses = signal(24); // Kurser som visas

  // SERVICES
  courseService = inject(CourseService);
  scheduleService = inject(ScheduleService);

  // Körs vid start
  ngOnInit(): void {
    this.courseService.loadCourses();
  }

  // COMPUTED
  // Begränsar antalet kurser som visas
  visibleSortedCourses = computed(() => {
    return this.sortedCourses().slice(0, this.visibleCourses());
  })

  // Filtrering
  filteredCourses = computed(() => {
    const filter = this.filterInput().trim().toLowerCase();
    const subject = this.selectedSubject();
    let filtered = this.courseService.courses();

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

  // Lista med ämnen
  subjects = computed(() => {
    const allSubjects = this.courseService.courses().map(course => course.subject);
    // Skapa en ny array med endast unika värden och sortera i bokstavsordning
    const uniqueSubjects = [...new Set(allSubjects)].sort();
    return uniqueSubjects;
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

  // UI
  // Lägg till kurs
  addCourse(course: Course) {
    this.scheduleService.addCourse(course);
  }

  // Kontroll om kurs sparats för ändring av knapps tillstånd
  courseAdded(courseCode: string): boolean {
    return this.scheduleService.scheduleCourses().some(c => c.courseCode === courseCode);
  }

  // Uppdaterar signalvärdet för kurser som visas
  showMoreCourses() {
    this.visibleCourses.update(value => value + 24);
  }

  // Ändra signalvärdet för filtrering + återställ antal kurser som ska visas
  onCoursesFiltered(filter: string) {
    this.filterInput.set(filter);
    this.visibleCourses.set(24);
  }

  // Ändra signalvärdet för ämnesval + återställ antal kurser som ska visas
  onSubjectChange(subject: string) {
    this.selectedSubject.set(subject);
    this.visibleCourses.set(24);
  }

  // Ändra signalvärdet för sortering
  onCoursesSorted(order: string) {
    this.sortOrder.set(order);
  }
}
