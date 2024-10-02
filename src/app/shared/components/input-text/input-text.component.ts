import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormsModule,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
  Validator,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-input-text',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true,
    },
  ],
})
export class InputTextComponent
  implements OnInit, Validator, ControlValueAccessor, OnChanges
{
  @Input() label: string = '';
  @Input() uppercase: boolean = false;
  @Input() showLeftIcon: boolean = false;
  @Input() showRightIcon: boolean = false;
  @Input() placeholder: string = '';
  @Input() icon: string = '';
  @Input() disabled: boolean = false;
  @Input() required?: boolean | string;
  @Input() minLength: number | null =null;
  absControl!: AbstractControl;
  formControl=  new FormControl('');
  validators: ValidatorFn[] = [];  
    // Validator nhận từ form cha
  private internalValidators: ValidationErrors | null = null;
  onChangeCallback: (_: any) => void = () => {};
  onTouchedCallback: () => void = () => {};

  ngOnInit(): void {}
  constructor() {}

  value: string = ''; // Giá trị của input
  ngOnChanges(changes: SimpleChanges): void {}
  showLabel(): boolean {
    return this.label !== '' || this.label !== null || this.label !== undefined;
  }

  writeValue(obj: any): void {//nhận giá trị từ form cha mặc định hoặc có thay đổi dữ liệu
    console.log(obj);
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
    
  }
  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }
  // Hàm được gọi bởi Angular để cập nhật trạng thái disabled
  setDisabledState?(isDisabled: boolean): void {
    //this.disabled = isDisabled;
  }
  trimData() {
    this.value = this.value?.trim();
    this.onChangeCallback(this.value);
  }
  checkRequire() {
    return this.absControl?.hasValidator(Validators.required) || this.required == true;
  }
  // getError() {
  //   const errorKey = Object.keys(this.absControl.errors as object)[0];
  //   const errorValue: any = this.absControl.errors![errorKey];
  //   return getErrorValidate(this.label, errorKey, errorValue);
  // }

  onInput(event: any) {
    this.value = event?.target?.value;
    this.onChangeCallback(this.value);////// Gọi hàm callback để Angular nhận biết là control đã được "change"
    this.onTouchedCallback();//// Gọi hàm callback để Angular nhận biết là control đã được "touched"
  }
  validate(control: AbstractControl): ValidationErrors | null {
    this.absControl = control;
    return null;
  }
  // Kiểm tra tính hợp lệ và lưu kết quả
 
 
}
