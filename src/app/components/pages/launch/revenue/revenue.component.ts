import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { StatusLaunch } from 'src/app/model/enum/status-launch';
import { Revenue } from 'src/app/model/launch/revenue';
import { CompanyProvider } from 'src/app/model/provider/company';
import { RevenueService } from 'src/app/service/launch/revenue.service';
import { CompanyProviderService } from 'src/app/service/payer/company.service';

@Component({
    templateUrl: './revenue.component.html',
    providers: [MessageService],
})
export class RevenueComponent implements OnInit {
    revenueDialog: boolean = false;
    deleteRevenueDialog: boolean = false;
    payDialog: boolean = false;
    cloneDialog: boolean = false;
    deleteRevenuesDialog: boolean = false;

    revenues: Revenue[] = [];
    revenue: Revenue = {};

    selectedRevenues: Revenue[] = [];

    submitted: boolean = false;

    cols: any[] = [];
    valSwitch: boolean = false;
    statuses: any[] = [];
    companies: CompanyProvider[] = [];

    rowsPerPageOptions = [5, 10, 20];

    monthDate: Date = new Date();
    payDate: Date = new Date();
    dueDate: Date = this.getNextMonth();

    editing: boolean = false;

    constructor(
        private revenueService: RevenueService,
        private messageService: MessageService,
        private companyProviderService: CompanyProviderService
    ) {}

    private getNextMonth(): Date {
        return new Date(new Date().setMonth(new Date().getMonth() + 1));
    }

    ngOnInit() {
        this.companyProviderService
            .getAll()
            .then((data) => (this.companies = data));

        this.revenueService
            .getAll(this.monthDate)
            .then((data) => (this.revenues = data));

        this.cols = [
            { field: 'name', header: 'Nome' },
            { field: 'company.name', header: 'Origem' },
            { field: 'dueDate', header: 'Data Vencimento' },
            { field: 'paymentDate', header: 'Data Pagamento' },
            { field: 'value', header: 'Valor' },
            { field: 'status', header: 'Status' },
        ];
    }

    openNew() {
        this.revenue = {};
        this.submitted = false;
        this.revenueDialog = true;
    }

    deleteSelectedRevenues() {
        this.deleteRevenuesDialog = true;
    }

    getStatus(revenue: Revenue) {
        const today = new Date(moment().format('MM/DD/YYYY'));
        const dueDate = new Date(moment(revenue.dueDate).format('MM/DD/YYYY'));
        if (revenue.paymentDate) {
            return StatusLaunch.PAGO;
        } else if (dueDate > today) {
            return StatusLaunch.A_PAGAR;
        } else {
            return StatusLaunch.VENCIDO;
        }
    }

    editRevenue(revenue: Revenue) {
        revenue.dueDate = new Date(
            moment(revenue.dueDate).format('MM/DD/YYYY')
        );
        if (revenue.paymentDate)
            revenue.paymentDate = new Date(
                moment(revenue.paymentDate).format('MM/DD/YYYY')
            );
        this.editing = true;
        this.revenue = { ...revenue };

        this.revenueDialog = true;
    }

    payRevenue(revenue: Revenue) {
        this.payDialog = true;
        this.revenue = { ...revenue };
    }

    deleteRevenue(revenue: Revenue) {
        this.deleteRevenueDialog = true;
        this.revenue = { ...revenue };
    }

    doClone() {
        this.cloneDialog = true;
    }
    clone(revenue: Revenue) {
        this.revenueService
            .clone(revenue.id!, this.dueDate)
            .then(() => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Receita clonada',
                    life: 3000,
                });
            })
            .catch(() => {
                console.error('');
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: 'Erro ao clonar a receita',
                    life: 3000,
                });
            });
        this.dueDate = this.getNextMonth();
        this.cloneDialog = false;
    }

    pay(revenue: Revenue) {
        this.revenue = revenue;
        this.revenue.paymentDate = this.payDate;
        this.update(revenue);
        this.revenues = [...this.revenues];
        console.log(this.revenue);

        this.revenue = {};
        this.payDate = new Date();
        this.payDialog = false;
    }

    private update(revenue: Revenue) {
        this.revenueService
            .update(revenue.id, revenue)
            .then((data) => {
                this.revenues = this.revenues.map((val) => {
                    if (val.id === data.id) {
                        return data;
                    }
                    return val;
                });
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Receita atualizada',
                    life: 3000,
                });
            })
            .catch(() => {
                console.error('');
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: 'Erro ao alterar a receita',
                    life: 3000,
                });
            });
    }

    confirmDeleteSelected() {
        this.deleteRevenuesDialog = false;
        this.revenueService
            .deleteAll(this.selectedRevenues)
            .then(() => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Receitas deletadas',
                    life: 3000,
                });
            })
            .catch(() => {
                console.error('');
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: 'Erro ao deletar as receitas selecionadas',
                    life: 3000,
                });
            });
        this.revenues = this.revenues.filter(
            (val) => !this.selectedRevenues.includes(val)
        );
        this.selectedRevenues = [];
    }

    confirmDelete() {
        this.deleteRevenueDialog = false;
        this.revenueService
            .delete(this.revenue.id!)
            .then(() => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Receita deletada',
                    life: 3000,
                });
            })
            .catch(() => {
                console.error('');
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: 'Erro ao deletar a receita',
                    life: 3000,
                });
            });
        this.revenues = this.revenues.filter(
            (val) => val.id !== this.revenue.id
        );

        this.revenue = {};
    }

    hideDialog() {
        this.revenueDialog = false;
        this.submitted = false;
    }

    saveRevenue() {
        this.submitted = true;

        if (this.revenue.name?.trim()) {
            if (this.revenue.id) {
                this.update(this.revenue);
            } else {
                this.revenueService
                    .create(this.revenue)
                    .then((data) => {
                        this.revenues = this.revenues.map((val) => {
                            if (val.id === data.id) {
                                return data;
                            }
                            return val;
                        });
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Sucesso',
                            detail: 'Receita criada',
                            life: 3000,
                        });
                    })
                    .catch(() => {
                        console.error('');
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Erro',
                            detail: 'Erro ao criar a receita',
                            life: 3000,
                        });
                    });
                this.revenues.push(this.revenue);
            }

            this.revenues = [...this.revenues];
            this.revenueDialog = false;
            this.revenue = {};
        }
        this.editing = false;
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.revenues.length; i++) {
            if (this.revenues[i].id === id) {
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

    isRecurrent() {
        return this.revenue.isRecurrent === true;
    }

    getDueDate(event: any) {
        var day = event.value;
        let date = new Date();
        let lastDayMonth = this.getLastDay(date.getFullYear(), date.getMonth());
        if (day > lastDayMonth) {
            date.setDate(lastDayMonth);
            this.revenue.dueDate = date;
        } else {
            date.setDate(event.value);
            this.revenue.dueDate = date;
        }
    }

    private getLastDay(year: number, month: number) {
        return new Date(year, month + 1, 0).getDate();
    }
}
