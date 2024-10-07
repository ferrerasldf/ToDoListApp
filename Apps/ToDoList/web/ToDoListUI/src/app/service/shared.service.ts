import { HttpErrorResponse } from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class SharedService {
     isLoaderActive = false;

     public parseError(httpErrorResponse: HttpErrorResponse): string {
          let value = ''
          typeof httpErrorResponse.error.message === 'string' ?
          value = 'string' : value = 'other';
          switch (value) {
               case 'string':
                    if ((httpErrorResponse.error['message'] as string).includes('\r')){
                         return httpErrorResponse.error.message.split(":")[1]?.split("\r")[0];
                    }else if((httpErrorResponse.error['message'] as string).includes('at')){
                         return httpErrorResponse.error.message.split(":")[1]?.split("at")[0];
                    }else
                         return  httpErrorResponse.error.message as string;
               default:
                    return 'Error al ejecutar la acción';
          }

     }
}

