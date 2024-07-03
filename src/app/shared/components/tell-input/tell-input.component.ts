import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  booleanAttribute,
  computed,
  inject,
  input,
  model,
  signal,
  viewChild,
} from '@angular/core';
import {
  AbstractControl,
  AbstractControlDirective,
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  NgControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_FORM_FIELD,
  MatFormFieldControl,
  MatFormFieldModule,
} from '@angular/material/form-field';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import { Subject } from 'rxjs';
import { FocusMonitor } from '@angular/cdk/a11y';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MyTel } from '../../models/model';

@Component({
  selector: 'tell-input',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,AsyncPipe,JsonPipe,MatFormFieldModule,MatInputModule],
  templateUrl: './tell-input.component.html',
  styleUrl: './tell-input.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [{provide: MatFormFieldControl, useExisting: TellInputComponent},JsonPipe],
})
//ControlValueAccessor là một interface đóng vai trò là cầu nối giữa Form API của angular với các native element trên DOM.
// Nó định nghĩa các phương thức để ghi giá trị và lắng nghe những thay đổi trên dữ liệu của các input element.
export class TellInputComponent
  implements ControlValueAccessor, MatFormFieldControl<MyTel>, OnDestroy
{
  jsonpipe=inject(JsonPipe);
  static nextId = 0;
  //
  @ViewChild('area') readonly areaInput! :HTMLInputElement ;
  //view child cú pháp mới
  readonly exchangeInput = viewChild.required<HTMLInputElement>('exchange');
  readonly subscriberInput = viewChild.required<HTMLInputElement>('subscriber');
  ngControl = inject(NgControl, { optional: true, self: true });
  readonly parts!: FormGroup<{
    area: FormControl<string | null>;
    exchange: FormControl<string | null>;
    subscriber: FormControl<string | null>;
  }>;
  readonly stateChanges = new Subject<void>();
  readonly touched = signal(false);
  readonly controlType = 'example-tel-input';
  readonly id = `example-tel-input-${TellInputComponent.nextId++}`;
  readonly _userAriaDescribedBy = input<string>('', {
    alias: 'aria-describedby',
  });
  readonly _placeholder = input<string>('', { alias: 'placeholder' });
  readonly _required = input<boolean, unknown>(false, {
    alias: 'required',
    transform: booleanAttribute,
  });
  readonly _disabledByInput = input<boolean, unknown>(false, {
    alias: 'disabled',
    transform: booleanAttribute,
  });
  readonly _value = model<MyTel | null>(null, { alias: 'value' });
  onChange = (_: any) => {};
  onTouched = () => {};
  protected readonly _formField = inject(MAT_FORM_FIELD, {
    optional: true,
  });
  private readonly _focused = signal(false);
  private readonly _disabledByCva = signal(false);
  private readonly _disabled = computed(
    () => this._disabledByInput() || this._disabledByCva()
  );
  private readonly _focusMonitor = inject(FocusMonitor);
  private readonly _elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  get focused(): boolean {
    return this._focused();
  }
  get empty() {
    const {
      value: { area, exchange, subscriber },
    } = this.parts;

    return !area && !exchange && !subscriber;
  }
  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  get userAriaDescribedBy() {
    return this._userAriaDescribedBy();
  }

  get placeholder(): string {
    return this._placeholder();
  }

  get required(): boolean {
    return this._required();
  }

  get disabled(): boolean {
    return this._disabled();
  }

  get value(): MyTel | null {
    return this._value();
  }

  get errorState(): boolean {
    return this.parts.invalid && this.touched();
  }
  constructor() {
    if (this.ngControl !== null) {
      this.ngControl.valueAccessor = this;
    }
    
    this.parts = inject(FormBuilder).group({
      area: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
      exchange: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
      subscriber: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
    });
    this.parts.statusChanges.pipe(takeUntilDestroyed()).subscribe(() => {
      this.stateChanges.next();
    });

    this.parts.valueChanges.pipe(takeUntilDestroyed()).subscribe(value => {
      const tel = this.parts.valid
        ? new MyTel(
            this.parts.value.area || '',
            this.parts.value.exchange || '',
            this.parts.value.subscriber || '',
          )
        : null;
      this._updateValue(tel);
    });
    
  }
  
  private _updateValue(tel: MyTel | null) {
    const current = this._value();
    if (
      tel === current ||
      (tel?.area === current?.area &&
        tel?.exchange === current?.exchange &&
        tel?.subscriber === current?.subscriber)
    ) {
      return;
    }
    this._value.set(tel);
  }
  //sẽ được gọi khi focus vào
  onFocusIn() {
    if (!this._focused()) {
      this._focused.set(true);
    }
  }
  onFocusOut(event: FocusEvent) {
//sẽ được gọi khi focus ra    
    if (!this._elementRef.nativeElement.contains(event.relatedTarget as Element)) {
      this.touched.set(true);
      this._focused.set(false);
      this.onTouched();
    }
  }
  autoFocusNext(control: AbstractControl, nextElement?: HTMLInputElement): void {
    //không lỗi cụ thể giá trị đủ 3 mới cho next
    if (!control.errors && nextElement) {
      this._focusMonitor.focusVia(nextElement, 'program');
    }
  }

  autoFocusPrev(control: AbstractControl, prevElement: HTMLInputElement): void {
    if (control.value.length < 1) {
      //nếu value < 1 back về input tiếp.
      this._focusMonitor.focusVia(prevElement, 'mouse');
    }
  }
  
  setDescribedByIds(ids: string[]) {
    const controlElement = this._elementRef.nativeElement.querySelector(
      '.example-tel-input-container',
    )!;
    controlElement.setAttribute('aria-describedby', ids.join(' '));
  }

  onContainerClick() {
    if (this.parts.controls.subscriber.valid) {
      this._focusMonitor.focusVia(this.subscriberInput(), 'program');
    } else if (this.parts.controls.exchange.valid) {
      this._focusMonitor.focusVia(this.subscriberInput(), 'program');
    } else if (this.parts.controls.area.valid) {
      this._focusMonitor.focusVia(this.exchangeInput(), 'program');
    } else {
      this._focusMonitor.focusVia(this.areaInput, 'program');
    }
  }
  writeValue(tel: MyTel | null): void {
    // để ghi giá trị cho element
    //được gọi ngay sau khi chúng ta sử dụng FormControlDirective, FormControlName hoặc NgModel directives.
    this._updateValue(tel);
  }

  registerOnChange(fn: any): void {
    //để đăng ký hàm callback được gọi để thông báo cho angular khi có sự thay đổi của giá trị
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    //để đăng ký hàm callback được gọi để thông báo cho angular khi element có sự thao tác
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    console.log(isDisabled);
    
   // để gán giá trị cho thuộc tính [disabled]
    this._disabledByCva.set(isDisabled);
  }

  _handleInput(control: AbstractControl, nextElement?: HTMLInputElement): void {
    this.autoFocusNext(control, nextElement);
    this.onChange(this.value);
  }
  ngOnDestroy(): void {}
}
