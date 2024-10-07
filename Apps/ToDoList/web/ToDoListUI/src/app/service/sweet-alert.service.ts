import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() { }
  ShowError(title:string,message:string){
    return Swal.fire({
          icon: 'error',
          title: title,
          text: message+'.',
          confirmButtonColor:'#083590'
        })
      }
  ShowSuccess(title:string,message:string){
    return Swal.fire({
          icon: 'success',
          title: title,
          text: message+'.',
          confirmButtonColor:'#083590'
        })
      }
  ShowInfo(title:string,message:string){
    return Swal.fire({
          icon: 'info',
          title: title,
          text: message+'.',
          confirmButtonColor:'#083590'
        })
      }

  ShowAlert(title:string,message:string){
    return Swal.fire({
          icon: 'warning',
          title: title,
          text: message+'.',
          confirmButtonColor:'#083590'
        })
      }

  ShowQuestion(title:string,message:string){
    return Swal.fire({
          icon: 'question',
          title: title,
          text: message+'.',
          showConfirmButton: true,
          confirmButtonText: 'Si',
          confirmButtonColor:'#083590',
          showCancelButton: true,
          cancelButtonText: "No"
        })
      }

      ShowLoading(loadingMsg:string = 'Cargando Datos'){
        Swal.fire({
          title: loadingMsg,
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
        Swal.showLoading();
      }
      CloseLoading(){
        Swal.close();
      }

}
