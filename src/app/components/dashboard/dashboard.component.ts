import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { MouthLauch } from '../../api/mouth-launch';
import { LaunchService } from '../../service/launch-service';

@Component({
    templateUrl: './dashboard.component.html',
    styles: [
        `
            :host ::ng-deep .p-frozen-column {
                font-weight: bold;
            }

            :host ::ng-deep .p-datatable-frozen-tbody {
                font-weight: bold;
            }
        `,
    ],
})
export class DashboardComponent implements OnInit, OnDestroy {
    items!: MenuItem[];
    cols!: any[];
    monthLaunchs!: MouthLauch[];

    chartData: any;

    chartOptions: any;

    subscription!: Subscription;

    pieData: any;
    pieOptions: any;

    doughnutData: any;
    doughnutOptions: any;
    loading: boolean = false;

    monthDate: Date = new Date();

    constructor(
        private launchService: LaunchService,
        public layoutService: LayoutService
    ) {
        this.subscription = this.layoutService.configUpdate$.subscribe(() => {
            this.initChart();
        });
    }

    ngOnInit() {
        this.initChart();
        this.loading = true;
        this.launchService.getLaunchOfMounth().then((data) => {
            this.monthLaunchs = data;
        });
        this.loading = false;

        this.items = [
            { label: 'Add New', icon: 'pi pi-fw pi-plus' },
            { label: 'Remove', icon: 'pi pi-fw pi-minus' },
        ];

        this.cols = [
            { field: 'name', header: 'Descrição' },
            {
                field: 'month1',
                header: this.getMonthText(-3),
                money: true,
            },
            {
                field: 'month2',
                header: this.getMonthText(-2),
                money: true,
            },
            {
                field: 'month3',
                header: this.getMonthText(-1),
                money: true,
            },
            {
                field: 'monthActual',
                header: this.getMonthText(0),
                money: true,
            },
            {
                field: 'month4',
                header: this.getMonthText(1),
                money: true,
            },
            {
                field: 'month5',
                header: this.getMonthText(2),
                money: true,
            },
            {
                field: 'month5',
                header: this.getMonthText(3),
                money: true,
            },
        ];
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue(
            '--text-color-secondary'
        );
        const surfaceBorder =
            documentStyle.getPropertyValue('--surface-border');

        this.chartData = {
            labels: [
                'Janeiro',
                'Feveiro',
                'Março',
                'Abril',
                'Maio',
                'Junho',
                'Julho',
            ],
            datasets: [
                {
                    label: 'Entradas',
                    data: [
                        22000.0, 22500.0, 21800.0, 25000.0, 32000.0, 22100.0,
                        22950.0,
                    ],
                    fill: false,
                    backgroundColor:
                        documentStyle.getPropertyValue('--green-700'),
                    borderColor: documentStyle.getPropertyValue('--green-700'),
                    tension: 0.4,
                },
                {
                    label: 'Saídas',
                    data: [
                        12000.0, 18500.0, 21000.0, 15000.0, 22000.0, 19100.0,
                        18950.0,
                    ],
                    fill: false,
                    backgroundColor:
                        documentStyle.getPropertyValue('--red-300'),
                    borderColor: documentStyle.getPropertyValue('--red-300'),
                    tension: 0.4,
                },
            ],
        };

        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false,
                    },
                },
                y: {
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false,
                    },
                },
            },
        };

        this.pieData = {
            labels: ['CASA', 'FINANCEIRO', 'CARTÃO', 'ALIMENTAÇÃO'],
            datasets: [
                {
                    data: [1000.0, 2500.0, 1702.0, 500.0],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--yellow-500'),
                        documentStyle.getPropertyValue('--blue-500'),
                        documentStyle.getPropertyValue('--pink-500'),
                        documentStyle.getPropertyValue('--green-500'),
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--yellow-400'),
                        documentStyle.getPropertyValue('--blue-400'),
                        documentStyle.getPropertyValue('--red-400'),
                        documentStyle.getPropertyValue('--green-400'),
                    ],
                },
            ],
        };

        this.pieOptions = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: textColor,
                    },
                },
            },
        };

        this.doughnutData = {
            labels: ['FIXO', 'VARIAVEL'],
            datasets: [
                {
                    data: [10000.0, 4000.0],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--yellow-500'),
                        documentStyle.getPropertyValue('--red-500'),
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--yellow-400'),
                        documentStyle.getPropertyValue('--red-400'),
                    ],
                },
            ],
        };

        this.doughnutOptions = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: textColor,
                    },
                },
            },
        };
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    getMonthText(number: any) {
        var date = new Date();
        date.setMonth(date.getMonth() + number);
        switch (date.getMonth()) {
            case 0:
                return 'Jan/' + date.getUTCFullYear();
            case 1:
                return 'Fev/' + date.getUTCFullYear();
            case 2:
                return 'Mar/' + date.getUTCFullYear();
            case 3:
                return 'Abr/' + date.getUTCFullYear();
            case 4:
                return 'Mai/' + date.getUTCFullYear();
            case 5:
                return 'Jun/' + date.getUTCFullYear();
            case 6:
                return 'Jul/' + date.getUTCFullYear();
            case 7:
                return 'Ago/' + date.getUTCFullYear();
            case 8:
                return 'Set/' + date.getUTCFullYear();
            case 9:
                return 'Out/' + date.getUTCFullYear();
            case 10:
                return 'Nov/' + date.getUTCFullYear();
            case 11:
                return 'Dez/' + date.getUTCFullYear();
            default:
                return 'Mês Invalido';
        }
    }
}
