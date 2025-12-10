import { Types } from "mongoose";

export interface IInventory {
    supplier: Types.ObjectId;

    todayFuelLoad: number;
    remainingFuelPreviousDay: number;
    todayAvailableFuel: number;
    todayFuelDelivery: number;
    todayFuelRevenue: number;

    todayDieselLoad: number;
    remainingDieselPreviousDay: number;
    todayDieselDelivery: number;
    todayAvailableDiesel: number;
    todayDieselRevenue: number;
}

export interface ILoadFuel {
  todayFuelLoad?: string ;
  todayDieselLoad?: string;
  fuelType: string;
  profileId: string;
}


type FuelType = "fuel" | "diesel";
export type TimeRange = "this-week" | "this-month" | "this-year";

export interface IInventoryQuery {
  supplierId: string;
  fuelType: FuelType;
  time: TimeRange;
}


