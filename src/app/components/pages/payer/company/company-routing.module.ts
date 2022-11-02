import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CompanyPayerComponent } from './company.component';

@NgModule({
    imports: [
        RouterModule.forChild([{ path: '', component: CompanyPayerComponent }]),
    ],
    exports: [RouterModule],
})
export class CompanyProviderRoutingModule {}
