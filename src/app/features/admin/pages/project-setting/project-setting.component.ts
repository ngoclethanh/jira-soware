import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatSliderModule} from '@angular/material/slider';
import { TellInputComponent } from '../../../../shared/components/tell-input/tell-input.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-project-setting',
  standalone: true,
  imports: [MatCardModule,MatSliderModule,FormsModule,TellInputComponent,ReactiveFormsModule,MatFormFieldModule,AsyncPipe,JsonPipe,MatIconModule],
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
  });
  click(){
   const data:any= this.form.getRawValue();
   this.form.disable();
   //this.form.get('tel')?.patchValue(data.tel?.area+"-"+ data.tel.exchange!+'-'+data.tel?.subscriber!)
   console.log( this.form.get('tel')?.value);
   
  }
}
