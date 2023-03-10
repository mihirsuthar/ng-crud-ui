import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppSetting } from '@ng-crud-ui/app-cilents';
import { AppSettingsStateFacade } from '@ng-crud-ui/app-settings';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'ng-crud-ui-app-settings-list',
    templateUrl: './app-settings-list.component.html',
    styleUrls: ['./app-settings-list.component.scss'],
})
export class AppSettingsListComponent implements OnInit {

    appSettings: AppSetting[] = [];

    constructor(public facade: AppSettingsStateFacade,
        private router: Router) {
    }

    ngOnInit() {
        this.facade.resetState();
        this.initSubscriptions();
        this.facade.getAppSettings();
    }

    initSubscriptions() {



        this.facade.appSettingsList$.subscribe((appSettings) => {
            if(appSettings && appSettings.length > 0) {
                this.appSettings = appSettings;
            }
        });
    }

    createAppSetting() {
        this.router.navigate(['newAppSetting']);
    }

    editAppSetting(id: string) {
        const appSetting = this.appSettings.find(a => a.id === id);
        this.router.navigate(['editAppSetting', id]);
    }
}
