export interface IEmailPreference {
  id?: string;
  welcomeEmail?: boolean;
  itemListedConfirmation?: boolean;
  offerReceived?: boolean;
  itemSold?: boolean;
  shipmentReminder?: boolean;
  paymentConfirmation?: boolean;
  purchaseConfirmation?: boolean;
  shippingUpdate?: boolean;
  receiptConfirmationReminder?: boolean;
  ratingRequest?: boolean;
  newsletter?: boolean;
}
