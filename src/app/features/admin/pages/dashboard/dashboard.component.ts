import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Type,
  inject,
} from '@angular/core';
import { NotificationService } from '../../../../shared/services/notification.service';
import { StudentComponent } from '../student/student.component';
import { FormsModule } from '@angular/forms';
import { NgComponentOutlet } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ToggleComponent } from '../toggle/toggle.component';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    StudentComponent,
    FormsModule,
    NgComponentOutlet,
    RouterOutlet,
    ToggleComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  service = inject(NotificationService);
  toastService = inject(ToastService);
  text: string = '';
  studentCpn: Type<any> | null = null;
  onInput() {
    //this.service.send(this.text);
    this.service.send(1);
    this.service.send(2);
    this.service.send(3);

    this.service.send(4);
    this.service
      .received()
      .subscribe((data: any) => console.log('behavior:' + data));
    // this.service
    //   .received()
    //   .subject.subscribe((data) => console.log('subject:' + data));
  }
  ngOnInit(): void {
    //this.service.received().behavior.subscribe((data) => console.log("behavior:"+data));
    /// this.service.received().subject.subscribe((data) => console.log("subject:"+data));
    this.findSecondLargest();
    console.log('kết quả cuối cùng:', this.findSecondLargest());
  }

  findSecondLargest() {
    // Phương pháp 1: Sắp xếp mảng
    // Sắp xếp mảng theo thứ tự giảm dần.
    // Lấy phần tử thứ hai của mảng đã sắp xếp.
    // Phương pháp 2: Duyệt mảng để tìm hai phần tử lớn nhất
    // Khởi tạo hai biến để lưu trữ phần tử lớn nhất và phần tử lớn thứ hai.
    // Duyệt qua từng phần tử của mảng và cập nhật hai biến này sao cho luôn giữ được phần tử lớn nhất và lớn thứ hai.
    const arr = [3, 4, 5, 1, 0, 2];

    if (arr.length < 2) {
      return null; // Mảng có ít hơn 2 phần tử thì không có phần tử lớn thứ hai
    }

    let first = -Infinity;
    let second = -Infinity;

    for (let number of arr) {
      // Nếu phần tử hiện tại lớn hơn first, cập nhật second bằng giá trị của first và first bằng giá trị của phần tử hiện tại.
      if (number > first) {
        second = first;
        first = number;
      }
      //Nếu phần tử hiện tại không lớn hơn first nhưng lớn hơn second và không bằng first, cập nhật second bằng giá trị của phần tử hiện tại.
      else if (number > second && number !== first) {
        second = number;
      }
    }

    return second === -Infinity ? null : second;
  }
  //vd về lazyloading
  loadStudent() {
    import('../student/student.component').then((m) => {
      this.studentCpn = m.StudentComponent;
    });
  }
  // Ví dụ sử dụng:

  showSuccessToast() {
    this.toastService.success({message:'Success message! have a nice day'});
  }
  showErrorToast() {
    this.toastService.error(  {message:'Error message! have a nice day'});
  }
  showInfoToast() {
    this.toastService.info( {message:'Info message! have a nice day'});
  }
}
