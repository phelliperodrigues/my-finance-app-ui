import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { CategoryProvider } from 'src/app/model/provider/category';
import { CategoryProviderService } from 'src/app/service/provider/category.service';
@Component({
    templateUrl: './category.component.html',
    providers: [MessageService],
})
export class CategoryProviderComponent implements OnInit {
    companyDialog: boolean = false;
    deleteCompanyDialog: boolean = false;
    deleteDialog: boolean = false;

    registers: CategoryProvider[] = [];
    register: CategoryProvider = {};

    selected: CategoryProvider[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(
        private companyService: CategoryProviderService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.companyService.getAll().then((data) => (this.registers = data));

        this.cols = [
            { field: 'name', header: 'Nome' },
            { field: 'description', header: 'Descrição' },
        ];
    }

    reset() {
        this.registers = [];
        this.companyService.getAll().then((data) => (this.registers = data));
    }

    openNew() {
        this.register = {};
        this.submitted = false;
        this.companyDialog = true;
    }

    deleteSelected() {
        this.deleteDialog = true;
    }

    edit(company: CategoryProvider) {
        this.register = { ...company };

        this.companyDialog = true;
    }

    delete(company: CategoryProvider) {
        this.deleteCompanyDialog = true;
        this.register = { ...company };
    }

    private update(company: CategoryProvider) {
        this.companyService
            .update(company.id, company)
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
                    detail: 'Registroes  deletados',
                    life: 3000,
                });
            })
            .catch(() => {
                console.error('');
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: 'Erro ao deletar registros selecionados',
                    life: 3000,
                });
            });
        this.registers = this.registers.filter(
            (val) => !this.selected.includes(val)
        );
        this.selected = [];
    }

    confirmDelete() {
        this.deleteCompanyDialog = false;
        this.companyService
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
                    detail: 'Erro ao deletar o registro',
                    life: 3000,
                });
            });
        this.registers = this.registers.filter(
            (val) => val.id !== this.register.id
        );

        this.register = {};
    }

    hideDialog() {
        this.companyDialog = false;
        this.submitted = false;
    }

    save() {
        this.submitted = true;

        if (this.register.name?.trim()) {
            if (this.register.id) {
                this.update(this.register);
            } else {
                this.companyService
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
                this.registers.push(this.register);
            }

            this.registers = [...this.registers];
            this.companyDialog = false;
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
