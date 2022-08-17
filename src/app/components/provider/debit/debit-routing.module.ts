import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DebitComponent } from './debit.component';

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: DebitComponent }])],
    exports: [RouterModule],
})
export class DebitRoutingModule {}
