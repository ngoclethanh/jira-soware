import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DropdownComponent } from '../../../../../shared/components/dropdown/dropdown.component';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { NotificationService } from '../../../../../shared/services/notification.service';

@Component({
  selector: 'app-issue-assign',
  standalone: true,
  imports: [ReactiveFormsModule, DropdownComponent, CommonModule, CdkOverlayOrigin,MatIconModule,
    CdkConnectedOverlay, MatChipsModule,],
  templateUrl: './issue-assign.component.html',
  styleUrl: './issue-assign.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IssueAssignComponent implements OnInit {
  @Input() data =inject<any>(MAT_DIALOG_DATA);
  @Input() formData!: FormGroup;
  service = inject<any>(NotificationService);
  reporterList: any = [];
  isDropdownOpen = false;
  constructor(private fb:FormBuilder){

  }
  getUserName(value: string) {
    return this.reporterList.find((item: any) => item.id === value).name;
  }
  remove(index: number): void {
    this.userItem.removeAt(index);
    this.data.userIds= this.userItem.getRawValue();
    // this.fruits.update((fruits) => {
    //   const index = fruits.indexOf(fruit);
    //   if (index < 0) {
    //     return fruits;
    //   }
    //   fruits.splice(index, 1);
    //   //  this.announcer.announce(`Removed ${fruit.name}`);
    //   return [...fruits];
    // });
  }
  get userItem(): FormArray {
    return this.formData.get('userIds') as FormArray;
  }
  isUserSelected(user: any): boolean {
    const da=this.userItem.controls.find((x)=>x.value == user.id)?.value;
    return da;
  }
  addApi(value: string = '') {
    this.userItem.push(this.fb.control(value));
    this.data.userIds = this.userItem.getRawValue();
  }
  ngOnInit(): void {
    this.service.user$.asObservable().subscribe((user: any) => {
      this.reporterList = user.users;
      //this.reporter = this.reporterList.find((item:any)=>item.id == this.data.reporterId);
    });
    this.data?.userIds?.forEach((value: string) => {
      this.addApi(value);
    });
  }
}
