import { CategoryProvider } from './category';
import { CompanyProvider } from './company';
import { TypeDebit } from './type-debit';

export interface Debit {
    id?: string;
    name?: string;
    description?: string;
    type?: TypeDebit;
    company?: CompanyProvider;
    owner?: string;
    category?: CategoryProvider;
}
