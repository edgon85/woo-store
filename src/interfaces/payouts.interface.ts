export interface PayoutMethod {
  id: string;
  accountNumber: string;
  accountType: string;
  accountTypeBank: string;
  bank: string;
  bankAccountHolder: string;
  ownerAccountName: string;
  payoutType: string;
  isDefault: boolean;
  isVerified: boolean;
  createdAt?: Date;
}
