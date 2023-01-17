/* tslint:disable */
/* eslint-disable */
//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.11.1.0 (NJsonSchema v10.4.3.0 (Newtonsoft.Json v11.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------
// ReSharper disable InconsistentNaming

import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf, EMPTY } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable()
export class AppSettingsClient {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
    }

    /**
     * Returns existing app settings
     * @return List of existing app settings
     */
    appSettingsGet(): Observable<AppSetting[]> {
        let url_ = this.baseUrl + "/api/AppSettings";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processAppSettingsGet(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processAppSettingsGet(<any>response_);
                } catch (e) {
                    return <Observable<AppSetting[]>><any>_observableThrow(e);
                }
            } else
                return <Observable<AppSetting[]>><any>_observableThrow(response_);
        }));
    }

    protected processAppSettingsGet(response: HttpResponseBase): Observable<AppSetting[]> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (Array.isArray(resultData200)) {
                result200 = [] as any;
                for (let item of resultData200)
                    result200!.push(AppSetting.fromJS(item));
            }
            else {
                result200 = <any>null;
            }
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return EMPTY;
    }

    /**
     * Creates new app setting
     * @param body (optional) New app setting request
     * @return Guid of newly created app setting
     */
    appSettingsPost(body: CreateAppSettingRequest | undefined): Observable<string> {
        let url_ = this.baseUrl + "/api/AppSettings";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Accept": "application/json"
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processAppSettingsPost(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processAppSettingsPost(<any>response_);
                } catch (e) {
                    return <Observable<string>><any>_observableThrow(e);
                }
            } else
                return <Observable<string>><any>_observableThrow(response_);
        }));
    }

    protected processAppSettingsPost(response: HttpResponseBase): Observable<string> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 201) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result201: any = null;
            let resultData201 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result201 = resultData201 !== undefined ? resultData201 : <any>null;
            return _observableOf(result201);
            }));
        } else if (status === 400) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result400: any = null;
            let resultData400 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result400 = ProblemDetails.fromJS(resultData400);
            return throwException("Unaccessible request", status, _responseText, _headers, result400);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<string>(<any>null);
    }

    /**
     * Updates existing app setting
     * @param body (optional) Edit app settings request
     * @return App setting updated successfully
     */
    appSettingsPut(body: UpdateAppSettingRequest | undefined): Observable<void> {
        let url_ = this.baseUrl + "/api/AppSettings";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
            })
        };

        return this.http.request("put", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processAppSettingsPut(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processAppSettingsPut(<any>response_);
                } catch (e) {
                    return <Observable<void>><any>_observableThrow(e);
                }
            } else
                return <Observable<void>><any>_observableThrow(response_);
        }));
    }

    protected processAppSettingsPut(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return _observableOf<void>(<any>null);
            }));
        } else if (status === 400) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result400: any = null;
            let resultData400 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result400 = ProblemDetails.fromJS(resultData400);
            return throwException("Unaccessible request", status, _responseText, _headers, result400);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<void>(<any>null);
    }

    /**
     * Returns existing app setting
     * @param appSettingId Guid of existing app setting
     * @return Existing app setting
     */
    appSettingsGetById(appSettingId: string): Observable<AppSetting> {
        let url_ = this.baseUrl + "/api/AppSettings/{appSettingId}";
        if (appSettingId === undefined || appSettingId === null)
            throw new Error("The parameter 'appSettingId' must be defined.");
        url_ = url_.replace("{appSettingId}", encodeURIComponent("" + appSettingId));
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processAppSettingsGetById(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processAppSettingsGetById(<any>response_);
                } catch (e) {
                    return <Observable<AppSetting>><any>_observableThrow(e);
                }
            } else
                return <Observable<AppSetting>><any>_observableThrow(response_);
        }));
    }

    protected processAppSettingsGetById(response: HttpResponseBase): Observable<AppSetting> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = AppSetting.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<AppSetting>(<any>null);
    }

    /**
     * Deletes existing app setting
     * @param appSettingId Guid of existing app setting
     * @return App setting deleted successfully
     */
    appSettingsDelete(appSettingId: string): Observable<void> {
        let url_ = this.baseUrl + "/api/AppSettings/{appSettingId}";
        if (appSettingId === undefined || appSettingId === null)
            throw new Error("The parameter 'appSettingId' must be defined.");
        url_ = url_.replace("{appSettingId}", encodeURIComponent("" + appSettingId));
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
            })
        };

        return this.http.request("delete", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processAppSettingsDelete(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processAppSettingsDelete(<any>response_);
                } catch (e) {
                    return <Observable<void>><any>_observableThrow(e);
                }
            } else
                return <Observable<void>><any>_observableThrow(response_);
        }));
    }

    protected processAppSettingsDelete(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return _observableOf<void>(<any>null);
            }));
        } else if (status === 400) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result400: any = null;
            let resultData400 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result400 = ProblemDetails.fromJS(resultData400);
            return throwException("Unaccessible request", status, _responseText, _headers, result400);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<void>(<any>null);
    }
}

export class AppSetting implements IAppSetting {
    id?: string;
    referenceKey?: string | undefined;
    value?: string | undefined;
    description?: string | undefined;
    type?: string | undefined;

    constructor(data?: IAppSetting) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.referenceKey = _data["referenceKey"];
            this.value = _data["value"];
            this.description = _data["description"];
            this.type = _data["type"];
        }
    }

    static fromJS(data: any): AppSetting {
        data = typeof data === 'object' ? data : {};
        let result = new AppSetting();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["referenceKey"] = this.referenceKey;
        data["value"] = this.value;
        data["description"] = this.description;
        data["type"] = this.type;
        return data;
    }
}

export interface IAppSetting {
    id?: string;
    referenceKey?: string | undefined;
    value?: string | undefined;
    description?: string | undefined;
    type?: string | undefined;
}

export class CreateAppSettingRequest implements ICreateAppSettingRequest {
    referenceKey?: string | undefined;
    value?: string | undefined;
    description?: string | undefined;
    type?: string | undefined;

    constructor(data?: ICreateAppSettingRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.referenceKey = _data["referenceKey"];
            this.value = _data["value"];
            this.description = _data["description"];
            this.type = _data["type"];
        }
    }

    static fromJS(data: any): CreateAppSettingRequest {
        data = typeof data === 'object' ? data : {};
        let result = new CreateAppSettingRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["referenceKey"] = this.referenceKey;
        data["value"] = this.value;
        data["description"] = this.description;
        data["type"] = this.type;
        return data;
    }
}

export interface ICreateAppSettingRequest {
    referenceKey?: string | undefined;
    value?: string | undefined;
    description?: string | undefined;
    type?: string | undefined;
}

export class ProblemDetails implements IProblemDetails {
    type?: string | undefined;
    title?: string | undefined;
    status?: number | undefined;
    detail?: string | undefined;
    instance?: string | undefined;

    constructor(data?: IProblemDetails) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.type = _data["type"];
            this.title = _data["title"];
            this.status = _data["status"];
            this.detail = _data["detail"];
            this.instance = _data["instance"];
        }
    }

    static fromJS(data: any): ProblemDetails {
        data = typeof data === 'object' ? data : {};
        let result = new ProblemDetails();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["type"] = this.type;
        data["title"] = this.title;
        data["status"] = this.status;
        data["detail"] = this.detail;
        data["instance"] = this.instance;
        return data;
    }
}

export interface IProblemDetails {
    type?: string | undefined;
    title?: string | undefined;
    status?: number | undefined;
    detail?: string | undefined;
    instance?: string | undefined;
}

export class UpdateAppSettingRequest implements IUpdateAppSettingRequest {
    id?: string;
    referenceKey?: string | undefined;
    value?: string | undefined;
    description?: string | undefined;
    type?: string | undefined;

    constructor(data?: IUpdateAppSettingRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.referenceKey = _data["referenceKey"];
            this.value = _data["value"];
            this.description = _data["description"];
            this.type = _data["type"];
        }
    }

    static fromJS(data: any): UpdateAppSettingRequest {
        data = typeof data === 'object' ? data : {};
        let result = new UpdateAppSettingRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["referenceKey"] = this.referenceKey;
        data["value"] = this.value;
        data["description"] = this.description;
        data["type"] = this.type;
        return data;
    }
}

export interface IUpdateAppSettingRequest {
    id?: string;
    referenceKey?: string | undefined;
    value?: string | undefined;
    description?: string | undefined;
    type?: string | undefined;
}

export class ApiException extends Error {
    override message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isApiException = true;

    static isApiException(obj: any): obj is ApiException {
        return obj.isApiException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
    if (result !== null && result !== undefined)
        return _observableThrow(result);
    else
        return _observableThrow(new ApiException(message, status, response, headers, null));
}

function blobToText(blob: any): Observable<string> {
    return new Observable<string>((observer: any) => {
        if (!blob) {
            observer.next("");
            observer.complete();
        } else {
            let reader = new FileReader();
            reader.onload = event => {
                observer.next((<any>event.target).result);
                observer.complete();
            };
            reader.readAsText(blob);
        }
    });
}