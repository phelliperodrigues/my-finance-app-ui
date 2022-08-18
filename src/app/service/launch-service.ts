import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExpenseCategory } from '../api/expense-category';
import { ExpenseType } from '../api/expense-type';
import { LaunchLastYear } from '../api/launch-last-year';
import { MouthLauch } from '../api/mouth-launch';
import { ResultLastYear } from '../api/result-last-year';

@Injectable()
export class LaunchService {
    constructor(private http: HttpClient) {}

    getLaunchOfMonth() {
        return this.http
            .get<any>('assets/demo/data/launch-of-month.json')
            .toPromise()
            .then((res) => res.data as MouthLauch[])
            .then((data) => data);
    }

    getSpendingByCategory() {
        return this.http
            .get<any>('assets/demo/data/spending-by-category.json')
            .toPromise()
            .then((res) => res.data as ExpenseCategory[])
            .then((data) => data);
    }

    getSpedingByType() {
        return this.http
            .get<any>('assets/demo/data/spending-by-type.json')
            .toPromise()
            .then((res) => res.data as ExpenseType[])
            .then((data) => data);
    }

    getLaunchLastYear() {
        return this.http
            .get<any>('assets/demo/data/launch-last-year.json')
            .toPromise()
            .then((res) => res.data as LaunchLastYear[])
            .then((data) => data);
    }

    getResultLastYear() {
        return this.http
            .get<any>('assets/demo/data/result-last-year.json')
            .toPromise()
            .then((res) => res.data as ResultLastYear[])
            .then((data) => data);
    }
}
