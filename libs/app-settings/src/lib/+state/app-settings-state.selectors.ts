import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
    APP_SETTINGS_STATE_FEATURE_KEY,
    AppSettingsStateState,
    appSettingsStateAdapter,
} from './app-settings-state.reducer';

// Lookup the 'AppSettingsState' feature state managed by NgRx
export const selectAppSettingsStateState =
    createFeatureSelector<AppSettingsStateState>(
        APP_SETTINGS_STATE_FEATURE_KEY
    );

const { selectAll, selectEntities } = appSettingsStateAdapter.getSelectors();

export const selectAppSettingsStateLoaded = createSelector(
    selectAppSettingsStateState,
    (state: AppSettingsStateState) => state.loaded
);

export const selectAppSettingsStateError = createSelector(
    selectAppSettingsStateState,
    (state: AppSettingsStateState) => state.error
);

export const selectAllAppSettingsState = createSelector(
    selectAppSettingsStateState,
    (state: AppSettingsStateState) => selectAll(state)
);

export const selectAppSettingsStateEntities = createSelector(
    selectAppSettingsStateState,
    (state: AppSettingsStateState) => selectEntities(state)
);

export const selectSelectedId = createSelector(
    selectAppSettingsStateState,
    (state: AppSettingsStateState) => state.selectedId
);

export const selectEntity = createSelector(
    selectAppSettingsStateEntities,
    selectSelectedId,
    (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);

export const appSettings = createSelector(
    selectAppSettingsStateState,
    (state: AppSettingsStateState) => state.appSettingsList
);

export const loadingAppSettings = createSelector(
    selectAppSettingsStateState,
    (state: AppSettingsStateState) => state.loadingAppSettingsList
);

export const loadApSettingsSuccess = createSelector(
    selectAppSettingsStateState,
    (state: AppSettingsStateState) => state.getAppSettingListSuccess
);

export const loadApSettingsFailure = createSelector(
    selectAppSettingsStateState,
    (state: AppSettingsStateState) => state.getAppSettingListFailure
);

export const loadAppSettingsError = createSelector(
    selectAppSettingsStateState,
    (state: AppSettingsStateState) => state.getAppSettingsError
);

export const appSetting = createSelector(
    selectAppSettingsStateState,
    (state: AppSettingsStateState) => state.appSetting
);

export const loadingAppSetting = createSelector(
    selectAppSettingsStateState,
    (state: AppSettingsStateState) => state.loadingAppSetting
);

export const loadApSettingSuccess = createSelector(
    selectAppSettingsStateState,
    (state: AppSettingsStateState) => state.getAppSettingSuccess
);

export const loadApSettingFailure = createSelector(
    selectAppSettingsStateState,
    (state: AppSettingsStateState) => state.getAppSettingFailure
);

export const creatingAppSetting = createSelector(
    selectAppSettingsStateState,
    (state: AppSettingsStateState) => state.creatingAppSetting
);

export const createAppSettingSuccess = createSelector(
    selectAppSettingsStateState,
    (state: AppSettingsStateState) => state.createAppSettingSuccess
);

export const createAppSettingFailure = createSelector(
    selectAppSettingsStateState,
    (state: AppSettingsStateState) => state.createAppSettingFailure
);

export const createAppSettingError = createSelector(
    selectAppSettingsStateState,
    (state: AppSettingsStateState) => state.createAppSettingError
);

export const updatingAppSetting = createSelector(
    selectAppSettingsStateState,
    (state: AppSettingsStateState) => state.updatingAppSetting
);

export const updateAppSettingSuccess = createSelector(
    selectAppSettingsStateState,
    (state: AppSettingsStateState) => state.updateAppSettingSuccess
);

export const updateAppSettingFailure = createSelector(
    selectAppSettingsStateState,
    (state: AppSettingsStateState) => state.updateAppSettingFailure
);

export const updateAppSettingError = createSelector(
    selectAppSettingsStateState,
    (state: AppSettingsStateState) => state.updateAppSettingError
);

export const deletingAppSetting = createSelector(
    selectAppSettingsStateState,
    (state: AppSettingsStateState) => state.deletingAppSetting
);

export const deleteAppSettingSuccess = createSelector(
    selectAppSettingsStateState,
    (state: AppSettingsStateState) => state.deleteAppSettingSuccess
);

export const deleteAppSettingFailure = createSelector(
    selectAppSettingsStateState,
    (state: AppSettingsStateState) => state.deleteAppSettingFailure
);

export const deleteAppSettingError = createSelector(
    selectAppSettingsStateState,
    (state: AppSettingsStateState) => state.deleteAppSettingError
);
