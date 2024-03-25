import { MenuItem } from './menuItem';
import { Restaurant } from './restaurant';

export class RestaurantMenuItem {

  id!: number;
  restaurant : Restaurant = new Restaurant();
  menuItem : MenuItem = new MenuItem();
  smallPrice! : number;
  mediumPrice! : number;
  largePrice! : number;
  averageRate! : number;
  averageRecommend! : number;
  averageReview! : number;
  averageFinal! : number;
  //name!: string;
  //description! : string;
  //restaurantId! : number;
  //menuId! : number;
  //menu : Menu = new Menu();

}
