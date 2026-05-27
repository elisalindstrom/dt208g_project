import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Course } from '../interfaces/course';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  courses = signal<Course[]>([]);

  private url: string = '/api/miun_courses.json';
  http = inject(HttpClient);

  // Hämta och spara data
  async loadCourses() {
    try {
      const response = await firstValueFrom(this.http.get<Course[]>(this.url));
      this.courses.set(response);
    } catch (error) {
      console.error(error);
    }
  }
}
