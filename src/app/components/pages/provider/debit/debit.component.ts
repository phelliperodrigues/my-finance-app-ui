import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { CategoryProvider } from 'src/app/model/provider/category';
import { CompanyProvider } from 'src/app/model/provider/company';
import { Debit } from 'src/app/model/provider/debit';
import { User } from 'src/app/model/user/user';
import { CategoryProviderService } from 'src/app/service/provider/category.service';
import { CompanyProviderService } from 'src/app/service/provider/company.service';
import { DebitService } from 'src/app/service/provider/debit.service';
export interface TypeDebit {
    name: string;
}

@Component({
    templateUrl: './debit.component.html',
    providers: [MessageService],
})
export class DebitComponent implements OnInit {
    registerDialog: boolean = false;
    deleteRegisterDialog: boolean = false;
    deleteDialog: boolean = false;

    registers: Debit[] = [];
    register: Debit = {};

    selected: Debit[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    companies: CompanyProvider[] = [];
    categories: CategoryProvider[] = [];

    users: User[] = [];

    types: TypeDebit[] = [];
    owners = [];
    constructor(
        private service: DebitService,
        private messageService: MessageService,
        private companyService: CompanyProviderService,
        private categoryService: CategoryProviderService
    ) {
        this.types = [{ name: 'FIXO' }, { name: 'VARIÁVEL' }];
    }

    ngOnInit() {
        this.companyService.getAll().then((data) => (this.companies = data));
        this.categoryService.getAll().then((data) => (this.categories = data));

        this.service.getAll().then((data) => (this.registers = data));

        this.cols = [
            { field: 'name', header: 'Nome' },
            { field: 'company.name', header: 'Fornecedor' },
            { field: 'description', header: 'Descrição' },
            { field: 'category.name', header: 'Categoria' },
            { field: 'type', header: 'Tipo' },
            { field: 'owner', header: 'Pessoa' },
        ];
    }

    reset() {
        this.registers = [];
        this.service.getAll().then((data) => (this.registers = data));
    }

    openNew() {
        this.register = {};
        this.submitted = false;
        this.registerDialog = true;
    }

    deleteSelected() {
        this.deleteDialog = true;
    }

    edit(register: Debit) {
        this.register = { ...register };

        this.registerDialog = true;
    }

    delete(register: Debit) {
        this.deleteRegisterDialog = true;
        this.register = { ...register };
    }

    private update(register: Debit) {
        this.service
            .update(register.id, register)
            .then((data) => {
                this.registers = this.registers.map((val) => {
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
                    detail: 'Erro ao alterar a Registro',
                    life: 3000,
                });
            });
    }

    confirmDeleteSelected() {
        alert('aaa');
        this.deleteDialog = false;
        this.service
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
                    detail: 'Erro ao deletar as Registros selecionados',
                    life: 3000,
                });
            });
        this.registers = this.registers.filter(
            (val) => !this.selected.includes(val)
        );
        this.selected = [];
    }

    confirmDelete() {
        this.deleteRegisterDialog = false;
        this.service
            .delete(this.register.id!)
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
                    detail: 'Erro ao deletar a Registro',
                    life: 3000,
                });
            });
        this.registers = this.registers.filter(
            (val) => val.id !== this.register.id
        );

        this.register = {};
    }

    hideDialog() {
        this.registerDialog = false;
        this.submitted = false;
    }

    save() {
        this.submitted = true;

        if (this.register.name?.trim()) {
            if (this.register.id) {
                this.update(this.register);
            } else {
                this.service
                    .create(this.register)
                    .then((data) => {
                        this.registers = this.registers.map((val) => {
                            if (val.id === data.id) {
                                return data;
                            }
                            return val;
                        });
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Sucesso',
                            detail: 'Registro criada',
                            life: 3000,
                        });
                    })
                    .catch(() => {
                        console.error('');
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Erro',
                            detail: 'Erro ao criar a Registro',
                            life: 3000,
                        });
                    });
                this.registers.push(this.register);
            }

            this.registers = [...this.registers];
            this.registerDialog = false;
            this.register = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.registers.length; i++) {
            if (this.registers[i].id === id) {
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
