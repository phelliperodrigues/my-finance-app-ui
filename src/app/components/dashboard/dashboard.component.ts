import { Component, OnInit } from '@angular/core';
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
export class DashboardComponent implements OnInit {
    cols!: any[];
    monthLaunchs!: MouthLauch[];

    chartData: any;

    chartOptions: any;
    categoryExpenseData: any;
    typeExpenseData: any;

    loading: boolean = false;

    monthDate: Date = new Date();

    constructor(
        private service: LaunchService,
        public layoutService: LayoutService
    ) {}

    ngOnInit() {
        this.initChart();
        this.loading = true;
        this.service.getLaunchOfMonth().then((data) => {
            this.monthLaunchs = data;
        });
        this.loading = false;

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
        this.service.getSpendingByCategory().then((data) => {
            let bgColor = this.selectChartColor(data.length);
            let hoverBgColor = this.hoverColor(bgColor);
            this.categoryExpenseData = {
                labels: data.map((item) => item.name),
                datasets: [
                    {
                        data: data.map((item) => item.value),
                        backgroundColor: bgColor,
                        hoverBackgroundColor: hoverBgColor,
                    },
                ],
            };
        });

        this.service.getSpedingByType().then((data) => {
            let bgColor = this.selectChartColor(data.length);
            let hoverBgColor = this.hoverColor(bgColor);
            this.typeExpenseData = {
                labels: data.map((item) => item.name),
                datasets: [
                    {
                        data: data.map((item) => item.value),
                        backgroundColor: bgColor,
                        hoverBackgroundColor: hoverBgColor,
                    },
                ],
            };
        });
    }
    hoverColor(bgColor: string[]): string[] {
        let hoverBgColor: string[] = [];
        bgColor.forEach((color) => {
            hoverBgColor.push(color + '88');
        });
        return hoverBgColor;
    }
    selectChartColor(length: number): string[] {
        let customColours: string[] = [];
        if (length > 0) {
            for (let index = 0; index < length; index++) {
                let randomColor = this.getRandomColor();
                if (randomColor.length < 6) {
                    randomColor = this.getRandomColor();
                }
                customColours.push('#' + randomColor);
            }
        }
        console.log(customColours);

        return customColours;
    }
    getRandomColor(): string {
        return Math.floor(Math.random() * 16777215).toString(16);
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
