import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatSliderModule} from '@angular/material/slider';
@Component({
  selector: 'app-project-setting',
  standalone: true,
  imports: [MatCardModule,MatSliderModule,FormsModule],
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
}
