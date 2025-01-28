import { Component, type OnInit } from "@angular/core"
import { IonicModule } from "@ionic/angular"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { ApiService } from "src/app/services/api.service"
import { PageHeaderComponent } from "src/app/components/shared/page-header/page-header.component"

interface Class {
  id: string
  tutor_id: string
  student_id: string
  date: string
  start_time: string
  end_time: string
  created_at: string | null
  updated_at: string | null
  tutor: {
    id: string
    first_name: string
    last_name: string
    email: string
    speciality: string
  }
  student: {
    id: string
    first_name: string
    last_name: string
    date_of_birth: string
  }
}

@Component({
  selector: "app-classes",
  templateUrl: "./classes.page.html",
  styleUrls: ["./classes.page.scss"],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, PageHeaderComponent],
})
export class ClassesPage implements OnInit {
  classes: Class[] = []
  filteredClasses: Class[] = []
  searchTerm = ""
  currentPage = 1
  itemsPerPage = 8
  stats = {
    total: 0,
    activas: 0,
    completadas: 0,
    proximas: 0,
  }

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadClasses()
  }

  loadClasses() {
    this.apiService.getBookings().subscribe(
      (data: Class[]) => {
        this.classes = data
        this.filterClasses()
        this.calculateStats()
      },
      (error) => {
        console.error("Error al cargar las clases:", error)
      },
    )
  }

  calculateStats() {
    const now = new Date()
    this.stats.total = this.classes.length
    this.stats.activas = this.classes.filter((c) => new Date(c.date) <= now && new Date(c.end_time) >= now).length
    this.stats.completadas = this.classes.filter((c) => new Date(c.end_time) < now).length
    this.stats.proximas = this.classes.filter((c) => new Date(c.date) > now).length
  }

  filterClasses() {
    this.filteredClasses = this.classes.filter((classItem) => {
      const searchStr = this.searchTerm.toLowerCase()
      return (
        classItem.tutor.first_name.toLowerCase().includes(searchStr) ||
        classItem.tutor.last_name.toLowerCase().includes(searchStr) ||
        classItem.student.first_name.toLowerCase().includes(searchStr) ||
        classItem.student.last_name.toLowerCase().includes(searchStr)
      )
    })
  }

  onSearchChange(event: any) {
    this.searchTerm = event.target.value
    this.filterClasses()
    this.currentPage = 1
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  formatTime(time: string): string {
    return new Date(time).toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  getClassStatus(classItem: Class): "activa" | "completada" | "proxima" {
    const now = new Date()
    const classDate = new Date(classItem.date)
    const endTime = new Date(classItem.end_time)

    if (classDate <= now && endTime >= now) return "activa"
    if (endTime < now) return "completada"
    return "proxima"
  }

  get totalPages(): number {
    return Math.ceil(this.filteredClasses.length / this.itemsPerPage)
  }

  get paginatedClasses(): Class[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage
    return this.filteredClasses.slice(startIndex, startIndex + this.itemsPerPage)
  }

  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page
    }
  }

  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1)
  }
}

