import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent {
    menuMode = 'static';

    constructor(
        public translateService: TranslateService,
        private config: PrimeNGConfig
    ) {
        translateService.setDefaultLang('pt');
        translateService.use('pt');
    }

    ngOnInit() {
        document.documentElement.style.fontSize = '14px';
    }

    translate(lang: string) {
        this.translateService.use(lang);
        this.translateService
            .get('primeng')
            .subscribe((res) => this.config.setTranslation(res));
    }
}
