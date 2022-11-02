import { CompanyProvider } from '../../provider/company';
import { Debit } from '../../provider/debit';

export interface ExpenseSearch {
    id?: string;
    company?: CompanyProvider;
    dueDate?: Date;
    paymentDate?: Date;
    debit?: Debit;
    installment?: number;
    value?: number;
}
