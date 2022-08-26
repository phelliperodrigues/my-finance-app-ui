import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Expense } from 'src/app/model/launch/expense';

@Injectable()
export class ExpenseService {
    constructor(private http: HttpClient) {}

    getAll(monthDate: Date): Promise<any> {
        return this.http
            .get<any>('assets/demo/data/expenses.json')
            .toPromise()
            .then((res) => res.data as any[])
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

    deleteAll(expenses: Expense[]): Promise<any> {
        return Promise.resolve({});
    }

    clone(id: string, dueDate: Date): Promise<any> {
        return Promise.resolve({});
    }

    pay(id: string, dueDate: Date): Promise<any> {
        return Promise.resolve({});
    }
}
