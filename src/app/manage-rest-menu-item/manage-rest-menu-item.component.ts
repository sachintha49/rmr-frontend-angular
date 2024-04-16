import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MenuServiceService } from '../service/menu-service.service';
import { MenuItem } from '../model/menuItem';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TableElement } from '../model/menuItemTableData';
import { MatIconModule } from '@angular/material/icon';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RestaurantMenuItem } from '../model/menu-item';

/* child compeont */
@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: './dialog-content-example-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule],
})
export class DialogContentExampleDialog implements OnInit {
  @Output() menuItemAdded = new EventEmitter<void>();

  toppings = new FormControl('');
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  menuItems: MenuItem[] = [];
  restaurantId!: number;

  constructor(private menuService: MenuServiceService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  menuItemForm: FormGroup = new FormGroup({
    menuItem: new FormControl(''),
    largePrice: new FormControl(''),
    mediumPrice: new FormControl(''),
    smallPrice: new FormControl('')
  })


  ngOnInit() {
    this.restaurantId = this.data.id;
    this.getMenus();
  }

  public getMenus() {
    this.menuService.getMenuAllItems()
      .subscribe(data => {
        this.menuItems = data;
        console.log(this.menuItems);
      });
  }

  addMenuItem() {
    const menuItem: MenuItem = new MenuItem();
    menuItem.menuItemId = this.menuItemForm.value.menuItem.id;
    menuItem.menuId = this.menuItemForm.value.menuItem.menu.id;
    menuItem.restaurantId = parseInt(this.restaurantId.toString());
    menuItem.smallPrice = this.menuItemForm.value.smallPrice;
    menuItem.mediumPrice = this.menuItemForm.value.mediumPrice;
    menuItem.largePrice = this.menuItemForm.value.largePrice;

    console.log(menuItem)
    this.menuService.addMenuItem(menuItem)
      .subscribe(data => {
        alert("Menu Item has been saved successfully!");
        console.log("response", data);
        this.menuItemAdded.emit();
      })

  }
}


@Component({
  selector: 'app-manage-rest-menu-item',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, MatTableModule, MatIconModule],
  templateUrl: './manage-rest-menu-item.component.html',
  styleUrl: './manage-rest-menu-item.component.css'
})

export class ManageRestMenuItemComponent implements OnInit {

  ELEMENT_DATA: TableElement[] = [];
  dataSource = new MatTableDataSource<TableElement>(this.ELEMENT_DATA);
  displayedColumns = ['column1', 'column2', 'column3', 'column4', 'column5'];
  restaurantId!: number;
  menuItemsList: RestaurantMenuItem[] = [];
  @ViewChild(DialogContentExampleDialog) dialogContentExampleDialog!: DialogContentExampleDialog;
  constructor(public dialog: MatDialog, private activatedRoute: ActivatedRoute, private menuService: MenuServiceService) {
  }

  ngOnInit(): void {
    this.getRestaurantMenuItems();
  }

  getRestaurantMenuItems(): void {
    const restaurantId = parseInt(this.activatedRoute.snapshot.paramMap.get('id')!);
    this.menuService.getMenuItemsAccordingToRestaurantId(restaurantId)
      .subscribe(data => {
        this.menuItemsList = data;
        this.updateElementData(); // Update ELEMENT_DATA after fetching data
      });
  }

  updateElementData(): void {
    if (this.menuItemsList.length > 0) {
      this.ELEMENT_DATA = []; // Clear existing data
      for (const item of this.menuItemsList) {
        this.ELEMENT_DATA.push({
          menuItem: item.menuItem.description?.toString() || '',
          largePrice: item.largePrice ? item.largePrice.toString() : '',
          mediumPrice: item.mediumPrice ? item.mediumPrice.toString() : '',
          smallPrice: item.smallPrice ? item.smallPrice.toString() : ''
        });
      }
      this.dataSource.data = this.ELEMENT_DATA; // Update data source
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog, {
      data: {
        id: this.activatedRoute.snapshot.paramMap.get('id')
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getRestaurantMenuItems();
    });
  }
}


