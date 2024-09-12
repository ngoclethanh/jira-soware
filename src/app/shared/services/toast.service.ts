import {
  Injectable,
  Renderer2,
  RendererFactory2,
  ViewChild,
} from '@angular/core';
export interface ToastConfigs {
  translate?: boolean;
  showIcon?: boolean;
  message: string;
  title?: string;
  position?: ToastPosition;
  duration?:number ;
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
  constructor(rendererFactory: RendererFactory2) {
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
    this.positionToast(toastConfig.position!,toastElement)
    const toast = this.createToastElement(toastConfig.message, 'success');
    toastElement?.appendChild(toast);
    setTimeout(() => {
      this.renderer.removeChild(toastElement, toast);
    }, toastConfig.duration || 3000);
  }
  error(toastConfig: ToastConfigs) {
    const toastElement = document.getElementById('toast')!;
    this.positionToast(toastConfig.position!,toastElement)
    const toast = this.createToastElement(toastConfig.message, 'error');
    toastElement?.appendChild(toast);
    setTimeout(() => {
      this.renderer.removeChild(toastElement, toast);
    }, toastConfig.duration || 3000);
  }
  info(toastConfig: ToastConfigs) {
    const toastElement = document.getElementById('toast')!;
    this.positionToast(toastConfig.position!,toastElement)
    const toast = this.createToastElement(toastConfig.message, 'info');
    toastElement?.appendChild(toast);
    setTimeout(() => {
      this.renderer.removeChild(toastElement, toast);
    }, toastConfig.duration || 3000);
  }
  private createToastElement(
    message: string,
    type: 'success' | 'error' | 'info' | 'warning'
  ): HTMLElement {
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
    toastElementChild.style.cssText = `border-color:${color[type]}`;
    toastElementChild.innerHTML = `
          <div class="toast__icon">
              <i class="fa ${icon[type]}" style="color:${color[type]}"></i>
          </div>
          <div class="toast__body">
              <div class="toast__title">${type}</div>
              <div class="toast__msg">${message}</div>
          </div>
          <div class="toast__close">
              <i class="fa fa-times"></i>
          </div>
      `;
    toastElementChild.onclick = (e: any) => {
      if (e.target.closest('.toast__close')) {
        this.renderer.removeChild(document.body, toastElementChild);
      }
    };
    return toastElementChild;
  }

  positionToast(position:string, element:any){
    switch (position) {
      case 'top-left':
        element.style.cssText  = ' left: 12px;top: 12px;';
        break;
      case 'bottom-center':
        element.style.cssText  =
          ' left: 50%;bottom: 12px;transform:translateX(-50%)';
        break;
      case 'top-center':
        element.style.cssText  = 'left: 50%;top: 12px;transform:translateX(-50%)';
        break;
      case 'bottom-left':
        element.style.cssText  = ' left: 12px;bottom: 12px;';
        break;
      case 'bottom-right':
        element.style.cssText  = ' right: 12px;bottom: 12px;';
        break;
      case 'top-right':
        element.style.cssText  = ' right: 12px;top: 12px;';
        break;
      default:
        //top-right
        element.style.cssText  = ' right: 12px;top: 12px;';
        break;
    }
  }
}
