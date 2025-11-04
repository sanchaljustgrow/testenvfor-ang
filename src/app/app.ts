import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JsonPipe],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  protected title = 'TestEnv';
  data: any = null;
  config: any;
  apiUrl: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Step 1: Load config.json dynamically
    this.http.get('/assets/config.json').subscribe((config) => {
      this.config = config;
      this.apiUrl = this.config['NG_APP_URL'] || 'https://task.thingsrms.com/v1';
      console.log('Loaded API URL:', this.apiUrl);

      // Step 2: Call API using the runtime URL
      this.http.get(this.apiUrl).subscribe((data) => {
        this.data = data;
        console.log('Response:', this.data);
      });
    });
  }
}
