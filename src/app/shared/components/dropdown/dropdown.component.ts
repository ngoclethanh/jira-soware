import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import {
  MatSelect,
  MatSelectChange,
  MatSelectModule,
} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  model,
  OnChanges,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'j-dropdown',
  standalone: true,
  imports: [
    CommonModule,
    CdkOverlayOrigin,
    CdkConnectedOverlay,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true,
    },
  ],
})
export class DropdownComponent implements OnChanges, ControlValueAccessor {
  @ViewChild(TemplateRef) templateRef!: TemplateRef<any>;
  @ViewChild(MatSelect) instance!: MatSelect;
  @Output() closed = new EventEmitter<void>();
  //@ViewChild(CdkOverlayOrigin, { static: true }) trigger!: CdkOverlayOrigin;
  @Input() items: any[] = [];
  @Output() selectedItemChange = new EventEmitter<any>();
  @Input() optionLabel: string = 'label';
  @Input() optionValue: string = 'value';
  @Input() optionImage: string = '';
  @Input() disabled: boolean = false;
  selectedItem: string = 'Select an item';
  isDropdownOpen = false;

  label = 'Select an item';
  public formControl = new FormControl();
  value: string = '';

  onTouched = () => {};
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }
  toggle(): void {
    this.instance.toggle();
  }
  open(): void {
    this.instance.open();
  }
  onChange = (value: string) => {};
  //cập nhật giá trị của custom form control  và gọi hàm callnacl onChange().
  writeValue(value: string): void {
    this.value = value;
    this.formControl?.setValue(value);
    this.mapOptions();
    this.onChange(value);
  }
  //registers the onChange() callback function.
  registerOnChange(fn: any): void {
    //để đăng ký hàm callback được gọi để thông báo cho angular khi có sự thay đổi của giá trị
    this.onChange = fn;
  }
  // registers the onTouched() callback function, it is called when the custom form control is touched(chạm).
  registerOnTouched(fn: any): void {
    //để đăng ký hàm callback được gọi để thông báo cho angular khi element có sự thao tác
    this.onTouched = fn;
  }
  selectItem(select: MatSelectChange) {
    //this.selectedItem = item;
    this.value = select.value;
    this.selectedItemChange.emit(select.value);
    console.log(select.value);

    // this.closeDropdown();
  }
  constructor() {}
  mapOptions() {
    this.items?.forEach((item, index) => {
      item[this.optionLabel] = item[this.optionLabel];
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    // this.items = this.items.map((o) => o[this.optionValue!]);
    // console.log(this.items);
    this.mapOptions();
  }
  getOptionLabel(option: any) {
    return this.optionLabel !== undefined && this.optionLabel !== null
      ? this.resolveFieldData(option, this.optionLabel)
      : option && option.label !== undefined
      ? option.label
      : option;
  }
  getOptionImg(option: any) {
    return this.optionImage
      ? this.resolveFieldData(option, this.optionImage)
      : option;
  }

  public resolveFieldData(data: any, field: any): any {
    if (data && field) {
      if (this.isFunction(field)) {
        return field(data);
      } else if (field.indexOf('.') == -1) {
        return data[field];
      } else {
        let fields: string[] = field.split('.');
        let value = data;
        for (let i = 0, len = fields.length; i < len; ++i) {
          if (value == null) {
            return null;
          }
          value = value[fields[i]];
        }
        console.log(value);

        return value;
      }
    } else {
      return null;
    }
  }
  public isFunction(obj: any) {
    return !!(obj && obj.constructor && obj.call && obj.apply);
  }
}
