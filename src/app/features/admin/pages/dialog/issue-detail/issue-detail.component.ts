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
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { IssueUtil } from '../../../../../shared/utils/issues';
import { IssueTypeWithIcon } from '../../../../../shared/models/model';
import { IssueStatusDisplay, ProjectConst } from '../../../../../shared/common/const';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import {
  AngularEditorConfig,
  AngularEditorModule,
} from '@kolkov/angular-editor';
import { IssueStatus } from '../../../../../shared/common/enums';
import { NotificationService } from '../../../../../shared/services/notification.service';
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
  service = inject<any>(NotificationService);
  issueType: IssueTypeWithIcon[] = [];
  issueStatusDisplay:any=IssueStatusDisplay;
  issueStatuses: IssueStatusValueTitle[]=[];
  getIssueTypeIcon = IssueUtil.getIssueTypeIcon(this.data.type);
  getType: any = {};
  htmlContent = '';
  fb=inject(FormBuilder);
  form = this.fb.group({
    title:[''],
    description:['']
  })
  reporter:any={};
  reporterList:any=[]
  status:string =''
  readonly dialogRef = inject(MatDialogRef<IssueDetailComponent>);
  ngOnInit(): void {
    this.issueType = ProjectConst.IssueTypesWithIcon;
    this.getAllType();
    this.form.get('title')?.setValue(this.data.title);
    this.form.get('description')?.setValue(this.data.description);
    console.log(this.data.status);
this.status = this.data.status as string;
    this.issueStatuses = [
      new IssueStatusValueTitle(IssueStatus.BACKLOG),
      new IssueStatusValueTitle(IssueStatus.SELECTED),
      new IssueStatusValueTitle(IssueStatus.IN_PROGRESS),
      new IssueStatusValueTitle(IssueStatus.DONE)
    ];
    this.service.user$.asObservable().subscribe((user:any) => {
      // this.assignees = this.issue?.userIds.map((userId) =>
      //   user.users?.find((x: any) => x.id === userId)
      // );
      this.reporterList = user.users;
      console.log(this.reporterList);
      
      this.reporter = this.reporterList.find((item:any)=>item.id == this.data.reporterId);
      console.log(this.reporter);
      
    });
   

  }
  showListReporter(){
    document.getElementById("dropdown-reporter")?.classList.toggle('show');
  }
  showType(){
    document.getElementById("dropdown-type")?.classList.toggle('show');
  }
  editForm(form:FormGroup){
    form.enable();
  }
  
  closeDialog() {
    this.dialogRef.close();
  }
  onChangeType(value: string) {
    this.data.type = value;
    this.getAllType();
  }
  ngAfterViewInit(): void {
    
   // this.firstItem.nativeElement.focus();
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
    this.clickAble = false;
  }
   myFunction() {
     document.getElementById("dropdown-status")?.classList.toggle('show');
  }
  blurDrop(){
    var dropdowns = document.getElementsByClassName("dropdown-reporter");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
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