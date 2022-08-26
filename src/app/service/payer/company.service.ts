import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { CompanyProvider } from 'src/app/model/provider/company';
@Injectable()
export class CompanyProviderService {
    constructor(private http: HttpClient) {}

    getAll() {
        return firstValueFrom(
            this.http.get<CompanyProvider[]>('assets/demo/data/companies.json')
        );
    }

    fetch(id: string): Promise<CompanyProvider> {
        return Promise.resolve({});
    }

    create(company: CompanyProvider): Promise<CompanyProvider> {
        company.id = this.createId();

        return Promise.resolve(company);
    }

    update(id?: string, company?: CompanyProvider): Promise<any> {
        return Promise.resolve(company);
    }

    delete(id: string): Promise<CompanyProvider> {
        return Promise.resolve({});
    }

    deleteAll(companys: CompanyProvider[]): Promise<CompanyProvider> {
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
