import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotfoundComponent } from './components/pages/notfound/notfound.component';
import { AppLayoutComponent } from './layout/app.layout.component';

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: 'admin',
                    component: AppLayoutComponent,
                    children: [
                        {
                            path: '',
                            loadChildren: () =>
                                import(
                                    './components/pages/dashboard/dashboard.module'
                                ).then((m) => m.DashboardModule),
                        },
                        {
                            path: 'revenues',
                            loadChildren: () =>
                                import(
                                    './components/pages/launch/revenue/revenue.module'
                                ).then((m) => m.RevenueModule),
                        },
                        {
                            path: 'expenses',
                            loadChildren: () =>
                                import(
                                    './components/pages/launch/expense/expense.module'
                                ).then((m) => m.ExpenseModule),
                        },
                        {
                            path: 'register/provider/company',
                            loadChildren: () =>
                                import(
                                    './components/pages/provider/company/company.module'
                                ).then((m) => m.CompanyProviderModule),
                        },
                        {
                            path: 'register/provider/debit',
                            loadChildren: () =>
                                import(
                                    './components/pages/provider/debit/debit.module'
                                ).then((m) => m.DebitModule),
                        },
                        {
                            path: 'register/provider/category',
                            loadChildren: () =>
                                import(
                                    './components/pages/provider/category/category.module'
                                ).then((m) => m.CategoryProviderModule),
                        },
                        {
                            path: 'register/payer/company',
                            loadChildren: () =>
                                import(
                                    './components/pages/payer/company/company.module'
                                ).then((m) => m.CompanyProviderModule),
                        },
                    ],
                },
                {
                    path: 'auth',
                    loadChildren: () =>
                        import('./components/pages/auth/auth.module').then(
                            (m) => m.AuthModule
                        ),
                },
                {
                    path: '',
                    loadChildren: () =>
                        import(
                            './components/pages/landing/landing.module'
                        ).then((m) => m.LandingModule),
                },
                { path: 'pages/notfound', component: NotfoundComponent },
                { path: '**', redirectTo: 'pages/notfound' },
            ],
            { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' }
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
