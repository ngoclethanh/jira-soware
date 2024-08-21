import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DropdownComponent } from '../../../../../shared/components/dropdown/dropdown.component';
import { ProjectConst } from '../../../../../shared/common/const';

@Component({
  selector: 'app-issue-priority',
  standalone: true,
  imports: [ReactiveFormsModule, DropdownComponent],
  templateUrl: './issue-priority.component.html',
  styleUrl: './issue-priority.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IssuePriorityComponent implements OnInit,OnChanges {
  priorities: any = [];
  @Input() priority:string=''
  // form = this.fb.group({
  //   name:[''],
  // });
  @Input() formData!: FormGroup;
  @Output() onFormGroupChange: EventEmitter<FormGroup> =
  new EventEmitter<FormGroup>();
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.priorities = ProjectConst.PrioritiesWithIcon;
    //this.addGroupToParent()
  }
  ngOnChanges(changes: SimpleChanges): void {
    
  }
  onSelectedPriorityChange(event: Event) {
    this.formData.get('priority')?.setValue(event.toString());
    this.onFormGroupChange.emit(this.formData)
  }
  // private addGroupToParent(): void {
  //   this.formData.addControl(
  //     'priority',
  //     new FormGroup(this.form.controls)
  //   );
  //   this.onFormGroupChange.emit(this.formData);
  // }
}
