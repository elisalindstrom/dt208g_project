import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Courses } from './pages/courses/courses';
import { Schedule } from './pages/schedule/schedule';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
    { path: 'home', component: Home },
    { path: 'courses', component: Courses },
    { path: 'schedule', component: Schedule },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', component: NotFound }
];
