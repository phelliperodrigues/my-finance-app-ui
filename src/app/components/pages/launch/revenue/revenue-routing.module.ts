import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RevenueComponent } from './revenue.component';

@NgModule({
    imports: [
        RouterModule.forChild([{ path: '', component: RevenueComponent }]),
    ],
    exports: [RouterModule],
})
export class RevenueRoutingModule {}
