import { Component, OnInit } from '@angular/core';
import colorLib from '@kurkle/color';
import * as moment from 'moment';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Resume } from 'src/app/model/dashboard/resume';
import { ResumeActual } from 'src/app/model/dashboard/resume-actual';
import { MouthLauch } from '../../../model/dashboard/mouth-launch';
import { DashboardService } from '../../../service/dashboard/dashboard-service';

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
    chartDiffByMonth: any;
    chartDiffByMonthFuture: any;

    chartResultByMonth: any;
    chartDiffByMonthOption: any;
    chartResultByMonthOption: any;
    categoryExpenseData: any;
    categoryExpenseOptions: any;
    typeExpenseData: any;
    loading: boolean = false;
    monthDate: Date = new Date();
    resumeActual: ResumeActual = {};
    resume: Resume = {};

    pt: any;
    constructor(
        private service: DashboardService,
        public layoutService: LayoutService
    ) {}

    ngOnInit() {
        this.getResumeActual();
        this.getResumeByMonth(this.monthDate);
        this.initChart();
        this.getMonthLaunchers();
        this.buildColumns();
        this.buildLanguagePT();
    }
    private buildLanguagePT() {
        this.pt = {
            firstDayOfWeek: 0,
            dayNames: [
                'Domingo',
                'Segunda',
                'Terça',
                'Quarta',
                'Quinta',
                'Sexta',
                'Sábado',
            ],
            dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
            dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
            monthNames: [
                'Janeiro',
                'Fevereiro',
                'Março',
                'Abril',
                'Maio',
                'Junho',
                'Julho',
                'Agosto',
                'Setembro',
                'Outubro',
                'Novembro',
                'Dezembro',
            ],
            monthNamesShort: [
                'Jan',
                'Fev',
                'Mar',
                'Abr',
                'Mai',
                'Jun',
                'Jul',
                'Ago',
                'Set',
                'Out',
                'Nov',
                'Dez',
            ],
            today: 'Hoje',
            clear: 'Limpar',
        };
    }

    search() {
        this.resume = {};
        var that = this;
        this.loading = true;
        setTimeout(function () {
            that.getResumeByMonth(that.monthDate);
            that.loading = false;
        }, 1000);
    }
    getResumeActual() {
        this.service.getResumeActual().then((data) => {
            this.resumeActual = data;
        });
    }

    getResumeByMonth(date: Date) {
        this.service.getResume(date).then((data) => {
            this.resume = data;
        });
    }

    private buildColumns() {
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

    private getMonthLaunchers() {
        this.service.getLaunchOfMonth().then((data) => {
            this.loading = true;
            this.monthLaunchs = data;
            this.loading = false;
        });
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue(
            '--text-color-secondary'
        );
        const surfaceBorder =
            documentStyle.getPropertyValue('--surface-border');

        this.buildChartDiffByMonth(documentStyle);
        this.buildChartDiffByMonthFuture(documentStyle);
        this.buildChartMonthResult(documentStyle);
        this.buildOptionsByChartBar(
            textColor,
            textColorSecondary,
            surfaceBorder
        );
        this.buildOptionsByChartResult(
            textColor,
            textColorSecondary,
            surfaceBorder
        );

        this.buildOptionsByCharts(textColor);
        this.buildChartByCategory();
        this.buildChartByType();
    }

    private buildOptionsByChartBar(
        textColor: string,
        textColorSecondary: string,
        surfaceBorder: string
    ) {
        this.chartDiffByMonthOption = {
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
    }

    private buildOptionsByChartResult(
        textColor: string,
        textColorSecondary: string,
        surfaceBorder: string
    ) {
        this.chartResultByMonthOption = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                    },
                    toolTip: {
                        enabled: false,
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
    }

    private buildChartDiffByMonth(documentStyle: CSSStyleDeclaration) {
        this.service.getLaunchLastYear().then((data) => {
            this.chartDiffByMonth = {
                labels: data
                    .filter((launch) => launch.type === 'DESPESA')
                    .map((dado) =>
                        moment(dado.date)
                            .locale('pt-br')
                            .format('MM/YYYY')
                            .toUpperCase()
                    ),
                datasets: [
                    {
                        label: 'Entradas',
                        data: data
                            .filter((launch) => launch.type === 'RECEITA')
                            .map((dado) => dado.value),
                        fill: true,
                        backgroundColor:
                            documentStyle.getPropertyValue('--cyan-200'),
                        borderColor:
                            documentStyle.getPropertyValue('--cyan-200'),
                        tension: 0.9,
                    },
                    {
                        label: 'Saídas',
                        data: data
                            .filter((launch) => launch.type === 'DESPESA')
                            .map((dado) => dado.value),
                        fill: false,
                        backgroundColor:
                            documentStyle.getPropertyValue('--pink-200'),
                        borderColor:
                            documentStyle.getPropertyValue('--pink-300'),
                        tension: 0.4,
                    },
                ],
            };
        });
    }

    private buildChartDiffByMonthFuture(documentStyle: CSSStyleDeclaration) {
        this.service.getLaunchFuture().then((data) => {
            this.chartDiffByMonthFuture = {
                labels: data
                    .filter((launch) => launch.type === 'DESPESA')
                    .map((dado) =>
                        moment(dado.date)
                            .locale('pt-br')
                            .format('MM/YYYY')
                            .toUpperCase()
                    ),
                datasets: [
                    {
                        label: 'Entradas',
                        data: data
                            .filter((launch) => launch.type === 'RECEITA')
                            .map((dado) => dado.value),
                        fill: false,
                        // backgroundColor:
                        //     documentStyle.getPropertyValue('--teal-200'),
                        borderColor:
                            documentStyle.getPropertyValue('--purple-400'),
                        tension: 0.2,
                        pointStyle: 'circle',
                        pointRadius: 7,
                        pointHoverRadius: 15,
                    },
                    {
                        label: 'Saídas',
                        data: data
                            .filter((launch) => launch.type === 'DESPESA')
                            .map((dado) => dado.value),
                        fill: false,
                        // backgroundColor:
                        //     documentStyle.getPropertyValue('--orange-200'),
                        borderColor:
                            documentStyle.getPropertyValue('--pink-400'),
                        tension: 0.2,
                        pointStyle: 'circle',
                        pointRadius: 7,
                        pointHoverRadius: 15,
                    },
                ],
            };
        });
    }
    private buildChartMonthResult(documentStyle: CSSStyleDeclaration) {
        this.service.getResultLastYear().then((data) => {
            this.chartResultByMonth = {
                labels: data.map((dado) =>
                    moment(dado.date)
                        .locale('pt-br')
                        .format('MM/YYYY')
                        .toUpperCase()
                ),
                datasets: [
                    {
                        label: 'Resultado',
                        data: data.map((dado) => dado.value),
                        fill: false,
                        pointStyle: 'circle',
                        pointRadius: 10,
                        pointHoverRadius: 15,
                        backgroundColor: data.map((dado) => {
                            if (dado.value > 0 && dado.value < 500) {
                                return documentStyle.getPropertyValue(
                                    '--green-200'
                                );
                            }
                            if (dado.value >= 500) {
                                return documentStyle.getPropertyValue(
                                    '--green-300'
                                );
                            }
                            if (dado.value < 0 && dado.value > -100) {
                                return documentStyle.getPropertyValue(
                                    '--pink-200'
                                );
                            } else {
                                return documentStyle.getPropertyValue(
                                    '--pink-300'
                                );
                            }
                        }),
                        borderColor: data.map((dado) => {
                            if (dado.value > 0 && dado.value < 500) {
                                return documentStyle.getPropertyValue(
                                    '--cyan-200'
                                );
                            }
                            if (dado.value >= 500) {
                                return documentStyle.getPropertyValue(
                                    '--green-200'
                                );
                            }
                            if (dado.value < 0 && dado.value > -100) {
                                return documentStyle.getPropertyValue(
                                    '--pink-200'
                                );
                            } else {
                                return documentStyle.getPropertyValue(
                                    '--red-200'
                                );
                            }
                        }),
                        tension: 0.4,
                    },
                ],
            };
        });
    }
    colorize(opaque: boolean) {
        return (ctx: any) => {
            const v = ctx.parsed.y;
            const c =
                v < -50
                    ? '#D60000'
                    : v < 0
                    ? '#F46300'
                    : v < 50
                    ? '#0358B6'
                    : '#44DE28';

            return opaque ? c : this.transparentize(c, 1 - Math.abs(v / 150));
        };
    }

    transparentize(value: string, opacity: number) {
        var alpha = opacity === undefined ? 0.5 : 1 - opacity;
        return colorLib(value).alpha(alpha).rgbString();
    }

    private buildChartByCategory() {
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
    }

    private buildOptionsByCharts(textColor: string) {
        this.categoryExpenseOptions = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: textColor,
                    },
                    position: 'left',
                    onHover: this.handleHover,
                    onLeave: this.handleLeave,
                },
            },
        };
    }

    private buildChartByType() {
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

    handleHover(evt: any, item: any, legend: any) {
        legend.chart.data.datasets[0].backgroundColor.forEach(
            (color: any, index: any, colors: any) => {
                colors[index] =
                    index === item.index || color.length === 9
                        ? color
                        : color + '4D';
            }
        );
        legend.chart.update();
    }

    handleLeave(evt: any, item: any, legend: any) {
        legend.chart.data.datasets[0].backgroundColor.forEach(
            (color: any, index: any, colors: any) => {
                colors[index] = color.length === 9 ? color.slice(0, -2) : color;
            }
        );
        legend.chart.update();
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
