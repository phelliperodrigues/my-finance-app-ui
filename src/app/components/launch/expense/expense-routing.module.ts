import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ExpenseComponent } from './expense.component';

@NgModule({
    imports: [
        RouterModule.forChild([{ path: '', component: ExpenseComponent }]),
    ],
    exports: [RouterModule],
})
export class ExpenseRoutingModule {}
