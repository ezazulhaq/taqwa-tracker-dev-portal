import { Routes } from '@angular/router';
import { DocsComponent } from './components/docs/docs';
import { LoginComponent } from './components/login/login';
import { authGuard } from './guards/auth';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'docs',
        component: DocsComponent,
        canActivate: [authGuard]
    },
    {
        path: '**',
        redirectTo: '/login'
    }
];
