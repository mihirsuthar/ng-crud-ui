import { Routes } from '@angular/router';
import { AppSettingsListComponent } from './app-settings-list/app-settings-list.component';
import { AppSettingComponent } from './new-app-setting/app-setting.component';

export const appSettingsRoutes: Routes = [
    { path: 'appSettings', pathMatch: 'full', component: AppSettingsListComponent },
    { path: 'newAppSetting', pathMatch: 'full', component: AppSettingComponent },
    { path: 'editAppSetting/:id', pathMatch: 'full', component: AppSettingComponent },
    { path: '', pathMatch: 'full', component: AppSettingsListComponent },
];
