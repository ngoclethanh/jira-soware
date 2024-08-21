import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  inject,
} from '@angular/core';
import { JIssue, JUser } from '../../../../../shared/models/model';
import { NotificationService } from '../../../../../shared/services/notification.service';
import { CommonModule } from '@angular/common';
import { SvgImageComponent } from '../../../../../shared/components/svg-image/svg-image.component';
import { IssueUtil } from '../../../../../shared/utils/issues';
import { IssueDetailComponent } from '../../dialog/issue-detail/issue-detail.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-issue-card',
  standalone: true,
  imports: [CommonModule,SvgImageComponent],
  templateUrl: './issue-card.component.html',
  styleUrl: './issue-card.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class IssueCardComponent implements OnInit,OnChanges {
  readonly dialog = inject(MatDialog);

  constructor(private service: NotificationService) {}
  @Input() issue: JIssue | undefined;
  assignees: JUser[] | undefined;
  issueTypeIcon: string = '';
  priorityIcon: string ='';
  ngOnInit(): void {
    this.service.user$.asObservable().subscribe((user) => {
      this.assignees = this.issue?.userIds.map((userId) =>
        user.users?.find((x: any) => x.id === userId)
      );
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.issueTypeIcon = IssueUtil.getIssueTypeIcon(this.issue?.type!);
    this.priorityIcon = IssueUtil.getIssuePriorityIcon(this.issue?.priority!)
  }
  openDialog(data:any): void {
    const dialogRef = this.dialog.open(IssueDetailComponent, {
      data: data,
      width:"1000px",
      height:"auto"
    });

    dialogRef.afterClosed().subscribe(result => {
      this.issueTypeIcon = IssueUtil.getIssueTypeIcon(this.issue?.type!)
      this.priorityIcon = IssueUtil.getIssuePriorityIcon(this.issue?.priority!)
    });
  }
}
