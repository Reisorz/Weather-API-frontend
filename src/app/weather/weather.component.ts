import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { WeatherService } from '../service/weather.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { WeatherResponse } from '../model/weather-response';
import { error } from 'console';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [MaterialModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent {

  city: string;
  weatherResponse: WeatherResponse;
  weatherForm: FormGroup;
  cityFormControl = new FormControl('', Validators.required);

  constructor(private weatherService: WeatherService, private builder: FormBuilder){

    this.weatherForm = new FormGroup ({
      city: this.cityFormControl
    })
  }

  getWeather() {

    const formValues = this.weatherForm.getRawValue();
    this.city = formValues.city;


    this.weatherService.getWeather(this.city).subscribe({
      next: (data) => {this.weatherResponse = data;
        console.log(this.weatherResponse);
        this.weatherForm.get('city')?.reset();
        
      },
      error: (error:any) => console.log(error)
    })
  }

}
