import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DropdownComponent } from '../../../../../shared/components/dropdown/dropdown.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from '../../../../../shared/services/notification.service';

@Component({
  selector: 'app-issue-reporter',
  standalone: true,
  imports: [ReactiveFormsModule, DropdownComponent],
  templateUrl: './issue-reporter.component.html',
  styleUrl: './issue-reporter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IssueReporterComponent implements OnInit {
  @Input() data = inject<any>(MAT_DIALOG_DATA);
  @Input() formData!: FormGroup;
  service = inject<any>(NotificationService);
  reporterList: any = [];
  get assignItem(){
    return this.formData.get('reporterId') as FormControl;
  }
  onSelectedReportChange(event: Event) {
    this.assignItem?.setValue(event.toString());
    this.data.reporterId = this.assignItem.getRawValue();
  }
  ngOnInit(): void {
    this.service.user$.asObservable().subscribe((user: any) => {
      this.reporterList = user.users;
    });
  }
}
