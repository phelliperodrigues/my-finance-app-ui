import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Revenue } from 'src/app/model/launch/revenue';

@Injectable()
export class RevenueService {
    constructor(private http: HttpClient) {}

    getAll(monthDate: Date): Promise<any> {
        return this.http
            .get<any>('assets/demo/data/revenues.json')
            .toPromise()
            .then((res) => res.data as Revenue[])
            .then((data) => data);
    }

    fetch(id: string): Promise<any> {
        return Promise.resolve({});
    }

    create(launch: any): Promise<any> {
        return Promise.resolve(launch);
    }

    update(id: string, launch: any): Promise<any> {
        return Promise.resolve(launch);
    }

    delete(id: string): Promise<any> {
        return Promise.resolve({});
    }

    deleteAll(ids: string[]): Promise<any> {
        return Promise.resolve({});
    }

    clone(id: string, dueDate: Date): Promise<any> {
        return Promise.resolve({});
    }

    receive(id: string, dueDate: Date): Promise<any> {
        return Promise.resolve({});
    }
}
