import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { WeatherService } from '../service/weather.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { WeatherResponse } from '../model/weather-response';
import { error } from 'console';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [MaterialModule, FormsModule, ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent {

  city: string = "";
  iconUrl: string = "";
  weatherResponse: WeatherResponse;
  weatherForm: FormGroup;
  cityFormControl = new FormControl('', Validators.required);

  constructor(private weatherService: WeatherService, private builder: FormBuilder){

    this.weatherForm = new FormGroup ({
      city: this.cityFormControl
    })

    this.getWeather();
  }

  capitalizeFirstLetter(text: string): string {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }
  

  getWeather() {

    const formValues = this.weatherForm.getRawValue();
    if(formValues.city == "") {
      this.city = "Madrid"
    } else {
      this.city = this.capitalizeFirstLetter(formValues.city);
    }

    this.weatherService.getWeather(this.city).subscribe({
      next: (data) => {this.weatherResponse = data;
        this.weatherResponse.details = this.capitalizeFirstLetter(this.weatherResponse.details.toString())
        this.iconUrl = `https://openweathermap.org/img/wn/${this.weatherResponse.icon}@2x.png`;
        console.log(this.weatherResponse);
        this.weatherForm.get('city')?.reset();
        
      },
      error: (error:any) => console.log(error)
    })
  }



}
