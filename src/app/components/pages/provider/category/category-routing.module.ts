import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoryProviderComponent } from './category.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: CategoryProviderComponent },
        ]),
    ],
    exports: [RouterModule],
})
export class CategotyProviderRoutingModule {}
