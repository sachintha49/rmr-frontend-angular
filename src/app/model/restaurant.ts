import { Facility } from "./facility";
import { User } from "./user";

export class Restaurant {
    id!: number;
    firstName!: string;
    lastName!: string;
    userName!: string;
    password!: string;
    name!: string;
    description!: string;
    address!: string;
    city!: string;
    cuisines!: string[];
    facilities!: Facility[];
    priceRange!: string;
    openingHours!: string;
    phone!: string;
    avgMealRate!: number;
    email!: string;
    website!: string;
    user!: User;
    lat: number = 6.927079;
    lng: number = 79.861244;
}
