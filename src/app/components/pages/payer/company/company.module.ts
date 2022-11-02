import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { CompanyProviderRoutingModule } from './company-routing.module';
import { CompanyPayerComponent } from './company.component';

@NgModule({
    imports: [
        CommonModule,
        CompanyProviderRoutingModule,
        TableModule,
        FormsModule,
        ButtonModule,
        ToastModule,
        ToolbarModule,
        InputTextModule,
        DialogModule,
    ],
    declarations: [CompanyPayerComponent],
})
export class CompanyProviderModule {}
