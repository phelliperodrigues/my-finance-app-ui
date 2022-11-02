import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Debit } from 'src/app/model/provider/debit';
@Injectable()
export class DebitService {
    constructor(private http: HttpClient) {}

    getAll() {
        return firstValueFrom(
            this.http.get<Debit[]>('assets/demo/data/debits.json')
        );
    }

    fetch(id: string): Promise<Debit> {
        return Promise.resolve({});
    }

    create(debit: Debit): Promise<Debit> {
        debit.id = this.createId();

        return Promise.resolve(debit);
    }

    update(id?: string, debit?: Debit): Promise<any> {
        return Promise.resolve(debit);
    }

    delete(id: string): Promise<Debit> {
        return Promise.resolve({});
    }

    deleteAll(debits: Debit[]): Promise<Debit> {
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
