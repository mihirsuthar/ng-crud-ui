import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { readFirst } from '@nrwl/angular/testing';

import * as AppSettingsStateActions from './app-settings-state.actions';
import { AppSettingsStateEffects } from './app-settings-state.effects';
import { AppSettingsStateFacade } from './app-settings-state.facade';
import { AppSettingsStateEntity } from './app-settings-state.models';
import {
    APP_SETTINGS_STATE_FEATURE_KEY,
    AppSettingsStateState,
    initialAppSettingsStateState,
    appSettingsStateReducer,
} from './app-settings-state.reducer';
import * as AppSettingsStateSelectors from './app-settings-state.selectors';

interface TestSchema {
    appSettingsState: AppSettingsStateState;
}

describe('AppSettingsStateFacade', () => {
    let facade: AppSettingsStateFacade;
    let store: Store<TestSchema>;
    const createAppSettingsStateEntity = (
        id: string,
        name = ''
    ): AppSettingsStateEntity => ({
        id,
        name: name || `name-${id}`,
    });

    describe('used in NgModule', () => {
        beforeEach(() => {
            @NgModule({
                imports: [
                    StoreModule.forFeature(
                        APP_SETTINGS_STATE_FEATURE_KEY,
                        appSettingsStateReducer
                    ),
                    EffectsModule.forFeature([AppSettingsStateEffects]),
                ],
                providers: [AppSettingsStateFacade],
            })
            class CustomFeatureModule {}

            @NgModule({
                imports: [
                    StoreModule.forRoot({}),
                    EffectsModule.forRoot([]),
                    CustomFeatureModule,
                ],
            })
            class RootModule {}
            TestBed.configureTestingModule({ imports: [RootModule] });

            store = TestBed.inject(Store);
            facade = TestBed.inject(AppSettingsStateFacade);
        });

        /**
         * The initially generated facade::loadAll() returns empty array
         */
        it('loadAll() should return empty list with loaded == true', async () => {
            let list = await readFirst(facade.allAppSettingsState$);
            let isLoaded = await readFirst(facade.loaded$);

            expect(list.length).toBe(0);
            expect(isLoaded).toBe(false);

            facade.init();

            list = await readFirst(facade.allAppSettingsState$);
            isLoaded = await readFirst(facade.loaded$);

            expect(list.length).toBe(0);
            expect(isLoaded).toBe(true);
        });

        /**
         * Use `loadAppSettingsStateSuccess` to manually update list
         */
        it('allAppSettingsState$ should return the loaded list; and loaded flag == true', async () => {
            let list = await readFirst(facade.allAppSettingsState$);
            let isLoaded = await readFirst(facade.loaded$);

            expect(list.length).toBe(0);
            expect(isLoaded).toBe(false);

            store.dispatch(
                AppSettingsStateActions.loadAppSettingsStateSuccess({
                    appSettingsState: [
                        createAppSettingsStateEntity('AAA'),
                        createAppSettingsStateEntity('BBB'),
                    ],
                })
            );

            list = await readFirst(facade.allAppSettingsState$);
            isLoaded = await readFirst(facade.loaded$);

            expect(list.length).toBe(2);
            expect(isLoaded).toBe(true);
        });
    });
});
