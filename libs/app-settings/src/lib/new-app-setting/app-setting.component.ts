import { loadAppSettingSuccess } from './../+state/app-settings-state.actions';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AppSetting, CreateAppSettingRequest, ICreateAppSettingRequest, IUpdateAppSettingRequest, UpdateAppSettingRequest } from '@ng-crud-ui/app-cilents';
import { AppSettingsStateFacade } from '@ng-crud-ui/app-settings';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'ng-crud-ui-new-app-setting',
  templateUrl: './app-setting.component.html',
  styleUrls: ['./app-setting.component.scss']
})
export class AppSettingComponent implements OnInit {

    formGroup: FormGroup<AppSettingForm>;
    appSettingId: string | undefined;
    appSetting: AppSetting | undefined;
    pageMode: string;

    constructor(fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private facade: AppSettingsStateFacade,
        private _snackBar: MatSnackBar
    ) {
        this.formGroup = fb.group(new AppSettingForm());
        this.appSettingId = this.route.snapshot.params['id'];

        this.pageMode = !this.appSettingId && this.appSettingId !== '' ? 'create' : 'edit';

        if(this.appSettingId && this.appSettingId !== '') {
            this.facade.getAppSettingById(this.appSettingId as string);
        }

        console.log('AppSetting Id: ' + this.appSettingId + ' | Page Mode: ' + this.pageMode);
    }

    ngOnInit(): void {
        this.initSubscriptions();
    }

    initSubscriptions() {
        this.facade.createAppSettingFailure$
        .subscribe(failure => {
            if(failure) {
                this._snackBar.open("Create app setting failed", "Ok");
            }
        });

        this.facade.updateAppSettingFailure$
        .subscribe(failure => {
            if(failure) {
                this._snackBar.open("Update app setting failed", "Ok");
            }
        });

        this.facade.createAppSettingSuccess$
        .subscribe(success => {
            if(success) {
                this._snackBar.open("App setting created", "Ok");
                this.navigateToList();
            }
        });

        this.facade.updateAppSettingSuccess$
        .subscribe(success => {
            if(success) {
                this._snackBar.open("App setting updated", "Ok");
                this.navigateToList();
            }
        });

        combineLatest(this.facade.loadAppSettingSuccess$, this.facade.appSetting$)
        .subscribe(([loaded, appSetting]) => {
            if(loaded && appSetting) {
                console.log(appSetting);
                this.formGroup.controls.id.setValue(appSetting.id ?? '');
                this.formGroup.controls.referenceKey.setValue(appSetting.referenceKey ?? '');
                this.formGroup.controls.value.setValue(appSetting.value ?? '');
                this.formGroup.controls.description.setValue(appSetting.description ?? '');
                this.formGroup.controls.type.setValue(appSetting.type ?? '');
                this.formGroup.updateValueAndValidity();
                console.log(this.formGroup.value);
            }
        })
    }

    save() {
        const request = this.getRequestFromFormGroup();
        console.log(request);
        this.facade.createAppSetting(request);
    }

    edit() {
        const request = this.getRequestFromFormGroup();
        this.facade.updateAppSetting(request);
    }

    cancel() {
        this.navigateToList();
    }

    navigateToList() {
        this.router.navigate(['appSettings']);
    }

    getRequestFromFormGroup() {
        return this.pageMode === 'create' ?
        new CreateAppSettingRequest({
            referenceKey: this.formGroup.controls.referenceKey.value?.toString(),
            value: this.formGroup.controls.value.value?.toString(),
            description: this.formGroup.controls.description.value?.toString(),
            type: this.formGroup.controls.type.value?.toString(),
        } as ICreateAppSettingRequest) :
        new UpdateAppSettingRequest({
            id: this.formGroup.controls.id.value?.toString(),
            referenceKey: this.formGroup.controls.referenceKey.value?.toString(),
            value: this.formGroup.controls.value.value?.toString(),
            description: this.formGroup.controls.description.value?.toString(),
            type: this.formGroup.controls.type.value?.toString(),
        } as IUpdateAppSettingRequest)
    }
}

export class AppSettingForm {
    id: FormControl<string | null>;
    referenceKey: FormControl<string | null>;
    value: FormControl<string | null>;
    description: FormControl<string | null>;
    type: FormControl<string | null>;

    constructor() {
        this.id = new FormControl<string>('');
        this.referenceKey = new FormControl<string>('', Validators.required);
        this.value = new FormControl<string>('', Validators.required);
        this.description = new FormControl<string>('', Validators.required);
        this.type = new FormControl<string>('', Validators.required);
    }
}
