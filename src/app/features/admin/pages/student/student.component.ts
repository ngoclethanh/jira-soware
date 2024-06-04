import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { NotificationService } from '../../../../shared/services/notification.service';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [],
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentComponent implements OnInit {
  service = inject(NotificationService);
  ngOnInit(): void {
    // this.service.received().behavior.subscribe((data) => console.log("behavior:"+data));
    // this.service.received().subject.subscribe((data) => console.log("subject:"+data));
  }
}
