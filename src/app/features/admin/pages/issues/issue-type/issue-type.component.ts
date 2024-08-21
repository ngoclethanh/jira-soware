import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownComponent } from '../../../../../shared/components/dropdown/dropdown.component';
import { CommonModule } from '@angular/common';
import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { IssueUtil } from '../../../../../shared/utils/issues';
import { IssueTypeWithIcon } from '../../../../../shared/models/model';
import { ProjectConst } from '../../../../../shared/common/const';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-issue-type',
  standalone: true,
  imports: [ReactiveFormsModule, DropdownComponent, CommonModule, CdkOverlayOrigin,
    CdkConnectedOverlay,],
  templateUrl: './issue-type.component.html',
  styleUrl: './issue-type.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IssueTypeComponent implements OnInit {
  @Input() data =inject<any>(MAT_DIALOG_DATA);
  isDropdownOpen = false;
  issueType: IssueTypeWithIcon[] = [];
  getIssueTypeIcon = IssueUtil.getIssueTypeIcon(this.data.type);
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  selectItem(select: any) {
    this.data.type = select.value;
    this.getIssueTypeIcon = IssueUtil.getIssueTypeIcon(select.value);
    this.closeDropdown();
  }
  closeDropdown() {
    this.isDropdownOpen = false;
  }
  ngOnInit(): void {
    console.log(this.data);
    
    this.issueType = ProjectConst.IssueTypesWithIcon;
  }
}
