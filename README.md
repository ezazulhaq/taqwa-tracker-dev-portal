# The Taqwa Tracker Developer Portal

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.8.

## Overview

This project is a developer portal for the Taqwa Tracker API, an application that provides essential tools and services for the Muslim community. The portal serves as a centralized hub for developers to explore, test, and integrate the Taqwa Tracker API into their own applications.

## Implemented Features

- **Developer Authentication**: A secure login page to authenticate developers before granting access to the portal.
- **Role-Based Access Control**: The system restricts access to developers with the "developer" role, ensuring that only authorized personnel can view the API documentation.
- **Protected API Documentation**: The `/docs` route is protected by an authentication guard, preventing unauthorized access to the interactive API documentation.
- **Interactive API Explorer**: A comprehensive documentation section that allows authenticated developers to test the Taqwa Tracker API endpoints in real-time.

## Project File Structure

```
.
├── angular.json
├── dist/
├── GEMINI.md
├── node_modules/
├── package.json
├── package-lock.json
├── public/
├── README.md
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── docs/
│   │   │   └── login/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   └── services/
│   ├── environments/
│   ├── index.html
│   ├── main.ts
│   └── styles.css
├── tsconfig.app.json
├── tsconfig.json
└── tsconfig.spec.json
```

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
