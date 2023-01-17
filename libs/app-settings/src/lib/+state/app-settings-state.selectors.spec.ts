import { AppSettingsStateEntity } from './app-settings-state.models';
import {
    appSettingsStateAdapter,
    AppSettingsStatePartialState,
    initialAppSettingsStateState,
} from './app-settings-state.reducer';
import * as AppSettingsStateSelectors from './app-settings-state.selectors';

describe('AppSettingsState Selectors', () => {
    const ERROR_MSG = 'No Error Available';
    const getAppSettingsStateId = (it: AppSettingsStateEntity) => it.id;
    const createAppSettingsStateEntity = (id: string, name = '') =>
        ({
            id,
            name: name || `name-${id}`,
        } as AppSettingsStateEntity);

    let state: AppSettingsStatePartialState;

    beforeEach(() => {
        state = {
            appSettingsState: appSettingsStateAdapter.setAll(
                [
                    createAppSettingsStateEntity('PRODUCT-AAA'),
                    createAppSettingsStateEntity('PRODUCT-BBB'),
                    createAppSettingsStateEntity('PRODUCT-CCC'),
                ],
                {
                    ...initialAppSettingsStateState,
                    selectedId: 'PRODUCT-BBB',
                    error: ERROR_MSG,
                    loaded: true,
                }
            ),
        };
    });

    describe('AppSettingsState Selectors', () => {
        it('selectAllAppSettingsState() should return the list of AppSettingsState', () => {
            const results =
                AppSettingsStateSelectors.selectAllAppSettingsState(state);
            const selId = getAppSettingsStateId(results[1]);

            expect(results.length).toBe(3);
            expect(selId).toBe('PRODUCT-BBB');
        });

        it('selectEntity() should return the selected Entity', () => {
            const result = AppSettingsStateSelectors.selectEntity(
                state
            ) as AppSettingsStateEntity;
            const selId = getAppSettingsStateId(result);

            expect(selId).toBe('PRODUCT-BBB');
        });

        it('selectAppSettingsStateLoaded() should return the current "loaded" status', () => {
            const result =
                AppSettingsStateSelectors.selectAppSettingsStateLoaded(state);

            expect(result).toBe(true);
        });

        it('selectAppSettingsStateError() should return the current "error" state', () => {
            const result =
                AppSettingsStateSelectors.selectAppSettingsStateError(state);

            expect(result).toBe(ERROR_MSG);
        });
    });
});
