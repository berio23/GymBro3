import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export abstract class BaseApiService {
  constructor(protected http: HttpClient, protected apiUrl: string) {}

  getAll(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  save(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
