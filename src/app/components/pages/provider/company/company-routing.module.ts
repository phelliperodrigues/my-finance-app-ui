import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CompanyProviderComponent } from './company.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: CompanyProviderComponent },
        ]),
    ],
    exports: [RouterModule],
})
export class CompanyProviderRoutingModule {}
