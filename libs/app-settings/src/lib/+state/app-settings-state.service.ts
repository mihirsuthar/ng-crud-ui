import { Injectable } from '@angular/core';
import { AppSetting, AppSettingsClient, CreateAppSettingRequest, UpdateAppSettingRequest } from '@ng-crud-ui/app-cilents';
import { catchError, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppSettingsStateService {

    constructor(
        public state: AppSettingsState,
        public initialState: AppSettingsState,
        private appSettingsClient: AppSettingsClient
        ) {
        initialState = {
            appSettingsList: [],
            getAppSettingListSuccess: false,
            getAppSettingListFailure: false,
            getAppSettingsError: undefined,
            creatingAppSetting: false,
            createAppSettingSuccess: false,
            createAppSettingFailure: false,
            createAppSettingError: undefined,
            updatingAppSetting: false,
            updateAppSettingSuccess: false,
            updateAppSettingFailure: false,
            updateAppSettingError: undefined,
            deletingAppSetting: false,
            deleteAppSettingSuccess: false,
            deleteAppSettingFailure: false,
            deleteAppSettingError: undefined
        } as AppSettingsState;
    }

    initializeState() {
        this.state = { ...this.initialState };
    }

    loadAppSettingsList() {
        this.appSettingsClient.appSettingsGet().pipe(
            map(response => {
                return response;
            }),
            catchError((error: any) => {
                return error;
            })
        );
    }

    createAppSetting(request: CreateAppSettingRequest) {
        this.appSettingsClient.appSettingsPost(request).pipe(
            map(response => {
                return response;
            }),
            catchError((error: any) => {
                return error;
            })
        );
    }

    updateAppSetting(request: UpdateAppSettingRequest) {
        this.appSettingsClient.appSettingsPut(request).pipe(
            map(response => {
                return response;
            }),
            catchError((error: any) => {
                return error;
            })
        );
    }

    deleteAppSetting(id: string) {
        this.appSettingsClient.appSettingsDelete(id).pipe(
            map(response => {
                return response;
            }),
            catchError((error: any) => {
                return error;
            })
        );
    }
}

export class AppSettingsState {
    constructor(
        public appSettingsList: AppSetting[],
        public getAppSettingListSuccess: boolean,
        public getAppSettingListFailure: boolean,
        public getAppSettingsError: string | undefined,
        public creatingAppSetting: boolean,
        public createAppSettingSuccess: boolean,
        public createAppSettingFailure: boolean,
        public createAppSettingError: string | undefined,
        public updatingAppSetting: boolean,
        public updateAppSettingSuccess: boolean,
        public updateAppSettingFailure: boolean,
        public updateAppSettingError: string | undefined,
        public deletingAppSetting: boolean,
        public deleteAppSettingSuccess: boolean,
        public deleteAppSettingFailure: boolean,
        public deleteAppSettingError: string | undefined
    ) {}

}
