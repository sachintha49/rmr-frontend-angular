import { Menu } from "./menu";
import { Restaurant } from "./restaurant";

export class MenuItem {

  menuItemId!: number;
  name!: string;
  description! : string;
  restaurantId! : number;
  menuId! : number;
  smallPrice! : number;
  mediumPrice! : number;
  largePrice! : number;

}
