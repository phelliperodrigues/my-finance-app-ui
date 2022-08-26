import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { StatusLaunch } from 'src/app/model/enum/status-launch';
import { Expense } from 'src/app/model/launch/expense';
import { CompanyProvider } from 'src/app/model/provider/company';
import { ExpenseService } from 'src/app/service/launch/expense.service';
import { CompanyProviderService } from 'src/app/service/payer/company.service';

@Component({
    templateUrl: './expense.component.html',
    providers: [MessageService],
})
export class ExpenseComponent implements OnInit {
    expenseDialog: boolean = false;
    deleteExpenseDialog: boolean = false;
    payDialog: boolean = false;
    cloneDialog: boolean = false;
    deleteExpensesDialog: boolean = false;

    expenses: Expense[] = [];
    expense: Expense = {};

    selectedExpenses: Expense[] = [];

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
        private expenseService: ExpenseService,
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

        this.expenseService
            .getAll(this.monthDate)
            .then((data) => (this.expenses = data));

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
        this.expense = {};
        this.submitted = false;
        this.expenseDialog = true;
    }

    deleteSelectedExpenses() {
        this.deleteExpensesDialog = true;
    }

    getStatus(expense: Expense) {
        const today = new Date(moment().format('MM/DD/YYYY'));
        const dueDate = new Date(moment(expense.dueDate).format('MM/DD/YYYY'));
        if (expense.paymentDate) {
            return StatusLaunch.PAGO;
        } else if (dueDate > today) {
            return StatusLaunch.A_PAGAR;
        } else {
            return StatusLaunch.VENCIDO;
        }
    }

    editExpense(expense: Expense) {
        expense.dueDate = new Date(
            moment(expense.dueDate).format('MM/DD/YYYY')
        );
        if (expense.paymentDate)
            expense.paymentDate = new Date(
                moment(expense.paymentDate).format('MM/DD/YYYY')
            );
        this.editing = true;
        this.expense = { ...expense };

        this.expenseDialog = true;
    }

    payExpense(expense: Expense) {
        this.payDialog = true;
        this.expense = { ...expense };
    }

    deleteExpense(expense: Expense) {
        this.deleteExpenseDialog = true;
        this.expense = { ...expense };
    }

    doClone() {
        this.cloneDialog = true;
    }
    clone(expense: Expense) {
        this.expenseService
            .clone(expense.id!, this.dueDate)
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

    pay(expense: Expense) {
        this.expense = expense;
        this.expense.paymentDate = this.payDate;
        this.update(expense);
        this.expenses = [...this.expenses];
        console.log(this.expense);

        this.expense = {};
        this.payDate = new Date();
        this.payDialog = false;
    }

    private update(expense: Expense) {
        this.expenseService
            .update(expense.id!, expense)
            .then((data) => {
                this.expenses = this.expenses.map((val) => {
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
        this.deleteExpensesDialog = false;
        this.expenseService
            .deleteAll(this.selectedExpenses)
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
        this.expenses = this.expenses.filter(
            (val) => !this.selectedExpenses.includes(val)
        );
        this.selectedExpenses = [];
    }

    confirmDelete() {
        this.deleteExpenseDialog = false;
        this.expenseService
            .delete(this.expense.id!)
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
        this.expenses = this.expenses.filter(
            (val) => val.id !== this.expense.id
        );

        this.expense = {};
    }

    hideDialog() {
        this.expenseDialog = false;
        this.submitted = false;
    }

    saveExpense() {
        this.submitted = true;

        if (this.expense.debit?.name?.trim()) {
            if (this.expense.id) {
                this.update(this.expense);
            } else {
                this.expenseService
                    .create(this.expense)
                    .then((data) => {
                        this.expenses = this.expenses.map((val) => {
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
                this.expenses.push(this.expense);
            }

            this.expenses = [...this.expenses];
            this.expenseDialog = false;
            this.expense = {};
        }
        this.editing = false;
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.expenses.length; i++) {
            if (this.expenses[i].id === id) {
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
        return this.expense.isRecurrent === true;
    }

    getDueDate(event: any) {
        var day = event.value;
        let date = new Date();
        let lastDayMonth = this.getLastDay(date.getFullYear(), date.getMonth());
        if (day > lastDayMonth) {
            date.setDate(lastDayMonth);
            this.expense.dueDate = date;
        } else {
            date.setDate(event.value);
            this.expense.dueDate = date;
        }
    }

    private getLastDay(year: number, month: number) {
        return new Date(year, month + 1, 0).getDate();
    }
}
