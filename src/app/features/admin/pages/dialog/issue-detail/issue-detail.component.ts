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
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { IssueUtil } from '../../../../../shared/utils/issues';
import { IssueTypeWithIcon } from '../../../../../shared/models/model';
import { ProjectConst } from '../../../../../shared/common/const';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import {
  AngularEditorConfig,
  AngularEditorModule,
} from '@kolkov/angular-editor';
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
  ],
  templateUrl: './issue-detail.component.html',
  styleUrl: './issue-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class IssueDetailComponent implements OnInit,AfterViewInit {
  @ViewChild('element') firstItem!: ElementRef;
  clickAble:boolean = false
  isOpenType: boolean = false;
  data = inject<any>(MAT_DIALOG_DATA);
  issueType: IssueTypeWithIcon[] = [];
  getIssueTypeIcon = IssueUtil.getIssueTypeIcon(this.data.type);
  getType: any = {};
  htmlContent = '';
  fb=inject(FormBuilder);
  form = this.fb.group({
    title:[],
    description:['']
  })
  readonly dialogRef = inject(MatDialogRef<IssueDetailComponent>);
  ngOnInit(): void {
    this.issueType = ProjectConst.IssueTypesWithIcon;
    this.getAllType();
    this.form.get('title')?.setValue(this.data.title);
    this.form.get('description')?.setValue(this.data.description);
  }
  
  closeDialog() {
    this.dialogRef.close();
  }
  onChangeType(value: string) {
    this.data.type = value;
    this.getAllType();
  }
  ngAfterViewInit(): void {
    this.firstItem.nativeElement.focus();
  }
  getAllType() {
    this.getType = this.issueType.find((item) => item.value === this.data.type);
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
  updateTitle(){
     const form=this.form.getRawValue();
    this.data.title = form.title;
  }
  updateDescription(){
    const form=this.form.getRawValue();
    this.data.description = form.description;
  }
}
