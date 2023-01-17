import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as AppSettingsStateActions from './app-settings-state.actions';
import { AppSettingsStateEffects } from './app-settings-state.effects';

describe('AppSettingsStateEffects', () => {
    let actions: Observable<Action>;
    let effects: AppSettingsStateEffects;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [
                AppSettingsStateEffects,
                provideMockActions(() => actions),
                provideMockStore(),
            ],
        });

        effects = TestBed.inject(AppSettingsStateEffects);
    });

    describe('init$', () => {
        it('should work', () => {
            actions = hot('-a-|', {
                a: AppSettingsStateActions.initAppSettingsState(),
            });

            const expected = hot('-a-|', {
                a: AppSettingsStateActions.loadAppSettingsStateSuccess({
                    appSettingsState: [],
                }),
            });

            expect(effects.init$).toBeObservable(expected);
        });
    });
});
