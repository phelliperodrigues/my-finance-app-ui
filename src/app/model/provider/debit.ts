import { CategoryProvider } from './category';
import { CompanyProvider } from './company';

export interface Debit {
    id?: string;
    name?: string;
    description?: string;
    type?: string;
    company?: CompanyProvider;
    owner?: string;
    category?: CategoryProvider;
}
