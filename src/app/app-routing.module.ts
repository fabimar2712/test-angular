/* import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'student',
    loadChildren: () => import('./pages/students/student.module').then( m => m.StudentPageModule)
  },
  {
    path: 'tutors',
    loadChildren: () => import('./pages/tutors/tutors.module').then( m => m.TutorsPageModule)
  },
  {
    path: 'classes',
    loadChildren: () => import('./pages/classes/classes.module').then( m => m.ClassesPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 */
import { NgModule } from "@angular/core"
import { PreloadAllModules, RouterModule, type Routes } from "@angular/router"

const routes: Routes = [
  {
    path: "home",
    loadChildren: () => import("./pages/home/home.module").then((m) => m.HomePageModule),
  },
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "student",
    loadChildren: () => import("./pages/students/student.module").then((m) => m.StudentPageModule),
  },
  {
    path: "tutors",
    loadChildren: () => import("./pages/tutors/tutors.module").then((m) => m.TutorsPageModule),
  },
  {
    path: "classes",
    loadChildren: () => import("./pages/classes/classes.module").then((m) => m.ClassesPageModule),
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

