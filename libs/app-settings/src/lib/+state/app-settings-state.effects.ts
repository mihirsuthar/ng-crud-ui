import { AppSettingsClient } from '@ng-crud-ui/app-cilents';
import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import * as AppSettingsStateActions from './app-settings-state.actions';
import * as AppSettingsStateFeature from './app-settings-state.reducer';

import { switchMap, catchError, of, map } from 'rxjs';

@Injectable()
export class AppSettingsStateEffects {
    private actions$ = inject(Actions);

    /**
     *
     */
    constructor(private appSettingsClient: AppSettingsClient) { }

    init$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AppSettingsStateActions.initAppSettingsState),
            switchMap(() =>
                of(
                    AppSettingsStateActions.loadAppSettingsStateSuccess({
                        appSettingsState: [],
                    })
                )
            ),
            catchError((error) => {
                console.error('Error', error);
                return of(
                    AppSettingsStateActions.loadAppSettingsStateFailure({
                        error,
                    })
                );
            })
        )
    );

    loadAppSettingsList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AppSettingsStateActions.loadAppSettingsList),
            switchMap(() =>
                this.appSettingsClient.appSettingsGet().pipe(
                    map(response => AppSettingsStateActions.loadAppSettingsListSuccess({appSettings: response})),
                    catchError((error: any) => of(AppSettingsStateActions.loadAppSettingsListFailure(error)))
                )
            )
        )
    );

    loadAppSettingById$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AppSettingsStateActions.loadAppSettingById),
            switchMap((action) =>
                this.appSettingsClient.appSettingsGetById(action.id).pipe(
                    map(response => AppSettingsStateActions.loadAppSettingSuccess({ appSetting: response })),
                    catchError((error: any) => of(AppSettingsStateActions.loadAppSettingFailure(error)))
                )
            )
        )
    );

    createAppSetting$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AppSettingsStateActions.createAppSetting),
            switchMap(action =>
                this.appSettingsClient.appSettingsPost(action.request).pipe(
                    map(response => AppSettingsStateActions.createAppSettingSuccess({id: response})),
                    catchError((error: any) => of(AppSettingsStateActions.createAppSettingFailure(error)))
                )
            )
        )
    );

    updateAppSetting$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AppSettingsStateActions.updateAppSetting),
            switchMap(action =>
                this.appSettingsClient.appSettingsPut(action.request).pipe(
                    map(response => AppSettingsStateActions.updateAppSettingSuccess()),
                    catchError((error: any) => of(AppSettingsStateActions.updateAppSettingFailure(error)))
                )
            )
        )
    );

    deleteAppSetting$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AppSettingsStateActions.deleteAppSetting),
            switchMap(action =>
                this.appSettingsClient.appSettingsDelete(action.id).pipe(
                    map(response => AppSettingsStateActions.deleteAppSettingSuccess()),
                    catchError((error: any) => of(AppSettingsStateActions.deleteAppSettingFailure(error)))
                )
            )
        )
    );
}
