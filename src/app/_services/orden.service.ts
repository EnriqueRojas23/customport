import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


import { map } from 'rxjs/operators';
import { OrdenServicio } from '../_models/ordenservicio';
import { Observable } from 'rxjs';
import { Incidencia } from '../_models/incidencia';
import { Documento } from '../_models/documentos';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization : 'Bearer ' + localStorage.getItem('token'),
    'Content-Type' : 'application/json'
  })
};


const httpOptionsUpload = {
  headers: new HttpHeaders({
    Authorization : 'Bearer ' + localStorage.getItem('token'),
  })
};
const headers = new HttpHeaders().set('authorization', 'Bearer ' + localStorage.getItem('token'));

@Injectable({
  providedIn: 'root'
})
export class OrdenService {

baseUrl = environment.baseUrl + '/api/Orden/';

constructor(private http: HttpClient) { }

uploadFile(formData: FormData, UserId: number): any {
     return this.http.post(this.baseUrl + 'UploadFile?usrid=' + UserId.toString()
    , formData
    , httpOptionsUpload
  );
 }


 getAllOrderTransport(selectedCliente: string,
                      selectedEstado: string, usuarioid: number, fecini: Date, fecfin: Date): any {
   const param = '?remitente_id=' + selectedCliente + '&estado_id=' + selectedEstado
   + '&usuario_id=' + usuarioid
   + '&fec_ini=' + fecini.toLocaleDateString()
   + '&fec_fin=' + fecfin.toLocaleDateString();

   return this.http.get<OrdenServicio[]>(this.baseUrl + 'GetAllOrder' + param  , httpOptions);
  }



 getAllIncidencias(id: number): any {
  return this.http.get<Incidencia[]>(this.baseUrl + 'GetAllIncidencias?OrdenTransporteId=' + id , httpOptions);
  }

getAllDocumentos(id: number): Observable<Documento[]> {
  const params = '?Id=' + id ;
  return this.http.get<Documento[]>(this.baseUrl + 'GetAllDocumentos' + params, httpOptions);
}
deleteFile(id: number): any {
  const params = '?documentoId=' + id ;
  return this.http.delete<Documento[]>(this.baseUrl + 'deleteFile' + params, httpOptions);
}
downloadDocumento(id: number): any {

  return this.http.get(this.baseUrl + 'DownloadArchivo?documentoId=' + id, {headers, responseType: 'blob' as 'json'});
  }
  downloadPlantilla(): any {

 this.http.get(this.baseUrl + 'DownloadPlantilla', {headers, responseType: 'blob' as 'json'}).subscribe(
      (response: any) => {
          const dataType = response.type;
          const binaryData = [];
          binaryData.push(response);
          const downloadLink = document.createElement('a');
          downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
          window.open(downloadLink.href);
      }
    );
    }

  getOrden(id: number): any {
  return this.http.get<OrdenServicio>(this.baseUrl + 'GetOrden?id=' + id , httpOptions);
  }
  actualizarOrden(model: any): any {
    return this.http.post(this.baseUrl + 'UpdateOrden', model, httpOptions)
    .pipe(map((response: any) => {

    }));
  }


  eliminarOrden(model: any): any {
    return this.http.post(this.baseUrl + 'UpdateOrdenEliminar', model, httpOptions)
    .pipe(map((response: any) => {

      })
    );
  }

  uploadFileSite(formData: FormData, ordenid: number): any {

    return this.http.post(this.baseUrl + 'UploadFileConfirm2?id=' + ordenid
    , formData
    , httpOptionsUpload
     );
   }

}
