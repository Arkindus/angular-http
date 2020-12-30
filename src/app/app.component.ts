import { FormGroup, FormControl, Validators } from '@angular/forms';
import { WeatherAPIService } from './weather-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  searchForm: FormGroup;

  temperature: number;
  description: string;
  latitude: number;
  longitude: number;
  city: string;
  country: string;

  submitted: boolean;

  constructor(private weatherAPI: WeatherAPIService) {
    this.submitted = false;
  }

  ngOnInit() {
    this.searchForm = new FormGroup({
      inputCity: new FormControl(null, Validators.required)
    });
  }

  onSubmitted() {
    const queryCity = this.searchForm.get('inputCity').value;
    this.weatherAPI.fetchWeather(queryCity);
    this.submitted = true;

    setTimeout(() => {
      this.temperature = this.weatherAPI.temperature;
      this.description = this.weatherAPI.description;
      this.latitude = this.weatherAPI.latitude;
      this.longitude = this.weatherAPI.longitude;
      this.city = this.weatherAPI.city;
      this.country = this.weatherAPI.country;
    }, 500);

    this.searchForm.reset();
  }
}
