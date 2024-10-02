import { Component, forwardRef, inject, model } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'day-input',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './day-input.component.html',
  providers: [
    { provide: MatFormFieldControl, useExisting: DayInputComponent },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DayInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DayInputComponent),
      multi: true,
    },
  ],
})
export class DayInputComponent implements ControlValueAccessor {
  absControl: AbstractControl|undefined;
  form = inject(FormBuilder).group({
    day: ['', [this.dateValidator,Validators.required]],
    hour: ['', [Validators.maxLength(2),Validators.required,this.dateValidator,]],
    minute: ['', this.dateValidator],
    second: ['', this.dateValidator],
  });
  readonly _value = model<any>(null, { alias: 'value' });
  onChange = (_: any) => {};
  onTouched = () => {};

  get value(): any | null {
    return this._value();
  }

  constructor() {}

  private _updateValue(tel: any | null) {
    if (tel) {
      this.form.setValue({
        day: tel.day || '',
        hour: tel.hour || '',
        minute: tel.minute || '',
        second: tel.second || '',
      });
    }
  }
getError(control:FormControl){
  const errMsg:any={
    required:"bắt buộc nhập",
    maxlength:"nhập quá kí tự cho phép",
    invalidDay:"ngày không hợp lệ"
  }
  if (control.errors) {
    const errors=Object.keys(control.errors as object)[0];
    return errMsg[errors]
  }
  return null
 
  
}
  writeValue(tel: any | null): void {
    // để ghi giá trị cho element
    //được gọi ngay sau khi chúng ta sử dụng FormControlDirective, FormControlName hoặc NgModel directives.
    this._updateValue(tel);
    console.log(tel);
  }

  registerOnChange(fn: any): void {
    //để đăng ký hàm callback được gọi để thông báo cho angular khi có sự thay đổi của giá trị
    this.onChange = fn;
    this.form.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    //để đăng ký hàm callback được gọi để thông báo cho angular khi element có sự thao tác
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // để gán giá trị cho thuộc tính [disabled]
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  _handleInput(): void {
    // Đánh dấu là đã thao tác (touched)
    this.onTouched();
  }
  validate(control: AbstractControl): ValidationErrors | null {
    return this.form.valid ? null : { invalidForm: { valid: false, message: 'Invalid form' } };
  }

  dateValidator(control: AbstractControl): ValidationErrors | null {
    const dayValue = control.value;
    if (dayValue >= 60) {
      return { invalidDay: 'Day must be between 1 and 31' };
    }
    return null;
  }
  ngOnDestroy(): void {}
}
