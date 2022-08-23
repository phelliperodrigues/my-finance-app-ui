import { CompanyPayment } from '../payer/company';

export interface Revenue {
    id?: string;
    name?: string;
    description?: string;
    company?: CompanyPayment;
    isRecurrent?: boolean;
    dayOfDue?: number;
    times?: number;
    dueDate?: Date;
    paymentDate?: Date;
    value?: number;
    status?: string;
}
