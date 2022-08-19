import { CompanyPayment } from '../payer/company';

export interface Revenue {
    id?: string;
    name?: string;
    description?: string;
    company?: CompanyPayment;
    isRecurrent?: boolean;
    recurrentDays?: number;
    dueDate?: Date;
    paymentDate?: Date;
    value?: number;
    status?: string;
}
