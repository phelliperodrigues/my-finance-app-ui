import { User } from '../user/user';
import { CompanyProvider } from './company';
import { TypeDebit } from './type-debit';

export interface Debit {
    id?: string;
    name?: string;
    description?: string;
    type?: TypeDebit;
    company?: CompanyProvider;
    user?: User;
}
