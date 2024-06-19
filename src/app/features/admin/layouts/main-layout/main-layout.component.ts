import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { BreadcrumbComponent } from '../breadcrumbs/breadcrumb.component';
import { NotificationService } from '../../../../shared/services/notification.service';
import { HeaderComponent } from '../header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ProjectService } from '../../../../shared/services/project.service';
@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterModule,CommonModule,MatSidenavModule,SidebarComponent,MatSidenav,BreadcrumbComponent,HeaderComponent,MatToolbarModule],
  templateUrl:"./main-layout.component.html",
  styleUrl:"./main-layout.component.scss",
  changeDetection: ChangeDetectionStrategy.Default
})
export class MainLayoutComponent implements OnDestroy{
  title:string='';
  #data= inject(NotificationService).behavior$.subscribe((item)=>{
    this.title=item;
  })
constructor(private projectService:ProjectService){
this.projectService.getProject();
}
ngOnDestroy(): void {
  this.#data.unsubscribe()
}
 

}
