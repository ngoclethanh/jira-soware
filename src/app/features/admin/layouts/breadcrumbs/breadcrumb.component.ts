import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  ActivatedRoute,
  ActivationEnd,
  NavigationEnd,
  Router,
} from '@angular/router';
import { distinctUntilChanged, filter, map } from 'rxjs';
import { buildBreadCrumb } from '../../../../shared/common/common-function';
import { BreadCrumb } from '../../../../shared/models/model';
import { NotificationService } from '../../../../shared/services/notification.service';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.None,
})
export class BreadcrumbComponent implements OnInit {
  items: BreadCrumb[] = [];
  constructor(
    private router: Router,
    private routes: ActivatedRoute,
    private service: NotificationService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof ActivationEnd) {
        this.items = buildBreadCrumb(this.router.routerState.root);
        this.service.send(this.items);
      }
    });
  }

  ngOnInit(): void {
    this.items = buildBreadCrumb(this.routes.root);
  }
}
