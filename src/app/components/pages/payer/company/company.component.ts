import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { CompanyPayment } from 'src/app/model/payer/company';
import { CompanyPaymentService } from 'src/app/service/payer/company.payer.service';
@Component({
    templateUrl: './company.component.html',
    providers: [MessageService],
})
export class CompanyPayerComponent implements OnInit {
    companyDialog: boolean = false;
    deleteCompanyDialog: boolean = false;
    deleteDialog: boolean = false;

    companies: CompanyPayment[] = [];
    company: CompanyPayment = {};

    selected: CompanyPayment[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(
        private companyService: CompanyPaymentService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.companyService.getAll().then((data) => (this.companies = data));

        this.cols = [
            { field: 'name', header: 'Nome' },
            { field: 'description', header: 'Descrição' },
        ];
    }

    reset() {
        this.companies = [];
        this.companyService.getAll().then((data) => (this.companies = data));
    }

    openNew() {
        this.company = {};
        this.submitted = false;
        this.companyDialog = true;
    }

    deleteSelected() {
        this.deleteDialog = true;
    }

    edit(company: CompanyPayment) {
        this.company = { ...company };

        this.companyDialog = true;
    }

    delete(company: CompanyPayment) {
        this.deleteCompanyDialog = true;
        this.company = { ...company };
    }

    private update(company: CompanyPayment) {
        this.companyService
            .update(company.id, company)
            .then((data) => {
                this.companies = this.companies.map((val) => {
                    if (val.id === data.id) {
                        return data;
                    }
                    return val;
                });
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Registro atualizado',
                    life: 3000,
                });
            })
            .catch(() => {
                console.error('');
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: 'Erro ao alterar o registro',
                    life: 3000,
                });
            });
    }

    confirmDeleteSelected() {
        alert('aaa');
        this.deleteDialog = false;
        this.companyService
            .deleteAll(this.selected)
            .then(() => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Registros deletados',
                    life: 3000,
                });
            })
            .catch(() => {
                console.error('');
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: 'Erro ao deletar os registros selecionados',
                    life: 3000,
                });
            });
        this.companies = this.companies.filter(
            (val) => !this.selected.includes(val)
        );
        this.selected = [];
    }

    confirmDelete() {
        this.deleteCompanyDialog = false;
        this.companyService
            .delete(this.company.id!)
            .then(() => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Registro deletado',
                    life: 3000,
                });
            })
            .catch(() => {
                console.error('');
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: 'Erro ao deletar o registro',
                    life: 3000,
                });
            });
        this.companies = this.companies.filter(
            (val) => val.id !== this.company.id
        );

        this.company = {};
    }

    hideDialog() {
        this.companyDialog = false;
        this.submitted = false;
    }

    save() {
        this.submitted = true;

        if (this.company.name?.trim()) {
            if (this.company.id) {
                this.update(this.company);
            } else {
                this.companyService
                    .create(this.company)
                    .then((data) => {
                        this.companies = this.companies.map((val) => {
                            if (val.id === data.id) {
                                return data;
                            }
                            return val;
                        });
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Sucesso',
                            detail: 'Registro criado',
                            life: 3000,
                        });
                    })
                    .catch(() => {
                        console.error('');
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Erro',
                            detail: 'Erro ao criar o registro',
                            life: 3000,
                        });
                    });
                this.companies.push(this.company);
            }

            this.companies = [...this.companies];
            this.companyDialog = false;
            this.company = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.companies.length; i++) {
            if (this.companies[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }
}
