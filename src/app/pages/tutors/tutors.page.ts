import { Component, ViewEncapsulation, type OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { PageHeaderComponent } from 'src/app/components/shared/page-header/page-header.component';

interface Tutor {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  date_of_birth: string;
  nationality: string;
  speciality: string;
  created_at: string | null;
  updated_at: string | null;
  avatar?: string;
}

interface Filters {
  name: string;
  specialities: string[];
  nationality: string;
  dateRange: { start: string; end: string };
}

@Component({
  selector: 'app-tutors',
  templateUrl: './tutors.page.html',
  styleUrls: ['./tutors.page.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [IonicModule, CommonModule, FormsModule, PageHeaderComponent],
})
export class TutorsPage implements OnInit {
  tutors: Tutor[] = [];
  filteredTutors: Tutor[] = [];
  searchTerm = '';
  currentPage = 1;
  itemsPerPage = 10;
  isFilterDrawerOpen = false;
  specialties: string[] = [];
  filters: Filters = {
    name: '',
    specialities: [],
    nationality: '',
    dateRange: { start: '', end: '' },
  };
  selectedSpecialty = '';
  defaultAvatars = [
    '../../assets/images/student-1.png',
    '../../assets/images/student-2.png',
    '../../assets/images/student-3.png',
    '../../assets/images/student-4.png',
    '../../assets/images/student-5.png',
    '../../assets/images/student-6.png',
  ];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadTutors();
    this.initializeDateRange();
  }

  initializeDateRange() {
    const today = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    this.filters.dateRange = {
      start: oneMonthAgo.toISOString().split('T')[0],
      end: today.toISOString().split('T')[0],
    };
  }

  loadTutors() {
    this.apiService.getTutors().subscribe(
      (data: Tutor[]) => {
        // Añade el campo avatar a cada tutor
        this.tutors = data.map((tutor) => ({
          ...tutor,
          avatar: this.getRandomAvatar(),
        }));
        this.filteredTutors = this.tutors;
        this.extractSpecialties();
      },
      (error) => {
        console.error('Error al cargar tutores:', error);
      }
    );
  }

  getRandomAvatar(): string {
    const randomIndex = Math.floor(Math.random() * this.defaultAvatars.length);
    return this.defaultAvatars[randomIndex];
  }

  extractSpecialties() {
    this.specialties = [
      ...new Set(this.tutors.map((tutor) => tutor.speciality)),
    ].sort();
  }

  toggleFilterDrawer() {
    this.isFilterDrawerOpen = !this.isFilterDrawerOpen;
  }

  toggleSpeciality(speciality: string) {
    const index = this.filters.specialities.indexOf(speciality);
    if (index === -1) {
      this.filters.specialities.push(speciality);
    } else {
      this.filters.specialities.splice(index, 1);
    }
    this.applyFilters();
  }

  isSpecialitySelected(speciality: string): boolean {
    return this.filters.specialities.includes(speciality);
  }

  applyFilters() {
    this.filteredTutors = this.tutors.filter((tutor) => {
      // Filtro por nombre
      const nameMatch = this.searchTerm
        ? (tutor.first_name + ' ' + tutor.last_name)
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase())
        : true;

      // Filtro por especialidad
      const specialtyMatch = this.selectedSpecialty
        ? tutor.speciality === this.selectedSpecialty
        : true;

      return nameMatch && specialtyMatch;
    });

    this.currentPage = 1;
  }

  resetFilters() {
    this.filters = {
      name: '',
      specialities: [],
      nationality: '',
      dateRange: { start: '', end: '' },
    };
    this.initializeDateRange();
    this.applyFilters();
  }

  onSearchChange(event: any) {
    this.searchTerm = event.target.value;
    this.applyFilters();
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  get totalPages(): number {
    return Math.ceil(this.filteredTutors.length / this.itemsPerPage);
  }

  get paginatedTutors(): Tutor[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredTutors.slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
  }

  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  getStatusItems(
    tutor: Tutor
  ): { icon: string; label: string; checked: boolean }[] {
    return [
      { icon: 'document-text', label: 'Documentos', checked: true },
      { icon: 'calendar', label: 'Horario', checked: true },
      { icon: 'star', label: 'Evaluación', checked: true },
      { icon: 'shield-checkmark', label: 'Verificado', checked: true },
    ];
  }

  onSpecialtyChange(specialty: string) {
    this.selectedSpecialty = specialty;
    this.applyFilters();
  }
}
