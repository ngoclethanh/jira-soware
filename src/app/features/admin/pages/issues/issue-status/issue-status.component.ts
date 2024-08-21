import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DropdownComponent } from '../../../../../shared/components/dropdown/dropdown.component';
import { IssueStatus } from '../../../../../shared/common/enums';
import { IssueStatusDisplay } from '../../../../../shared/common/const';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-issue-status',
  standalone: true,
  imports: [ReactiveFormsModule, DropdownComponent],
  templateUrl: './issue-status.component.html',
  styleUrl: './issue-status.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IssueStatusComponent implements OnInit {
  @Input() data = inject<any>(MAT_DIALOG_DATA);
  @Input() formData!: FormGroup;
  issueStatuses: IssueStatusValueTitle[] = [];
  get statusItem() {
    return this.formData.get('status') as FormControl;
  }
  onSelectedStatusChange(event: Event) {
    this.statusItem?.setValue(event.toString());
    this.data.status = this.statusItem?.getRawValue();
  }
  ngOnInit(): void {
    this.issueStatuses = [
      new IssueStatusValueTitle(IssueStatus.BACKLOG),
      new IssueStatusValueTitle(IssueStatus.SELECTED),
      new IssueStatusValueTitle(IssueStatus.IN_PROGRESS),
      new IssueStatusValueTitle(IssueStatus.DONE),
    ];
  }
}
class IssueStatusValueTitle {
  value: IssueStatus;
  label: string;
  constructor(issueStatus: IssueStatus) {
    this.value = issueStatus;
    this.label = IssueStatusDisplay[issueStatus];
  }
}
