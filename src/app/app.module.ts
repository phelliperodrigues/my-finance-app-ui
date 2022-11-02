import {
    HashLocationStrategy,
    LocationStrategy,
    registerLocaleData,
} from '@angular/common';
import { HttpClient } from '@angular/common/http';
import localePT from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CalendarModule } from 'primeng/calendar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotfoundComponent } from './components/pages/notfound/notfound.component';
import { AppLayoutModule } from './layout/app.layout.module';
import { DashboardService } from './service/dashboard/dashboard-service';
import { ExpenseService } from './service/launch/expense.service';
import { RevenueService } from './service/launch/revenue.service';
import { CompanyPaymentService } from './service/payer/company.payer.service';
import { ProductService } from './service/product.service';
import { CategoryProviderService } from './service/provider/category.service';
import { CompanyProviderService } from './service/provider/company.service';
import { DebitService } from './service/provider/debit.service';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}
registerLocaleData(localePT);

@NgModule({
    declarations: [AppComponent, NotfoundComponent],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient],
            },
        }),
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        ProductService,
        CalendarModule,
        DashboardService,
        RevenueService,
        CompanyProviderService,
        ExpenseService,
        CompanyPaymentService,
        DebitService,
        CategoryProviderService,
        { provide: LOCALE_ID, useValue: 'pt-br' },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
