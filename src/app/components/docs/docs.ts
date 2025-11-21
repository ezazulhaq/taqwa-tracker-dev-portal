import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environments';
import { AuthService } from '../../services/auth';
import { HttpClient } from '@angular/common/http';

declare const SwaggerUIBundle: any;

@Component({
  selector: 'app-docs',
  imports: [],
  templateUrl: './docs.html',
  styleUrl: './docs.css',
})
export class DocsComponent implements OnInit {

  authService = inject(AuthService);
  router = inject(Router);
  http = inject(HttpClient);

  constructor() {}

  ngOnInit(): void {
    // Load Swagger UI scripts
    this.loadSwaggerUI();
  }

  loadSwaggerUI(): void {
    // Load Swagger UI CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui.css';
    document.head.appendChild(link);

    // Load Swagger UI JS
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui-bundle.js';
    script.async = true;
    script.onload = () => {
      this.initializeSwaggerUI();
    };
    document.body.appendChild(script);
  }

  initializeSwaggerUI(): void {
    const token = this.authService.currentTokenValue;

    this.http.get(`${environment.apiUrl}/api/openapi.json`).subscribe(spec => {
      if (typeof SwaggerUIBundle !== 'undefined') {
        SwaggerUIBundle({
          spec: spec,
          dom_id: '#swagger-ui',
          deepLinking: true,
          presets: [
            SwaggerUIBundle.presets.apis,
            SwaggerUIBundle.SwaggerUIStandalonePreset
          ],
          requestInterceptor: (request: any) => {
            request.headers['Authorization'] = `Bearer ${token}`;
            return request;
          }
        });
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
