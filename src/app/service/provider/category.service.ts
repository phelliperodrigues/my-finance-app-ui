import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { CategoryProvider } from 'src/app/model/provider/category';
@Injectable()
export class CategoryProviderService {
    constructor(private http: HttpClient) {}

    getAll() {
        return firstValueFrom(
            this.http.get<CategoryProvider[]>(
                'assets/demo/data/categories.json'
            )
        );
    }

    fetch(id: string): Promise<CategoryProvider> {
        return Promise.resolve({});
    }

    create(category: CategoryProvider): Promise<CategoryProvider> {
        category.id = this.createId();

        return Promise.resolve(category);
    }

    update(id?: string, category?: CategoryProvider): Promise<any> {
        return Promise.resolve(category);
    }

    delete(id: string): Promise<CategoryProvider> {
        return Promise.resolve({});
    }

    deleteAll(categorys: CategoryProvider[]): Promise<CategoryProvider> {
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
