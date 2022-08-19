import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategotyProviderComponent } from './category.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: CategotyProviderComponent },
        ]),
    ],
    exports: [RouterModule],
})
export class CategotyProviderRoutingModule {}
