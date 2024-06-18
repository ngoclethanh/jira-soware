import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SvgImageComponent } from '../../../../shared/components/svg-image/svg-image.component';
import { NotificationService } from '../../../../shared/services/notification.service';
const Menu=[
  {
    id: 'kanbandboard',
    title: 'Kanband Board',
    icon: '',
    link: '/app/board',
    svgIconPath: 'accounts',
  },
  {
    id: 'project-setting',
    title: 'Project Setting',
    icon: '',
    link: '/app/project-setting',
    svgIconPath: 'dashboard',
  },
  {
    id: 'releases',
    title: 'Releases',
    icon: '',
    link: '/app/dashboard',
    svgIconPath: 'releases',
  },
  {
    id: 'issue',
    title: 'Issues and Filters',
    icon: '',
    link: '/app/dashboard',
    svgIconPath: 'issue',
  },
  {
    id: 'dashboard',
    title: 'Pages',
    icon: '',
    link: '/app/dashboard',
    svgIconPath: 'dashboard',
  },
  {
    id: 'report',
    title: 'Reports',
    icon: '',
    link: '/app/dashboard',
    svgIconPath: 'report',
  },
  {
    id: 'dashboard',
    title: 'Components',
    icon: '',
    link: '/app/dashboard',
    svgIconPath: 'dashboard',
  },
]
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatListModule,RouterModule,MatRippleModule,SvgImageComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.Default
})
export class SidebarComponent implements OnInit{
  menus=Menu;
  cdf=inject(ChangeDetectorRef)
  router=inject(Router)
  routes=inject(ActivatedRoute)
  service=inject(NotificationService)
  ngOnInit(): void {
    this.cdf.markForCheck()
  }
 
}
