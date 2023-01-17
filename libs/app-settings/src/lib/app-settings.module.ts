import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { appSettingsRoutes } from './lib.routes';
import { AppSettingsListComponent } from './app-settings-list/app-settings-list.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromAppSettingsState from './+state/app-settings-state.reducer';
import { AppSettingsStateEffects } from './+state/app-settings-state.effects';
import { AppSettingsStateFacade } from './+state/app-settings-state.facade';
import { AppSettingComponent } from './new-app-setting/app-setting.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(appSettingsRoutes),
        StoreModule.forFeature(
            fromAppSettingsState.APP_SETTINGS_STATE_FEATURE_KEY,
            fromAppSettingsState.appSettingsStateReducer
        ),
        EffectsModule.forFeature([AppSettingsStateEffects]),
        MatFormFieldModule,
        MatInputModule,
        MatSnackBarModule,
        ReactiveFormsModule,
    ],
    declarations: [AppSettingsListComponent, AppSettingComponent],
    exports: [AppSettingsListComponent, AppSettingComponent],
    providers: [AppSettingsStateFacade],
})
export class AppSettingsModule {}
