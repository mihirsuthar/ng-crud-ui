import { Injectable, inject } from '@angular/core';
import { AppSetting, CreateAppSettingRequest, UpdateAppSettingRequest } from '@ng-crud-ui/app-cilents';
import { select, Store, Action } from '@ngrx/store';

import * as AppSettingsStateActions from './app-settings-state.actions';
import * as AppSettingsStateFeature from './app-settings-state.reducer';
import * as AppSettingsStateSelectors from './app-settings-state.selectors';

@Injectable()
export class AppSettingsStateFacade {
    private readonly store = inject(Store);

    /**
     * Combine pieces of state using createSelector,
     * and expose them as observables through the facade.
     */
    loaded$ = this.store.pipe(
        select(AppSettingsStateSelectors.selectAppSettingsStateLoaded)
    );
    allAppSettingsState$ = this.store.pipe(
        select(AppSettingsStateSelectors.selectAllAppSettingsState)
    );
    selectedAppSettingsState$ = this.store.pipe(
        select(AppSettingsStateSelectors.selectEntity)
    );

    appSettingsList$ = this.store.pipe(
        select(AppSettingsStateSelectors.appSettings)
    );
    loadingAppSettings$ = this.store.pipe(
        select(AppSettingsStateSelectors.loadingAppSettings)
    );
    loadAppSettingsSuccess$ = this.store.pipe(
        select(AppSettingsStateSelectors.loadApSettingsSuccess)
    );
    loadAppSettingsFailure$ = this.store.pipe(
        select(AppSettingsStateSelectors.loadApSettingsFailure)
    );
    loadAppSettingsError$ = this.store.pipe(
        select(AppSettingsStateSelectors.loadAppSettingsError)
    );
    appSetting$ = this.store.pipe(
        select(AppSettingsStateSelectors.appSetting)
    );
    loadingAppSetting$ = this.store.pipe(
        select(AppSettingsStateSelectors.loadingAppSetting)
    );
    loadAppSettingSuccess$ = this.store.pipe(
        select(AppSettingsStateSelectors.loadApSettingSuccess)
    );
    loadAppSettingFailure$ = this.store.pipe(
        select(AppSettingsStateSelectors.loadApSettingFailure)
    );
    creatingAppSetting$ = this.store.pipe(
        select(AppSettingsStateSelectors.creatingAppSetting)
    );
    createAppSettingSuccess$ = this.store.pipe(
        select(AppSettingsStateSelectors.createAppSettingSuccess)
    );
    createAppSettingFailure$ = this.store.pipe(
        select(AppSettingsStateSelectors.createAppSettingFailure)
    );
    createAppSettingError$ = this.store.pipe(
        select(AppSettingsStateSelectors.createAppSettingError)
    );
    updatingAppSetting$ = this.store.pipe(
        select(AppSettingsStateSelectors.updatingAppSetting)
    );
    updateAppSettingSuccess$ = this.store.pipe(
        select(AppSettingsStateSelectors.updateAppSettingSuccess)
    );
    updateAppSettingFailure$ = this.store.pipe(
        select(AppSettingsStateSelectors.updateAppSettingFailure)
    );
    updateAppSettingError$ = this.store.pipe(
        select(AppSettingsStateSelectors.updateAppSettingError)
    );
    deletingAppSetting$ = this.store.pipe(
        select(AppSettingsStateSelectors.deletingAppSetting)
    );
    deleteAppSettingSuccess$ = this.store.pipe(
        select(AppSettingsStateSelectors.deleteAppSettingSuccess)
    );
    deleteAppSettingFailure$ = this.store.pipe(
        select(AppSettingsStateSelectors.deleteAppSettingFailure)
    );
    deleteAppSettingError$ = this.store.pipe(
        select(AppSettingsStateSelectors.deleteAppSettingError)
    );

    /**
     * Use the initialization action to perform one
     * or more tasks in your Effects.
     */
    init() {
        this.store.dispatch(AppSettingsStateActions.initAppSettingsState());
    }

    resetState() {
        this.store.dispatch(AppSettingsStateActions.resetState());
    }

    getAppSettings() {
        this.store.dispatch(AppSettingsStateActions.loadAppSettingsList());
    }

    getAppSettingById(id: string) {
        this.store.dispatch(AppSettingsStateActions.loadAppSettingById({ id : id }));
    }

    createAppSetting(request: CreateAppSettingRequest) {
        this.store.dispatch(AppSettingsStateActions.createAppSetting({ request: request }));
    }

    updateAppSetting(request: UpdateAppSettingRequest) {
        this.store.dispatch(AppSettingsStateActions.updateAppSetting({ request: request }));
    }

    deleteAppSettings(id: string) {
        this.store.dispatch(AppSettingsStateActions.deleteAppSetting({ id: id }));
    }
}
