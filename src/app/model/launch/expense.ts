import { CompanyProvider } from '../provider/company';
import { Debit } from '../provider/debit';

export interface Expense {
    id?: string;
    description?: string;
    status?: string;
    provider?: CompanyProvider;
    dueDate?: Date;
    debit?: Debit;
    currentInstallment?: number;
    totalInstallments?: number;
    value?: number;
    barCode?: string;
}
