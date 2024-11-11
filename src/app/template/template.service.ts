import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Template } from './template.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TemplateService {
  private templateUrl = 'http://localhost:3000/template';

  constructor(private http: HttpClient) {}

  createUsersTemplat(template: Template): Observable<any> {
    return this.http.post<Template>(`${this.templateUrl}/create/:id`, template);
  }

  getUsersTemplate(): Observable<Template[]> {
    return this.http.get<Template[]>(`${this.templateUrl}/user`);
  }

  getTemplatePreview(id: number): Observable<string> {
    return this.http.get<string>(`${this.templateUrl}/${id}/preview`);
  }

  updateTemplate(id: number, template: Template): Observable<Template> {
    return this.http.put<Template>(`${this.templateUrl}/${id}`, template);
  }

  deleteTemplate(id: number): Observable<void> {
    return this.http.delete<void>(`${this.templateUrl}/${id}`);
  }
}
