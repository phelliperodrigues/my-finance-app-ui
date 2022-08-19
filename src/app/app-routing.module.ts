import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotfoundComponent } from './components/notfound/notfound.component';
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
                                    './components/dashboard/dashboard.module'
                                ).then((m) => m.DashboardModule),
                        },
                        {
                            path: 'revenues',
                            loadChildren: () =>
                                import(
                                    './components/launch/revenue/revenue.module'
                                ).then((m) => m.RevenueModule),
                        },
                        {
                            path: 'expenses',
                            loadChildren: () =>
                                import(
                                    './components/launch/expense/expense.module'
                                ).then((m) => m.ExpenseModule),
                        },
                        {
                            path: 'register/provider/company',
                            loadChildren: () =>
                                import(
                                    './components/provider/company/company.module'
                                ).then((m) => m.CompanyProviderModule),
                        },
                        {
                            path: 'register/provider/debit',
                            loadChildren: () =>
                                import(
                                    './components/provider/debit/debit.module'
                                ).then((m) => m.DebitModule),
                        },
                        {
                            path: 'register/provider/category',
                            loadChildren: () =>
                                import(
                                    './components/provider/category/category.module'
                                ).then((m) => m.CategoryProviderModule),
                        },
                        {
                            path: 'register/payer/category',
                            loadChildren: () =>
                                import(
                                    './components/payer/category/category.module'
                                ).then((m) => m.CategoryPayerModule),
                        },
                        {
                            path: 'uikit',
                            loadChildren: () =>
                                import(
                                    './demo/components/uikit/uikit.module'
                                ).then((m) => m.UikitModule),
                        },
                        {
                            path: 'utilities',
                            loadChildren: () =>
                                import(
                                    './demo/components/utilities/utilities.module'
                                ).then((m) => m.UtilitiesModule),
                        },
                        {
                            path: 'documentation',
                            loadChildren: () =>
                                import(
                                    './demo/components/documentation/documentation.module'
                                ).then((m) => m.DocumentationModule),
                        },
                        {
                            path: 'blocks',
                            loadChildren: () =>
                                import(
                                    './demo/components/primeblocks/primeblocks.module'
                                ).then((m) => m.PrimeBlocksModule),
                        },
                        {
                            path: 'pages',
                            loadChildren: () =>
                                import(
                                    './demo/components/pages/pages.module'
                                ).then((m) => m.PagesModule),
                        },
                    ],
                },
                {
                    path: 'auth',
                    loadChildren: () =>
                        import('./components/auth/auth.module').then(
                            (m) => m.AuthModule
                        ),
                },
                {
                    path: '',
                    loadChildren: () =>
                        import('./components/landing/landing.module').then(
                            (m) => m.LandingModule
                        ),
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
