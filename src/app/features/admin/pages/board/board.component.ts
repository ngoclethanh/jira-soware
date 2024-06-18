import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ProjectService } from '../../../../shared/services/project.service';
import { NotificationService } from '../../../../shared/services/notification.service';
import { MatButtonModule } from '@angular/material/button';
import { IssueStatus, IssueStatusDisplay, JIssue } from '../../../../shared/models/model';
import { CommonModule } from '@angular/common';
import { IssueCardComponent } from '../issues/issue-card/issue-card.component';
@Component({
  selector: 'app-board',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule,MatButtonModule,CommonModule,IssueCardComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class BoardComponent implements OnInit {
  issueStatuses: IssueStatus[] = [
    IssueStatus.BACKLOG,
    IssueStatus.SELECTED,
    IssueStatus.IN_PROGRESS,
    IssueStatus.DONE
  ];
  issues: JIssue[] = [];
  // get issuesCount(): number {
  //   return this.issues?.length;
  // }

  IssueStatusDisplay = IssueStatusDisplay;
  constructor(private projectService:ProjectService,private service:NotificationService){

  }
  avtList:any= [];
  ngOnInit(): void {
    this.service.user$.asObservable().subscribe((data:any)=>{
this.avtList = data.users;
this.issues = data.issues;

    })
  }
  getFilterIssues(status:string,issueList:any[]){
 return issueList?.filter((item)=> item.status == status)
  }
}
