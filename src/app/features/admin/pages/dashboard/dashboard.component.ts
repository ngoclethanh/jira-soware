import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { interval, take } from 'rxjs';
import { NotificationService } from '../../../../shared/services/notification.service';
import { StudentComponent } from '../student/student.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [StudentComponent,FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  
})
export class DashboardComponent implements OnInit {
  service = inject(NotificationService);
  text:string="";
  
  onInput(){
   
      //this.service.send(this.text);
      this.service.send(1);
      this.service.send(2);
       this.service.send(3);
    
 
      this.service.send(4);
      this.service.received().behavior.subscribe((data) => console.log("behavior:"+data));
      this.service.received().subject.subscribe((data) => console.log("subject:"+data));

  }
  ngOnInit(): void {
    //this.service.received().behavior.subscribe((data) => console.log("behavior:"+data));
  /// this.service.received().subject.subscribe((data) => console.log("subject:"+data));
    
  }

}
