import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MouthLauch } from '../api/mouth-launch';

@Injectable()
export class LaunchService {
    constructor(private http: HttpClient) {}

    getLaunchOfMounth() {
        return this.http
            .get<any>('assets/demo/data/launch-of-month.json')
            .toPromise()
            .then((res) => res.data as MouthLauch[])
            .then((data) => data);
    }
}
