import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MenuServiceService } from '../service/menu-service.service';
import { MenuItem } from '../model/menuItem';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TableElement } from '../model/menuItemTableData';
import { MatIconModule } from '@angular/material/icon';

const ELEMENT_DATA: TableElement[] = [
  { column1: 'Data 1', column2: 'Data 2', column3: 'Data 3', column4: 'Data 4' },
  // Add more data as needed
];

@Component({
  selector: 'app-manage-rest-menu-item',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, MatTableModule, MatIconModule],
  templateUrl: './manage-rest-menu-item.component.html',
  styleUrl: './manage-rest-menu-item.component.css'
})

export class ManageRestMenuItemComponent {

  dataSource = new MatTableDataSource<TableElement>(ELEMENT_DATA);
  displayedColumns = ['column1', 'column2', 'column3', 'column4', 'column5'];
  
  constructor(public dialog: MatDialog) {}

  
  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: './dialog-content-example-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule],
})
export class DialogContentExampleDialog implements OnInit{
  toppings = new FormControl('');
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  menuItems: MenuItem[] = [];
  restaurantId! : number;
  
  constructor(private menuService : MenuServiceService, private route: ActivatedRoute) { }
  
  menuItemForm: FormGroup = new FormGroup({
    manuItem: new FormControl(''),
    largePrice: new FormControl(''),
    mediumPrice: new FormControl(''),
    smallPrice: new FormControl('')
  })


  ngOnInit() {
    this.restaurantId = this.route.snapshot.params['id'];
    this.getMenus();
  }

  public getMenus() {
    this.menuService.getMenuAllItems()
    .subscribe( data => {
          this.menuItems = data;
        });
  }

  addMenuItem() {
    alert(this.restaurantId);
    return;
    const menuItem: MenuItem = new MenuItem();
    menuItem.largePrice = this.menuItemForm.value.largePrice;
    menuItem.mediumPrice = this.menuItemForm.value.mediumPrice;
    menuItem.smallPrice = this.menuItemForm.value.smallPrice;
    menuItem.menuItemId = parseInt(this.menuItemForm.value.manuItem.id);
   // menuItem.menuId = this.menuItemForm.value.menuItem.menu.id;
    console.log(menuItem);
   /*  this.restaurantService.addRestaurant(restaurant)
      .subscribe(data => {
        alert("Restaurant has been saved successfully!");
        console.log("response", data);
      }) */
  }
}
