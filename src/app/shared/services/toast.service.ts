import {
  Injectable,
  Renderer2,
  RendererFactory2,
  ViewChild,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { timeout } from 'rxjs';
export interface ToastConfigs {
  translate?: boolean;
  showIcon?: boolean;
  message: string;
  title?: string;
  position?: ToastPosition;
}
export type ToastPosition =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'top-center'
  | 'bottom-center';
@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(rendererFactory: RendererFactory2,private translate:TranslateService) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }
  private renderer: Renderer2;
  // showToast(
  //   message: string,
  //   type: 'success' | 'error' | 'info' | 'warning',
  //   duration: number = 3000
  // ) {
  //   const toastElement = document.getElementById('toast');

  //   const toast = this.createToastElement(message, type);
  //   toastElement?.appendChild(toast);

  //   // Loại bỏ toast sau khoảng thời gian chỉ định
  //   setTimeout(() => {
  //     //this.renderer.removeChild(document.body, toast);
  //     this.renderer.removeChild(toastElement, toast);
  //   }, duration);
  // }
  success(toastConfig: ToastConfigs) {
    const toastElement = document.getElementById('toast')!;
    this.positionToast(toastConfig.position!, toastElement);
    const toast = this.createToastElement(this.translate.instant(toastConfig.message), {
      closeButton: true,
      toastClass: 'success',
      timeOut:5000
    });
    toastElement?.appendChild(toast);
  }
  error(toastConfig: ToastConfigs) {
    const toastElement = document.getElementById('toast')!;
    this.positionToast(toastConfig.position!, toastElement);
    const toast = this.createToastElement(this.translate.instant(toastConfig.message), {
      closeButton: true,
      toastClass: 'error',
      timeOut:5000
    });
    toastElement?.appendChild(toast);
  }
  info(toastConfig: ToastConfigs) {
    const toastElement = document.getElementById('toast')!;
    this.positionToast(toastConfig.position!, toastElement);
    const toast = this.createToastElement(this.translate.instant(toastConfig.message), {
      closeButton: true,
      toastClass: 'info',
      timeOut:5000
    });
    toastElement?.appendChild(toast);
  }

  //type: 'success' | 'error' | 'info' | 'warning',
  private createToastElement(message: string, options: any): HTMLElement {
    // const text = this.renderer.createText(message);

    // // Thêm class tùy vào loại thông báo
    // this.renderer.addClass(toastElement, 'toast');
    // this.renderer.addClass(toastElement, type);

    // // Thêm nội dung vào Toast
    // this.renderer.appendChild(toastElement, text);

    // // Thêm một nút đóng
    // const closeButton = this.renderer.createElement('button');
    // const closeText = this.renderer.createText('✖');
    // this.renderer.appendChild(closeButton, closeText);
    // this.renderer.addClass(closeButton, 'close-btn');
    // this.renderer.listen(closeButton, 'click', () => {
    //   this.renderer.removeChild(document.body, toastElement);
    // });
    // this.renderer.appendChild(toastElement, closeButton);
    const icon: any = {
      success: 'fa-check-circle',
      info: 'fa-info-circle',
      error: 'fa-exclamation-circle',
    };
    const color: any = {
      success: '#51A351',
      info: '#2F96B4',
      error: '#BD362F',
    };

    const toastElementChild = this.renderer.createElement('div');
    toastElementChild.setAttribute('class', 'toast');
    toastElementChild.style.cssText = `border-color:${
      color[options.toastClass]
    }`;
    toastElementChild.innerHTML = `
          <div class="toast__icon">
              <i class="fa ${icon[options.toastClass]}" style="color:${
      color[options.toastClass]
    }"></i>
          </div>
          <div class="toast__body">
              <div class="toast__title">${options.toastClass}</div>
              <div class="toast__msg">${message}</div>
          </div>
          <div id="toast__close" class="toast__close">
              <i class="fa fa-times"></i>
          </div>
      `;
    if (!options.closeButton) {
      const toast__close = toastElementChild.querySelector('.toast__close');
      toast__close.remove();
    }
    toastElementChild.onclick = (e: any) => {
      if (e.target.closest('.toast__close')) {
        this.renderer.removeChild(document.body, toastElementChild);
      }
    };
     setTimeout(() => {
      //xóa element khỏi dom
      toastElementChild.remove();
    },options.timeOut || 5000);
    console.log(options);
    
    return toastElementChild;
  }

  positionToast(position: string, element: any) {
    switch (position) {
      case 'top-left':
        element.style.cssText = ' left: 12px;top: 12px;';
        break;
      case 'bottom-center':
        element.style.cssText =
          ' left: 50%;bottom: 12px;transform:translateX(-50%)';
        break;
      case 'top-center':
        element.style.cssText =
          'left: 50%;top: 12px;transform:translateX(-50%)';
        break;
      case 'bottom-left':
        element.style.cssText = ' left: 12px;bottom: 12px;';
        break;
      case 'bottom-right':
        element.style.cssText = ' right: 12px;bottom: 12px;';
        break;
      case 'top-right':
        element.style.cssText = ' right: 12px;top: 12px;';
        break;
      default:
        //top-right
        element.style.cssText = ' right: 12px;top: 12px;';
        break;
    }
  }
}
