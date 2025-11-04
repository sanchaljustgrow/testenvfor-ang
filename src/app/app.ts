import { JsonPipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JsonPipe, HttpClientModule], // <-- include HttpClientModule here
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  title = 'TestEnv';
  data: any = null;
  config: any;
  apiUrl: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Step 1: Load runtime config.json
    this.http.get('/assets/config.json').subscribe({
      next: (config: any) => {
        this.config = config;
        this.apiUrl = this.config['NG_APP_URL'] || 'https://dummyjson.com/products/2';
        console.log('✅ Loaded API URL:', this.apiUrl);

        // Step 2: Make API call using the runtime URL
        this.http.get(this.apiUrl).subscribe({
          next: (data) => {
            this.data = data;
            console.log('✅ API Response:', data);
          },
          error: (err) => {
            console.error('❌ API Error:', err);
          }
        });
      },
      error: (err) => {
        console.error('❌ Could not load config.json:', err);
        // fallback in case config.json not found
        this.apiUrl = 'https://task.thingsrms.com/v1';
      }
    });
  }
}
