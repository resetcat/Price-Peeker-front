import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationDTO } from '../models/notification.dto';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductDto } from '../models/products.dto';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  url: string = `${environment.apiUrl}/notifications`;

  constructor(private httpClient: HttpClient) {}

  getNotifications(): Observable<NotificationDTO[]> {
    return this.httpClient.get<NotificationDTO[]>(
      `${environment.apiUrl}/notifications`
    );
  }

  addNotification(notification: ProductDto): Observable<NotificationDTO> {
    return this.httpClient.post<NotificationDTO>(this.url, notification);
  }

  deleteNotification(id: number): Observable<any> {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
}
