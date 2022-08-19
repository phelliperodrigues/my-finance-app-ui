import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Product } from 'src/app/demo/api/product';
import { Revenue } from 'src/app/model/launch/revenue';
import { RevenueService } from 'src/app/service/launch/revenue.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
    templateUrl: './revenue.component.html',
    providers: [MessageService],
})
export class RevenueComponent implements OnInit {
    productDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    product: Product = {};
    products: Product[] = [];

    revenues: Revenue[] = [];

    revenue: Revenue = {};

    selectedProducts: Product[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    monthDate: Date = new Date();

    constructor(
        private productService: ProductService,
        private revenueService: RevenueService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.revenueService
            .getAll(this.monthDate)
            .then((data) => (this.revenues = data));

        this.cols = [
            { field: 'name', header: 'Nome' },
            { field: 'company.name', header: 'Origem' },
            { field: 'dueDate', header: 'Data Pagamento' },
            { field: 'value', header: 'Valor' },
            { field: 'status', header: 'Status' },
        ];

        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' },
        ];
    }

    openNew() {
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(product: Product) {
        this.product = { ...product };
        this.productDialog = true;
    }

    deleteProduct(product: Product) {
        this.deleteProductDialog = true;
        this.product = { ...product };
    }

    clone(object: any) {
        this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Entrada clonada com sucesso',
            life: 3000,
        });
        return JSON.parse(JSON.stringify(object));
    }

    pay(revenue: Revenue) {
        revenue.status = 'PAID';
        this.revenueService.update(revenue.id!, revenue).then((data) => {
            this.revenues = this.revenues.map((val) => {
                if (val.id === data.id) {
                    return data;
                }
                return val;
            });
            this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Entrada recebida com sucesso',
                life: 3000,
            });
        });
    }

    confirmDeleteSelected() {
        this.deleteProductsDialog = false;
        this.revenues = this.revenues.filter(
            (val) => !this.selectedProducts.includes(val)
        );
        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Products Deleted',
            life: 3000,
        });
        this.selectedProducts = [];
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.products = this.products.filter(
            (val) => val.id !== this.product.id
        );
        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Product Deleted',
            life: 3000,
        });
        this.product = {};
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;

        if (this.product.name?.trim()) {
            if (this.product.id) {
                // @ts-ignore
                this.product.inventoryStatus = this.product.inventoryStatus
                    .value
                    ? this.product.inventoryStatus.value
                    : this.product.inventoryStatus;
                this.products[this.findIndexById(this.product.id)] =
                    this.product;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Product Updated',
                    life: 3000,
                });
            } else {
                this.product.id = this.createId();
                this.product.code = this.createId();
                this.product.image = 'product-placeholder.svg';
                // @ts-ignore
                this.product.inventoryStatus = this.product.inventoryStatus
                    ? this.product.inventoryStatus.value
                    : 'INSTOCK';
                this.products.push(this.product);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Product Created',
                    life: 3000,
                });
            }

            this.products = [...this.products];
            this.productDialog = false;
            this.product = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }
}
