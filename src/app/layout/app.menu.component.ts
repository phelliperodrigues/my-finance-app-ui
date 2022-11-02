import { Component, OnInit } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
    model: any[] = [];

    constructor(public layoutService: LayoutService) {}

    ngOnInit() {
        this.model = [
            {
                label: 'Início',
                items: [
                    {
                        label: 'Dashboard',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/admin'],
                    },
                ],
            },
            {
                label: 'Lançamentos',
                items: [
                    {
                        label: 'Entradas',
                        icon: 'pi pi-fw pi-plus-circle',
                        routerLink: ['/admin/revenues'],
                    },
                    {
                        label: 'Saídas',
                        icon: 'pi pi-fw pi-minus-circle',
                        routerLink: ['/admin/expenses'],
                    },
                ],
            },
            {
                label: 'Cadastros',
                items: [
                    {
                        label: 'Fornecedor',
                        icon: 'pi pi-fw pi-box',
                        items: [
                            {
                                label: 'Empresas',
                                icon: 'pi pi-fw pi-sitemap',
                                routerLink: [
                                    '/admin/register/provider/company',
                                ],
                            },
                            {
                                label: 'Dividas',
                                icon: 'pi pi-fw pi-shopping-cart',
                                routerLink: ['/admin/register/provider/debit'],
                            },
                            {
                                label: 'Categorias de Despesas',
                                icon: 'pi pi-fw pi-tag',
                                routerLink: [
                                    '/admin/register/provider/category',
                                ],
                            },
                        ],
                    },
                    {
                        label: 'Pagador',
                        icon: 'pi pi-fw pi-money-bill',
                        items: [
                            {
                                label: 'Origem',
                                icon: 'pi pi-fw pi-id-card',
                                routerLink: ['/admin/register/payer/company'],
                            },
                        ],
                    },
                    // {
                    //     label: 'Usuários',
                    //     icon: 'pi pi-fw pi-users',
                    //     items: [
                    //         {
                    //             label: 'Meu Cadastro',
                    //             icon: 'pi pi-fw pi-user-plus',
                    //             routerLink: ['/admin/users'],
                    //         },
                    //         {
                    //             label: 'Convidar',
                    //             icon: 'pi pi-fw pi-envelope',
                    //             routerLink: ['/admin/users/invite'],
                    //         },
                    //     ],
                    // },
                ],
            },
        ];
    }
}
