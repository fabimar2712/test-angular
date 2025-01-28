import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { PageHeaderComponent } from 'src/app/components/shared/page-header/page-header.component';

interface Student {
  id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  address: string;
  created_at: string | null;
  updated_at: string | null;
  avatar?: string;
}

@Component({
  selector: 'app-student',
  templateUrl: './student.page.html',
  styleUrls: ['./student.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, PageHeaderComponent],
})
export class StudentPage implements OnInit {
  students: Student[] = [];
  filteredStudents: Student[] = [];
  searchTerm = '';
  currentPage = 1;
  itemsPerPage = 10;
  defaultAvatars = [
    '../../assets/images/student-1.png',
    '../../assets/images/student-2.png',
    '../../assets/images/student-3.png',
    '../../assets/images/student-4.png',
    '../../assets/images/student-5.png',
    '../../assets/images/student-6.png',
  ];
  isModalOpen: boolean = false;
  selectedStudent: Student | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.apiService.getUsers().subscribe(
      (data: Student[]) => {
        this.students = data.map((student) => ({
          ...student,
          avatar: this.getRandomAvatar(),
        }));
        this.filterStudents();
      },
      (error) => {
        console.error('Error al cargar estudiantes:', error);
      }
    );
  }

  getRandomAvatar(): string {
    const randomIndex = Math.floor(Math.random() * this.defaultAvatars.length);
    return this.defaultAvatars[randomIndex];
  }

  filterStudents() {
    this.filteredStudents = this.students.filter((student) => {
      const searchStr = this.searchTerm.toLowerCase();
      return (
        student.first_name.toLowerCase().includes(searchStr) ||
        student.last_name.toLowerCase().includes(searchStr) ||
        student.address.toLowerCase().includes(searchStr)
      );
    });
  }

  onSearchChange(event: any) {
    this.searchTerm = event.target.value;
    this.filterStudents();
    this.currentPage = 1;
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  calculateAge(birthDate: string): number {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    return age;
  }

  get totalPages(): number {
    return Math.ceil(this.filteredStudents.length / this.itemsPerPage);
  }

  get paginatedStudents(): Student[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredStudents.slice(startIndex, startIndex + this.itemsPerPage);
  }

  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  getRandomAccentColor(): string {
    const colors = ['#4834d4', '#686de0', '#6c5ce7', '#a55eea'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  openStudentDetails(student: Student) {
    this.selectedStudent = student;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedStudent = null;
  }
}
