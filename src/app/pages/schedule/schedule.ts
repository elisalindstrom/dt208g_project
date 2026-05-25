import { Component, inject } from '@angular/core';
import { ScheduleService } from '../../services/schedule-service';
import { Course } from '../../interfaces/course';

@Component({
  selector: 'app-schedule',
  imports: [],
  templateUrl: './schedule.html',
  styleUrl: './schedule.scss',
})
export class Schedule {
  scheduleService = inject(ScheduleService);

  // Ta bort kurs
  removeCourse(course: Course) {
    this.scheduleService.deleteCourse(course);
  }

  // Uträkning total högskolepoäng
  totalPoints(): number {
    let total = 0;
    const courses = this.scheduleService.scheduleCourses();

    courses.forEach(course => {
      total += course.points;
    })

    return total;
  }
}
