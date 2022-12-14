import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExpenseCategory } from '../../model/dashboard/expense-category';
import { ExpenseType } from '../../model/dashboard/expense-type';
import { LaunchByMonth } from '../../model/dashboard/launch-last-year';
import { MouthLauch } from '../../model/dashboard/mouth-launch';
import { ResultLastYear } from '../../model/dashboard/result-last-year';
import { Resume } from '../../model/dashboard/resume';
import { ResumeActual } from '../../model/dashboard/resume-actual';

@Injectable()
export class DashboardService {
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
            .then((res) => res.data as LaunchByMonth[])
            .then((data) => data);
    }

    getLaunchFuture() {
        return this.http
            .get<any>('assets/demo/data/launch-future.json')
            .toPromise()
            .then((res) => res.data as LaunchByMonth[])
            .then((data) => data);
    }

    getResultLastYear() {
        return this.http
            .get<any>('assets/demo/data/result-last-year.json')
            .toPromise()
            .then((res) => res.data as ResultLastYear[])
            .then((data) => data);
    }

    getResume(monthDate: Date) {
        return this.http
            .get<any>('assets/demo/data/resume-by-month.json')
            .toPromise()
            .then((res) => res.data as Resume)
            .then((data) => data);
    }

    getResumeActual() {
        return this.http
            .get<any>('assets/demo/data/resume-actual.json')
            .toPromise()
            .then((res) => res.data as ResumeActual)
            .then((data) => data);
    }
}
