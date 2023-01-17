import { Routes } from '@angular/router';
export const appRoutes: Routes = [
    {
        path: '',
        loadChildren: () => import('@ng-crud-ui/app-settings').then(m => m.AppSettingsModule)
    }
]
