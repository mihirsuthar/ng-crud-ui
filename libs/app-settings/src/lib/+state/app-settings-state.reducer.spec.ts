import { Action } from '@ngrx/store';

import * as AppSettingsStateActions from './app-settings-state.actions';
import { AppSettingsStateEntity } from './app-settings-state.models';
import {
    AppSettingsStateState,
    initialAppSettingsStateState,
    appSettingsStateReducer,
} from './app-settings-state.reducer';

describe('AppSettingsState Reducer', () => {
    const createAppSettingsStateEntity = (
        id: string,
        name = ''
    ): AppSettingsStateEntity => ({
        id,
        name: name || `name-${id}`,
    });

    describe('valid AppSettingsState actions', () => {
        it('loadAppSettingsStateSuccess should return the list of known AppSettingsState', () => {
            const appSettingsState = [
                createAppSettingsStateEntity('PRODUCT-AAA'),
                createAppSettingsStateEntity('PRODUCT-zzz'),
            ];
            const action = AppSettingsStateActions.loadAppSettingsStateSuccess({
                appSettingsState,
            });

            const result: AppSettingsStateState = appSettingsStateReducer(
                initialAppSettingsStateState,
                action
            );

            expect(result.loaded).toBe(true);
            expect(result.ids.length).toBe(2);
        });
    });

    describe('unknown action', () => {
        it('should return the previous state', () => {
            const action = {} as Action;

            const result = appSettingsStateReducer(
                initialAppSettingsStateState,
                action
            );

            expect(result).toBe(initialAppSettingsStateState);
        });
    });
});
