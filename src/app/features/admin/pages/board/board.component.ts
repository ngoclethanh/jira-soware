import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ProjectService } from '../../../../shared/services/project.service';
import { NotificationService } from '../../../../shared/services/notification.service';
import { MatButtonModule } from '@angular/material/button';
import { JIssue, JUser } from '../../../../shared/models/model';
import { CommonModule } from '@angular/common';
import { IssueCardComponent } from '../issues/issue-card/issue-card.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { IssueDetailComponent } from '../dialog/issue-detail/issue-detail.component';
import { IssueStatus } from '../../../../shared/common/enums';
import { IssueStatusDisplay } from '../../../../shared/common/const';
import { LoadingService } from '../../../../shared/services/loading.service';
@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    IssueCardComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class BoardComponent implements OnInit {
  issueStatuses: IssueStatus[] = [
    IssueStatus.BACKLOG,
    IssueStatus.SELECTED,
    IssueStatus.IN_PROGRESS,
    IssueStatus.DONE,
  ];
  searchControl: FormControl = new FormControl('');
  issues: JIssue[] = [];
  // get issuesCount(): number {
  //   return this.issues?.length;
  // }

  IssueStatusDisplay = IssueStatusDisplay;
  constructor(
    private projectService: ProjectService,
    private service: NotificationService,
    private loading: LoadingService
  ) {}
  cloneArr: JIssue[] = [];

  avtList: any = [];
  ngOnInit(): void {
    this.clearAll();
    //this.loading.start();
    this.searchControl.valueChanges
      .pipe(debounceTime(100), distinctUntilChanged())
      .subscribe((term: string) => {
        this.issues = this.cloneArr?.filter((item: any) =>
          item.title.toLocaleLowerCase()?.includes(term.toLocaleLowerCase())
        );

        //this.filterService.updateSearchTerm(term);
      });
    // setTimeout(() => {
    //   this.loading.complete();
    // }, 3000);
    // this.filterQuery.userIds$.pipe(untilDestroyed(this)).subscribe((userIds) => {
    //   this.userIds = userIds;
    // });
  }
  arr: any[] = [];
  userChanged(user: JUser) {
    const hasUser = this.cloneArr.filter((x) => x.userIds.includes(user.id));
    this.arr.push(...hasUser);
    this.issues = [...new Set(this.arr)];
    // this.filterService.toggleUserId(user.id);
  }
  getFilterIssues(status: string, issueList: any[]) {
    return issueList?.filter((item) => item.status == status);
  }
  clearAll() {
    this.searchControl.setValue('');
    this.service.user$.asObservable().subscribe((data: any) => {
      this.avtList = data.users;
      this.issues = data.issues;
      this.cloneArr = data.issues
        ? JSON.parse(JSON.stringify(data.issues))
        : data.issues;
    });
  }
  myIssues() {
    const local = JSON.parse(localStorage.getItem('user')!);
    this.issues = this.issues.filter((item) => item.userIds.includes(local.id));
  }
  ignoreResolve() {
    this.issues = this.issues.filter(
      (item) => item.status !== IssueStatus.DONE
    );
  }
}
