import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';
import { SelectItem, LazyLoadEvent } from 'primeng/api';
import { OrdenServicio } from 'src/app/_models/ordenservicio';
import { ClienteService } from 'src/app/_services/cliente.service';
import { GeneralService } from 'src/app/_services/general.service';
import { OrdenService } from 'src/app/_services/orden.service';

@Component({
  selector: 'app-listadoservicios',
  templateUrl: './listadoservicios.component.html',
  styleUrls: ['./listadoservicios.component.scss']
})
export class ListadoserviciosComponent implements OnInit {

  constructor(  private router: Router,
                private ordenService: OrdenService,
                private generalService: GeneralService,
                private clienteService: ClienteService ) {
const currentTime = new Date();





}
clientes: SelectItem[] = [];
estados: SelectItem[] = [];

selectedCliente = '';
selectedEstado = ''; // = 'BMW';


style = {
width: '100%',
height: '100%',
boxSizing: 'border-box'
};

ordenes: OrdenServicio[] = [];
// frozenCols: any[];
selectedRow: any;


public loading = false;

model: any;
estadoId!: number;
selection = new SelectionModel<OrdenServicio>(true, []);
cols!: any[];


jwtHelper = new JwtHelperService();
decodedToken: any = {};
es: any;
dateInicio: Date = new Date(Date.now()) ;
dateFin: Date = new Date(Date.now()) ;
escliente: any;
imageToShow: any;


ngOnInit(): any {
this.cols =
[
{header: 'Acc', field: 'id' , width: '90px' },
{header: 'AL', field: 'alerta' , width: '60px'  },
{header: 'NANIFIESTO', field: 'alerta' , width: '120px'  },
{header: 'F. REGISTRO', field: 'fecha_registro' , width: '120px'  },
{header: 'F. CARGA', field: 'fecha_carga' , width: '120px'  },
{header: 'OT', field: 'numero_ot'  ,  width: '90px' },
{header: 'ESTADO', field: 'estado'  , width: '100px'   },
{header: 'TIPO ENTREGA', field: 'tipoEntrega'  , width: '120px'   },
{header: 'CLIENTE', field: 'remitente'  ,  width: '180px'  },
{header: 'DESTINATARIO', field: 'destinatario'  ,  width: '180px'  },
{header: 'SHIPMENT', field: 'shipment' , width: '120px'  },
{header: 'DELIVERY', field: 'delivery'  , width: '160px'  },
{header: 'OC', field: 'oc'  , width: '160px'  },
{header: '# FOTOS', field: 'guias'  , width: '160px'  },
{header: 'DESTINO', field: 'provincia_entrega'  , width: '130px'  },
{header: 'F. ENTREGA', field: 'fecha_carga' , width: '120px'  },
{header: 'CONDUCTOR', field: 'chofer', width: '180px'    },
{header: 'TRACTO', field: 'tracto', width: '120px'   },
{header: 'CARRETA', field: 'carreta', width: '120px'  },
{header: 'USUARIO REGISTRO', field: 'usuario_registro', width: '120px'  },


];


this.dateInicio.setDate((new Date()).getDate() - 2);
this.dateFin.setDate((new Date()).getDate() );
const token = localStorage.getItem('token');
console.log('Logueado:' + !this.jwtHelper.isTokenExpired(token?.toString()));

this.es = {
firstDayOfWeek: 1,
dayNames: [ 'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado' ],
dayNamesShort: [ 'dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb' ],
dayNamesMin: [ 'D', 'L', 'M', 'X', 'J', 'V', 'S' ],
// tslint:disable-next-line: max-line-length
monthNames: [ 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre' ],
monthNamesShort: [ 'ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic' ],
today: 'Hoy',
clear: 'Borrar'
};


const user  = localStorage.getItem('token');
this.escliente = localStorage.getItem('escliente');


this.decodedToken = this.jwtHelper.decodeToken(user?.toString());



this.clienteService.getAllClientes('').subscribe(list => {

this.clientes.push({label: 'Todos los clientes', value: ''});
list.forEach(x => {
this.clientes.push({ label: x.razon_social , value: x.id.toString() });
});
} , error => {}
, () => {
this.generalService.getEstados(2).subscribe((list: any[]) => {

    this.estados.push({label: 'Todos los estados', value: ''});
    list.forEach((x: { nombreEstado: any; id: { toString: () => any; }; }) => {
    this.estados.push({ label: x.nombreEstado , value: x.id.toString() });
});
}, (error: any) => {

}, () => {


if (localStorage.getItem('selectedCliente') === 'undefined' || localStorage.getItem('selectedCliente') == null ) {
// this.model.selectedCliente = 1;
} else {

}


if (localStorage.getItem('selectedEstado') == null || localStorage.getItem('selectedEstado') === 'undefined') {
// this.model.EstadoId = 4;
} else {

}


if (localStorage.getItem('dateInicio') === undefined || localStorage.getItem('dateInicio') === null) {
this.dateInicio.setDate((new Date()).getDate() - 2);
} else {
// this.dateInicio =  new Date(localStorage.getItem('dateInicio'));
}

if (localStorage.getItem('dateFin') === undefined || localStorage.getItem('dateFin') === null  ) {
this.dateFin.setDate((new Date()).getDate() );
} else {
// this.dateFin =  new Date(localStorage.getItem('dateFin'));
}

const  inicio = moment(this.dateInicio) ;
const fin =  moment(this.dateFin);

if ( fin.diff(inicio, 'days') > 60) {

this.loading = false;
return ;
}

this.loading = true;
this.ordenService.getAllOrderTransport(this.selectedCliente, this.selectedEstado, this.decodedToken.nameid,
this.dateInicio, this.dateFin ).subscribe((list: OrdenServicio[]) => {
this.loading = false;
this.ordenes =  list;
console.log(list);
}, (error: any) => {
this.loading = false;
}, () => {
this.loading = false;
});
});
});
}


ver(id: any): void {
this.router.navigate(['/seguimiento/verorden', id]);
}
edit(id: any): void {
this.router.navigate(['/seguimiento/editarorden', id]);
}


buscar(): void {
this.loading = true;
localStorage.setItem('selectedCliente', this.selectedCliente);
localStorage.setItem('dateInicio', this.dateInicio.toDateString());
localStorage.setItem('dateFin', this.dateFin.toDateString());
localStorage.setItem('selectedEstado', this.selectedEstado);

const  inicio = moment(this.dateInicio) ;
const fin =  moment(this.dateFin);


// console.log(fin.diff(inicio, 'days'), ' dias de diferencia');

if ( fin.diff(inicio, 'days') > 60) {

this.loading = false;
return ;
}

const user  = localStorage.getItem('token');


this.ordenService.getAllOrderTransport(this.selectedCliente, this.selectedEstado, this.decodedToken.nameid,
this.dateInicio, this.dateFin ).subscribe((list: OrdenServicio[]) => {
this.ordenes =  list;
console.log(this.ordenes);
this.loading = false;

}, (error: any) => {
this.loading = false;
console.log(error);
} , () => {
this.loading = false;
} );
}
// Popup(id: any) {
// const url = this.router.createUrlTree(['/seguimiento/verorden/', id]);
// // tslint:disable-next-line: max-line-length
// window.open(url.toString(), '_blank', 'resizable=no, toolbar=no, scrollbars=no, menubar=no, status=no, directories=no, location=no, width=1000, height=600, left=100, top=100 ' );


// // tslint:disable-next-line: max-line-length
// // window.open("/seguimiento/verorden/" + id,'popUpWindow','height=500,width=500,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes');
// }
exportExcel(): void {
const  inicio = moment(this.dateInicio) ;
const fin =  moment(this.dateFin);


// console.log(fin.diff(inicio, 'days'), ' dias de diferencia');

if ( fin.diff(inicio, 'days') > 60) {

this.loading = false;
return ;
}
// const url = 'http://104.36.166.65/reptwh/tce_ordenes.aspx?clienteid=' + String(this.selectedCliente)
// + '&fecinicio=' + String(this.dateInicio.toLocaleDateString())
// +  '&fecfin=' + this.dateFin.toLocaleDateString()
// +  '&usuarioid=' + String(this.decodedToken.nameid)
// + '&estadoid=' + String(this.selectedEstado);


// window.open(url);
// import('xlsx').then(xlsx => {
//     const worksheet = xlsx.utils.json_to_sheet( this.ordenes );
//     const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
//     const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
//     this.saveAsExcelFile(excelBuffer, 'ListaOT_');
// });
}
// saveAsExcelFile(buffer: any, fileName: string): void {
// import('file-saver').then(FileSaver => {
// const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
// const EXCEL_EXTENSION = '.xlsx';
// const data: Blob = new Blob([buffer], {
//   type: EXCEL_TYPE
// });
// FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
// });
// }
asignar(): void {

let ids = '';
this.selectedRow.forEach((element: { id: string; }) => {
ids = ids + ',' + element.id;
});

ids = ids.substring(1, ids.length );



this.router.navigate(['mantenimiento/equipotransporte', ids]);
}

createImageFromBlob(image: Blob): void {

const reader = new FileReader();
reader.addEventListener('load', () => {
this.imageToShow = reader.result;
console.log(reader.result);

}, false);

if (image) {
reader.readAsDataURL(image);
}
}
downloadFile(documentoId: number): void {

this.ordenService.downloadDocumento(documentoId).subscribe(
(response: any) => {
const dataType = response.type;
const binaryData = [];
binaryData.push(response);
const downloadLink = document.createElement('a');
downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
// document.body.appendChild(downloadLink);
// downloadLink.click();
this.createImageFromBlob(new Blob(binaryData, {type: dataType}));

// window.open(downloadLink.href);
}
);
}
// getFiles(id: number, event: any, overlaypanel: OverlayPanel) {
// this.ordenService.getAllDocumentos(id).subscribe(list => {
// this.downloadFile(list[2].id);
// overlaypanel.toggle(event);
// });
// }
// verarchivos(id: any) {
// const ref = this.dialogService.open(FileModalComponent, {
// header: 'Visor Fotos',
// width: '30%',
// data : {id }
// });
// }

}


