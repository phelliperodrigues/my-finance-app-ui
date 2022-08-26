import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { CompanyPayment } from 'src/app/model/payer/company';
@Injectable()
export class CompanyPaymentService {
    constructor(private http: HttpClient) {}

    getAll() {
        return firstValueFrom(
            this.http.get<CompanyPayment[]>('assets/demo/data/companies.json')
        );
    }

    fetch(id: string): Promise<CompanyPayment> {
        return Promise.resolve({});
    }

    create(company: CompanyPayment): Promise<CompanyPayment> {
        company.id = this.createId();

        return Promise.resolve(company);
    }

    update(id?: string, company?: CompanyPayment): Promise<any> {
        return Promise.resolve(company);
    }

    delete(id: string): Promise<CompanyPayment> {
        return Promise.resolve({});
    }

    deleteAll(companys: CompanyPayment[]): Promise<CompanyPayment> {
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
