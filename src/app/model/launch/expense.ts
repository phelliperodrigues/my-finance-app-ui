import { CompanyProvider } from '../provider/company';
import { Debit } from '../provider/debit';

export interface Expense {
    id?: string;
    description?: string;
    company?: CompanyProvider;
    dueDate?: Date;
    paymentDate?: Date;
    debit?: Debit;
    currentInstallment?: number;
    totalInstallments?: number;
    value?: number;
    barCode?: string;
    isRecurrent?: boolean;
    times?: number;
    dayOfDue?: number;
    replyNextMonths?: boolean;
}
