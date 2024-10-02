import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatSliderModule} from '@angular/material/slider';
import { TellInputComponent } from '../../../../shared/components/tell-input/tell-input.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DayInputComponent } from '../../../../shared/components/day-input/day-input.component';
import { MatButtonModule } from '@angular/material/button';
import { InputTextComponent } from '../../../../shared/components/input-text/input-text.component';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-project-setting',
  standalone: true,
  imports: [MatCardModule,MatSliderModule,FormsModule,TellInputComponent,ReactiveFormsModule,MatFormFieldModule,AsyncPipe,JsonPipe,MatIconModule,DayInputComponent,MatButtonModule,InputTextComponent,MatInputModule],
  templateUrl: './project-setting.component.html',
  styleUrl: './project-setting.component.scss',
  changeDetection: ChangeDetectionStrategy.Default
})
export class ProjectSettingComponent {
  NumberOfRoom: number = 1;
  NumberOfAdult: number = 1;
  NumberOfChildren: number = 0;
  Children=0
  Adult=0;
  Roomvalue=0
  readonly form = new FormGroup({
    tel: new FormControl(),
    day:new FormControl(),
    address:new FormControl('',[Validators.required,Validators.minLength(5)])

  });
  setControl(){
    this.form.controls['address'].setValue('888888')
  }
  address:string='';
  click(){
    console.log(this.form.touched);
    
   const data:any= this.form.getRawValue();
   //this.form.get('tel')?.patchValue(data.tel?.area+"-"+ data.tel.exchange!+'-'+data.tel?.subscriber!)
   console.log( this.form);
   
  }
}
