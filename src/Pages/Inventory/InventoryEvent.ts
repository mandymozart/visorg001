export type InventoryEventBody = {
  event: InventoryEvent;
};

export type InventoryEvent = {
  eventId: string;
  type: string;
  productId: string;
  quantity: number;
  renter: string;
  fromDate: string;
  toDate: string;
};
