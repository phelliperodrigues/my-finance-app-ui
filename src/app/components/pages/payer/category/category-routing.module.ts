import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategotyPayerComponent } from './category.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: CategotyPayerComponent },
        ]),
    ],
    exports: [RouterModule],
})
export class CategotyPayerRoutingModule {}
