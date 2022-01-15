export type InventoryEventBody = {
  event: InventoryEvent;
};

export type InventoryEvent = {
  eventId: string;
  type: string;
  productId: string;
  quantity: number;
  renter: string | undefined;
  fromDate: string;
  toDate: string;
};
