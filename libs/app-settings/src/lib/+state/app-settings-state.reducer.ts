import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as AppSettingsStateActions from './app-settings-state.actions';
import { AppSettingsStateEntity } from './app-settings-state.models';

import { AppSetting } from '@ng-crud-ui/app-cilents';
import { stat } from 'fs';

export const APP_SETTINGS_STATE_FEATURE_KEY = 'appSettingsState';

export interface AppSettingsStateState
    extends EntityState<AppSettingsStateEntity> {
    selectedId?: string | number; // which AppSettingsState record has been selected
    loaded: boolean; // has the AppSettingsState list been loaded
    error?: string | null; // last known error (if any)
    appSettingsList: AppSetting[];
    loadingAppSettingsList: boolean;
    getAppSettingListSuccess: boolean;
    getAppSettingListFailure: boolean;
    appSetting: AppSetting | undefined;
    loadingAppSetting: boolean;
    getAppSettingSuccess: boolean;
    getAppSettingFailure: boolean;
    getAppSettingsError: string | undefined;
    creatingAppSetting: boolean;
    createAppSettingSuccess: boolean;
    createAppSettingFailure: boolean;
    createAppSettingError: string | undefined;
    updatingAppSetting: boolean;
    updateAppSettingSuccess: boolean;
    updateAppSettingFailure: boolean;
    updateAppSettingError: string | undefined;
    deletingAppSetting: boolean;
    deleteAppSettingSuccess: boolean;
    deleteAppSettingFailure: boolean;
    deleteAppSettingError: string | undefined;
}

const initialState: any = {
    // set initial required properties
    loaded: false,
    appSettingsList: [],
    loadingAppSettingsList: false,
    getAppSettingListSuccess: false,
    getAppSettingListFailure: false,
    getAppSettingsError: undefined,
    appSetting: undefined,
    loadingAppSetting: false,
    getAppSettingSuccess: false,
    getAppSettingFailure: false,
    getAppSettingError: undefined,
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
};

export interface AppSettingsStatePartialState {
    readonly [APP_SETTINGS_STATE_FEATURE_KEY]: AppSettingsStateState;
}

export const appSettingsStateAdapter: EntityAdapter<AppSettingsStateEntity> =
    createEntityAdapter<AppSettingsStateEntity>();

export const initialAppSettingsStateState: AppSettingsStateState =
    appSettingsStateAdapter.getInitialState(initialState);

const reducer = createReducer(
    initialAppSettingsStateState,
    on(AppSettingsStateActions.initAppSettingsState, (state) => ({
        ...state,
        loaded: false,
        error: null,
    })),
    on(
        AppSettingsStateActions.loadAppSettingsStateSuccess,
        (state, { appSettingsState }) =>
            appSettingsStateAdapter.setAll(appSettingsState, {
                ...state,
                loaded: true,
            })
    ),
    on(
        AppSettingsStateActions.loadAppSettingsStateFailure,
        (state, { error }) => ({ ...state, error })
    ),
    on(
        AppSettingsStateActions.loadAppSettingsList, (state) => ({
            ...state,
            loadingAppSettingsList: true,
            appSettingsList: [],
            getAppSettingsListFailure: false,
            getAppSettingsListSuccess: false,
            getAppSettingsError: undefined
        })
    ),
    on(
        AppSettingsStateActions.loadAppSettingsListSuccess, (state, response) => ({
            ...state,
            loadingAppSettingsList: false,
            appSettingsList: response.appSettings,
            getAppSettingsListFailure: false,
            getAppSettingsListSuccess: true,
            getAppSettingsError: undefined
        })
    ),
    on(
        AppSettingsStateActions.loadAppSettingsListFailure, (state, response) => ({
            ...state,
            loadingAppSettingsList: false,
            appSettingsList: [],
            getAppSettingsListFailure: true,
            getAppSettingsListSuccess: false,
            getAppSettingsError: response.error
        })
    ),
    on(
        AppSettingsStateActions.loadAppSettingById, (state) => ({
            ...state,
            loadingAppSetting: true,
            appSetting: undefined,
            getAppSettingFailure: false,
            getAppSettingSuccess: false,
            getAppSettingError: undefined
        })
    ),
    on(
        AppSettingsStateActions.loadAppSettingSuccess, (state, response) => ({
            ...state,
            loadingAppSetting: false,
            appSetting: response.appSetting,
            getAppSettingFailure: false,
            getAppSettingSuccess: true,
            getAppSettingError: undefined
        })
    ),
    on(
        AppSettingsStateActions.loadAppSettingFailure, (state, response) => ({
            ...state,
            loadingAppSetting: false,
            appSetting: undefined,
            getAppSettingFailure: true,
            getAppSettingSuccess: false,
            getAppSettingError: response.error
        })
    ),
    on(
        AppSettingsStateActions.createAppSetting, (state) => ({
            ...state,
            creatingAppSetting: true,
            createAppSettingSuccess: false,
            createAppSettingFailure: false,
            createAppSettingError: undefined,
        })
    ),
    on(
        AppSettingsStateActions.createAppSettingSuccess, (state) => ({
            ...state,
            creatingAppSetting: false,
            createAppSettingSuccess: true,
            createAppSettingFailure: false,
            createAppSettingError: undefined,
        })
    ),
    on(
        AppSettingsStateActions.createAppSettingFailure, (state, response) => ({
            ...state,
            creatingAppSetting: false,
            createAppSettingSuccess: false,
            createAppSettingFailure: true,
            createAppSettingError: response.error,
        })
    ),
    on(
        AppSettingsStateActions.updateAppSetting, (state) => ({
            ...state,
            updatingAppSetting: true,
            updateAppSettingSuccess: false,
            updateAppSettingFailure: false,
            updateAppSettingError: undefined,
        })
    ),
    on(
        AppSettingsStateActions.updateAppSettingSuccess, (state) => ({
            ...state,
            updatingAppSetting: false,
            updateAppSettingSuccess: true,
            updateAppSettingFailure: false,
            updateAppSettingError: undefined,
        })
    ),
    on(
        AppSettingsStateActions.updateAppSettingFailure, (state, response) => ({
            ...state,
            updatingAppSetting: false,
            updateAppSettingSuccess: false,
            updateAppSettingFailure: true,
            updateAppSettingError: response.error,
        })
    ),
    on(
        AppSettingsStateActions.deleteAppSetting, (state) => ({
            ...state,
            deletingAppSetting: true,
            deleteAppSettingSuccess: false,
            deleteAppSettingFailure: false,
            deleteAppSettingError: undefined,
        })
    ),
    on(
        AppSettingsStateActions.deleteAppSettingSuccess, (state) => ({
            ...state,
            deletingAppSetting: false,
            deleteAppSettingSuccess: true,
            deleteAppSettingFailure: false,
            deleteAppSettingError: undefined,
        })
    ),
    on(
        AppSettingsStateActions.deleteAppSettingFailure, (state, response) => ({
            ...state,
            deletingAppSetting: false,
            deleteAppSettingSuccess: false,
            deleteAppSettingFailure: true,
            deleteAppSettingError: response.error,
        })
    ),
    on(
        AppSettingsStateActions.resetState, () => (initialState)
    ),
);

export function appSettingsStateReducer(
    state: AppSettingsStateState | undefined,
    action: Action
) {
    return reducer(state, action);
}
