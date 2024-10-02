import { CommonModule } from '@angular/common';
import {
  AfterContentChecked,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { BreadcrumbComponent } from '../breadcrumbs/breadcrumb.component';
import { NotificationService } from '../../../../shared/services/notification.service';
import { HeaderComponent } from '../header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ProjectService } from '../../../../shared/services/project.service';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';
import { LoadingService } from '../../../../shared/services/loading.service';
import { TranslateService } from '@ngx-translate/core';
import { last } from 'rxjs';
@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    MatSidenavModule,
    SidebarComponent,
    MatSidenav,
    BreadcrumbComponent,
    HeaderComponent,
    MatToolbarModule,
    LoadingComponent,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class MainLayoutComponent implements OnDestroy, AfterContentChecked {
  loading = signal<boolean>(false);
  title: string = '';
  #data = inject(NotificationService).behavior$.subscribe((item) => {
    this.title = item;
  });
  constructor(
    private projectService: ProjectService,
    private loadingService: LoadingService,
    public translate:TranslateService
  ) {
    this.projectService.getProject();
  }

  ngOnDestroy(): void {
    this.#data.unsubscribe();
  }
  ngAfterContentChecked(): void {
    this.loadingService.showLoading.subscribe((data:boolean) => {
      this.loading.set(data);
    });
  }
  swithLanguage(){
    this.translate.use(this.translate.currentLang === 'vi' ? 'en' : 'vi');
    localStorage.setItem('lang', this.translate.currentLang);
  }
}
