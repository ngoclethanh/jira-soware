import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  IssueStatusDisplay,
} from '../../../../../shared/common/const';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import {
  AngularEditorConfig,
  AngularEditorModule,
} from '@kolkov/angular-editor';
import { NotificationService } from '../../../../../shared/services/notification.service';
import { DropdownComponent } from '../../../../../shared/components/dropdown/dropdown.component';
import { DropdownTriggerForDirective } from '../../../../../shared/directives/dropdown.directive';
import {  MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import {
  MatChipsModule,
} from '@angular/material/chips';
import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { IssuePriorityComponent } from '../../issues/issue-priority/issue-priority.component';
import { IssueTypeComponent } from '../../issues/issue-type/issue-type.component';
import { IssueAssignComponent } from '../../issues/issue-assign/issue-assign.component';
import { IssueReporterComponent } from '../../issues/issue-reporter/issue-reporter.component';
import { IssueStatusComponent } from '../../issues/issue-status/issue-status.component';
@Component({
  selector: 'app-issue-detail',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatIconModule,
    AngularEditorModule,
    DropdownComponent,
    DropdownTriggerForDirective,
    CommonModule,
    CdkOverlayOrigin,
    CdkConnectedOverlay,
    MatChipsModule,
    CommonModule,
    MatSelectModule,
    IssuePriorityComponent,
    IssueTypeComponent,
    IssueAssignComponent,
    IssueReporterComponent,
    IssueStatusComponent
  ],
  templateUrl: './issue-detail.component.html',
  styleUrl: './issue-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class IssueDetailComponent implements OnInit, AfterViewInit {
  @ViewChild('element') firstItem!: ElementRef;
  clickAble: boolean = false;
  isOpenType: boolean = false;
  data = inject<any>(MAT_DIALOG_DATA);
  service = inject<any>(NotificationService);
  issueStatusDisplay: any = IssueStatusDisplay;
  htmlContent = '';
  fb = inject(FormBuilder);
  form = this.fb.group({
    title: [''],
    description: [''],
    status: [''],
    reporterId: [''],
    userIds: this.fb.array([]),
    test:'',
    priority:['']
  });
  readonly dialogRef = inject(MatDialogRef<IssueDetailComponent>);
  ngOnInit(): void {
    this.form.get('title')?.setValue(this.data.title);
    this.form.get('description')?.setValue(this.data.description);
    this.form.patchValue(this.data);
    console.log(this.data);
  }
 
  editForm(form: FormGroup) {
    form.enable();
  }
  onChange(form:FormGroup) {
    // reset the form value to the newly emitted form group value.
    this.form = form;
    this.data.priority = this.form.getRawValue().priority;
  }
  closeDialog() {
    this.dialogRef.close();
  }
  ngAfterViewInit(): void {
    // this.firstItem.nativeElement.focus();
  }

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
  };

  updateTitle() {
    const form = this.form.getRawValue();
    this.data.title = form.title;
  }
  updateDescription() {
    const form = this.form.getRawValue();
    this.data.description = form.description;
    this.clickAble = false;
  }

}
