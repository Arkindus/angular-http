import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class WeatherAPIService {
  apiURL: string;
  apiKey: string;

  temperature: number;
  description: string;
  latitude: number;
  longitude: number;
  city: string;
  country: string;

  constructor(private http: HttpClient) {
    this.apiURL = 'https://api.openweathermap.org/data/2.5/weather?';
    this.apiKey = 'da44c0892d80b9358b7e06e9b2e6499a';
  }

  fetchWeather(inputCity: string) {
    this.http
      .get(this.apiURL + 'q=' + inputCity + '&APPID=' + this.apiKey + '&units=metric')
        .subscribe(responseData => {
          this.temperature = responseData["main"]["temp"];
          this.description = responseData["weather"][0]["description"];
          this.latitude = responseData["coord"]["lat"];
          this.longitude = responseData["coord"]["lon"];
          this.city = responseData["name"];
          this.country = responseData["sys"]["country"];
        });
  }
}
