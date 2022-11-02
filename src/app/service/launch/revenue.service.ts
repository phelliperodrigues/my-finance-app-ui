import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Revenue } from 'src/app/model/launch/revenue';

@Injectable()
export class RevenueService {
    constructor(private http: HttpClient) {}

    getAll(monthDate: Date): Promise<any[]> {
        return this.http
            .get<any>('assets/demo/data/revenues.json')
            .toPromise()
            .then((res) => res.data as any[])
            .then((data) => data);
    }

    fetch(id: string): Promise<Revenue> {
        return Promise.resolve({});
    }

    create(revenue: Revenue): Promise<Revenue> {
        revenue.id = this.createId();

        return Promise.resolve(revenue);
    }

    update(id?: string, revenue?: Revenue): Promise<any> {
        return Promise.resolve(revenue);
    }

    delete(id: string): Promise<Revenue> {
        return Promise.resolve({});
    }

    deleteAll(revenues: Revenue[]): Promise<Revenue> {
        return Promise.resolve({});
    }

    clone(id: string, dueDate: Date): Promise<Revenue> {
        return Promise.resolve({});
    }

    receive(id: string, dueDate: Date): Promise<Revenue> {
        return Promise.resolve({});
    }

    private createId(): string {
        let id = '';
        const chars =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }
}
