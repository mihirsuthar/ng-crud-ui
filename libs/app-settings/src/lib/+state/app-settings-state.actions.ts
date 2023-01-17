import { AppSetting, CreateAppSettingRequest, UpdateAppSettingRequest } from '@ng-crud-ui/app-cilents';
import { createAction, props } from '@ngrx/store';
import { AppSettingsStateEntity } from './app-settings-state.models';

export const initAppSettingsState = createAction(
    '[AppSettingsState Page] Init'
);

export const loadAppSettingsStateSuccess = createAction(
    '[AppSettingsState/API] Load AppSettingsState Success',
    props<{ appSettingsState: AppSettingsStateEntity[] }>()
);

export const loadAppSettingsStateFailure = createAction(
    '[AppSettingsState/API] Load AppSettingsState Failure',
    props<{ error: any }>()
);

export const loadAppSettingsList = createAction(
    '[AppSettingsState/API] Load App Settings List'
);

export const loadAppSettingsListSuccess = createAction(
    '[AppSettingsState/API] Load App Settings List Success',
    props<{ appSettings: AppSetting[] }>()
);

export const loadAppSettingsListFailure = createAction(
    '[AppSettingsState/API] Load App Settings Failure',
    props<{ error: any }>()
);


export const loadAppSettingById = createAction(
    '[AppSettingsState/API] Load App Setting',
    props<{id: string}>()
);

export const loadAppSettingSuccess = createAction(
    '[AppSettingsState/API] Load App Setting Success',
    props<{ appSetting: AppSetting }>()
);

export const loadAppSettingFailure = createAction(
    '[AppSettingsState/API] Load App Setting Failure',
    props<{ error: any }>()
);

export const createAppSetting = createAction(
    '[AppSettingsState/API] Create App Setting',
    props<{ request: CreateAppSettingRequest }>()
);

export const createAppSettingSuccess = createAction(
    '[AppSettingsState/API] Create App Setting Success',
    props<{ id: string }>()
);

export const createAppSettingFailure = createAction(
    '[AppSettingsState/API] Create App Setting Failure',
    props<{ error: any }>()
);

export const updateAppSetting = createAction(
    '[AppSettingsState/API] Update App Setting',
    props<{ request: UpdateAppSettingRequest }>()
);

export const updateAppSettingSuccess = createAction(
    '[AppSettingsState/API] Update App Setting Success'
);

export const updateAppSettingFailure = createAction(
    '[AppSettingsState/API] Update App Setting Failure',
    props<{ error: any }>()
);

export const deleteAppSetting = createAction(
    '[AppSettingsState/API] Delete App Setting',
    props<{ id: string }>()
);

export const deleteAppSettingSuccess = createAction(
    '[AppSettingsState/API] Delete App Setting Success'
);

export const deleteAppSettingFailure = createAction(
    '[AppSettingsState/API] Delete App Setting Failure',
    props<{ error: any }>()
);

export const resetState = createAction(
    '[AppSettingsState/API] Reset State'
);
