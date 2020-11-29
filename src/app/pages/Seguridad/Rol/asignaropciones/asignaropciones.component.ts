import { Injectable, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DownlineTreeviewItem, OrderDownlineTreeviewEventParser
  , TreeviewComponent, TreeviewConfig, TreeviewEventParser, TreeviewHelper, TreeviewItem } from 'ngx-treeview';
import { MessageService } from 'primeng/api';
import { isNil, remove, reverse } from 'lodash';
import { PaginarolMod } from 'src/app/_models/paginarol';
import { RolService } from 'src/app/_services/rol.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
  export class ProductTreeviewConfig extends TreeviewConfig {
      hasAllCheckBox = true;
      hasFilter = true;
      hasCollapseExpand = false;
      maxHeight = 400;
}

@Component({
  selector: 'app-asignaropciones',
  templateUrl: './asignaropciones.component.html',
  styleUrls: ['./asignaropciones.component.scss'],
  providers: [
    RolService,
    MessageService,
    { provide: TreeviewEventParser, useClass: OrderDownlineTreeviewEventParser },
    { provide: TreeviewConfig, useClass: ProductTreeviewConfig }
  ]
})
export class AsignaropcionesComponent implements OnInit {

  constructor(private rolService: RolService,
              private activatedRoute: ActivatedRoute,
              private messageService: MessageService,
              private spinner: NgxSpinnerService,
              private router: Router) {
}

    @ViewChild(TreeviewComponent, { static: false }) treeviewComponent!: TreeviewComponent;


    dropdownEnabled = true;
    items: TreeviewItem[] = [];
    siblings: TreeviewItem[] | undefined;
    menu: TreeviewItem | undefined;
    values: number[] | undefined;
    rows: string[] = [];
    model: PaginarolMod[] = [];
    paginarol: PaginarolMod| undefined;
    id = 0;

    config = TreeviewConfig.create({
          hasAllCheckBox: true,
          hasFilter: true,
          hasCollapseExpand: true,
          decoupleChildFromParent: false,
          maxHeight: 400
    });

    buttonClasses = [
      'btn-outline-primary',
      'btn-outline-secondary',
      'btn-outline-success',
      'btn-outline-danger',
      'btn-outline-warning',
      'btn-outline-info',
      'btn-outline-light',
      'btn-outline-dark'
    ];

    buttonClass = this.buttonClasses[0];
    onSelectedChange(downlineItems: DownlineTreeviewItem[]): any {
this.rows = [];
downlineItems.forEach(downlineItem => {
      const item = downlineItem.item;
      const value = item.value;
      const texts = [item.text];
      let parent = downlineItem.parent;
      while (!isNil(parent)) {
          texts.push(parent.item.text);
          parent = parent.parent;
      }
      const reverseTexts = reverse(texts);

      const row = `${reverseTexts.join(' -> ')} : ${value}`;
      this.rows.push(item.value);
    });
}
removeItem(item: TreeviewItem): any {
  let isRemoved = false;
  for (const tmpItem of this.items) {
      if (tmpItem === item) {
              remove(this.items, item);
          } else {
              isRemoved = TreeviewHelper.removeItem(tmpItem, item);
              if (isRemoved) {
                  break;
              }
      }
  }

  if (isRemoved) {
      this.treeviewComponent.raiseSelectedChange();
      }
  }

ngOnInit(): void {
    this.id  = this.activatedRoute.snapshot.params.uid;

    this.rolService.getPaginas(this.id).subscribe(list => {

    const primary = list;


    this.items = [] ;
    primary.forEach(element => {
        element.children.forEach(x => {
          x.checked =  (x.check === true ? true : false);
        });

    });

    primary.forEach(element => {
        if (element.children.length !== 0)
        {


          this.menu =  new TreeviewItem({
              text: element.text
            , value: element.value
            , check: false
            , checked:  false // (element.check == true ? true: false)
            , children: []  = element.children

          });

          this.items.push(this.menu);
        }
    });
});



}
cancel(): void{
this.router.navigate(['/seguridad/listaroles']);
}
save(row: any): void{

this.spinner.show();
this.model = [];
row.forEach((element: any) => {
    this.model.push({ idPagina: element,
    idRol: this.id,
    permisos: 'AME' } );
});

this.rolService.savePaginas(this.model,  this.id   ).subscribe(() => {

      }, (error: any) => {
            this.messageService.add({severity: 'error', summary: 'Error', detail: error});
      }, () => {
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Se registró correctamente'});
          this.spinner.hide();
          this.router.navigate(['/seguridad/listaroles']);
      });
    }
}

