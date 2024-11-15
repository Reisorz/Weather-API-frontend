import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WeatherResponse } from '../model/weather-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private urlBase = 'http://localhost:8080/weather-api';

  constructor(private http: HttpClient) { }

  getWeather(city: string): Observable<WeatherResponse> {
    return this.http.get<WeatherResponse>(`${this.urlBase}/weather/${city}`);
  }
}
