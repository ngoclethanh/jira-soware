import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { JIssue, JUser } from '../../../../../shared/models/model';
import { NotificationService } from '../../../../../shared/services/notification.service';
import { CommonModule } from '@angular/common';
import { SvgImageComponent } from '../../../../../shared/components/svg-image/svg-image.component';
import { IssueUtil } from '../../../../../shared/utils/issues';

@Component({
  selector: 'app-issue-card',
  standalone: true,
  imports: [CommonModule,SvgImageComponent],
  templateUrl: './issue-card.component.html',
  styleUrl: './issue-card.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class IssueCardComponent implements OnInit,OnChanges {
  constructor(private service: NotificationService) {}
  @Input() issue: JIssue | undefined;
  assignees: JUser[] | undefined;
  issueTypeIcon: string = '';
  //priorityIcon: IssuePriorityIcon;
  ngOnInit(): void {
    this.service.user$.asObservable().subscribe((user) => {
      this.assignees = this.issue?.userIds.map((userId) =>
        user.users?.find((x: any) => x.id === userId)
      );
      console.log(this.assignees);
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.issueTypeIcon = IssueUtil.getIssueTypeIcon(this.issue?.type!);
    console.log(this.issueTypeIcon);
    
  }
}
