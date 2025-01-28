import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private baseUrl = "https://test.worldsacross.com/api";

  constructor(private http: HttpClient) {}

  getTutors(): Observable<any> {
    return this.http.get(`${this.baseUrl}/tutors`);
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`);
  }

  getBookings(): Observable<any> {
    return this.http.get(`${this.baseUrl}/booking`);
  }
}
