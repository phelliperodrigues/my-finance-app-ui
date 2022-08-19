import { Injectable } from '@angular/core';

@Injectable()
export class ExpenseService {
    getAll(): Promise<any> {
        return Promise.resolve([]);
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

    pay(id: string, dueDate: Date): Promise<any> {
        return Promise.resolve({});
    }
}
