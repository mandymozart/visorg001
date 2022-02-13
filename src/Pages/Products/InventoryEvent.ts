export type InventoryEventBody = {
  event: InventoryEvent;
};

export enum InventoryEventType {
  RESERVATION = "reservation",
  PICKUP = "pickup",
  RETURN = "return",
}

export enum InventoryEventStatus {
  OK = "ok",
  REVIEW = "review",
}

export type InventoryEvent = {
  eventId: string;
  type: InventoryEventType;
  productId: string;
  quantity: number;
  renter: string; // wallet address
  fromDate: string;
  toDate: string;
  lastUpdate: string;
  status: InventoryEventStatus;
};
