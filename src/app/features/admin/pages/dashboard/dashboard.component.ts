import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  Type,
  ViewChild,
  inject,
} from '@angular/core';
import { NotificationService } from '../../../../shared/services/notification.service';
import { StudentComponent } from '../student/student.component';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgComponentOutlet } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ToggleComponent } from '../toggle/toggle.component';
import { ToastService } from '../../../../shared/services/toast.service';
import { TranslateModule } from '@ngx-translate/core';
import { CheckoutComponent } from '../checkout/checkout.component';
import { BoardComponent } from '../board/board.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    StudentComponent,
    FormsModule,
    NgComponentOutlet,
    RouterOutlet,
    ToggleComponent,
    TranslateModule,
    CommonModule,
    CheckoutComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit,OnChanges,OnDestroy,AfterViewInit{
  template:string ='123';
  @ViewChild('btnButton') btnButton! :ElementRef;
  constructor(){
    console.log("constructor:",this.template);
    
  }
  service = inject(NotificationService);
  toastService = inject(ToastService);
  text: string = '';
  active:boolean = true;
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
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    
    console.log("onChange:",this.template);
  }
  ngAfterViewInit(): void {
    console.log("afterviewinit:",this.template);
    //this.btnButton.nativeElement.innerHTML='ngoc sieu dz'
  }
  ngOnInit(): void {
    console.log("onInit:",this.template);
    //this.service.received().behavior.subscribe((data) => console.log("behavior:"+data));
    /// this.service.received().subject.subscribe((data) => console.log("subject:"+data));
    this.findSecondLargest();
    console.log('kết quả cuối cùng:', this.findSecondLargest());
    const items: any = [
      { id: 1, parentId: null, name: 'Item 1' },
      { id: 2, parentId: 1, name: 'Item 2' },
      { id: 3, parentId: 1, name: 'Item 3' },
      { id: 4, parentId: 2, name: 'Item 4' },
      { id: 5, parentId: 3, name: 'Item 5' },
      { id: 6, parentId: 3, name: 'Item 6' },
    ];
   
   //const listNode= JSON.parse(JSON.stringify(items));
     const arrMerge= this.mapTree(items,items );
    console.log(arrMerge);
  }
ngOnDestroy(): void {
  
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
    this.toastService.success({ message: 'MESSAGE.SUCCESS' });
  }
  showErrorToast() {
    this.toastService.error({ message: 'Error message! have a nice day' });
  }
  showInfoToast() {
    this.toastService.info({ message: 'Info message! have a nice day' });
  }

  mapTree( listNode: any[],items: any[]) {
    const res= listNode.map((x) => {
        const listChildren = items.filter((s) => s.parentId === x.id);
        if (listChildren.length > 0) {
          x.children = listChildren;
          this.mapTree(listChildren,listNode );
        }
        return x;
    }).filter((f)=>f.parentId == null);

    return res;
    //diễn giải đoạn code dequy:
    //hàm mapTree nhận 2 giá trị : giá trị 1 là hàm sẽ được lặp để tìm con.hàm thứ 2 là hàm gốc không sửa đổi mục đích tìm children.
    //nếu khi tìm xong nếu có thể tìm con tiếp thì sẽ gọi lại hàm maptre lúc này giá trị thứ 1(là 1 tree đã tìm được từ lần lặp trước) sẽ tiếp tục lặp để tìm tree bé hơn

  }
}
