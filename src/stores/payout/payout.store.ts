import { create } from 'zustand';

interface PayoutState {
  currentStep: number;
  payoutType: string;
  bankAccountHolder: string;
  accountType: string;
  // ownerAccountName: { firstName: string; lastName: string };
  ownerAccountName: string;
  bank: string;
  accountTypeBank: string;
  accountNumber: string;

  onPayoutType: (value: string) => void;
  onSetBankAccountHolder: (value: string) => void;
  onSetAccountType: (value: string) => void;
  onSetOwnerAccountName: (value: string) => void;
  setCurrentStep: (step: number) => void;
  setBank: (value: string) => void;
  setAccountTypeBank: (value: string) => void;
  setAccountNumber: (value: string) => void;
  resetStepOne: () => void;
  resetStepTwo: () => void;
  resetAll: () => void;
}

export const usePayoutStore = create<PayoutState>()((set) => ({
  currentStep: 0,
  payoutType: '',
  bankAccountHolder: '',
  accountType: 'personal',

  ownerAccountName: '',
  bank: '',
  accountTypeBank: '',
  accountNumber: '',

  onPayoutType: (value: string) => set((_) => ({ payoutType: value })),
  onSetBankAccountHolder: (value: string) =>
    set((_) => ({ bankAccountHolder: value })),

  onSetAccountType: (value: string) => set((_) => ({ accountType: value })),
  onSetOwnerAccountName: (value: string) =>
    set((_) => ({ ownerAccountName: value })),

  setCurrentStep: (step) => set({ currentStep: step }),
  setBank: (bank: string) => set((_) => ({ bank })),
  setAccountTypeBank: (accountTypeBank: string) =>
    set((_) => ({ accountTypeBank })),
  setAccountNumber: (accountNumber: string) => set((_) => ({ accountNumber })),

  resetStepOne: () =>
    set((state) => ({
      payoutType: '',
      bankAccountHolder: '',
      accountType: '',
      ownerAccountName: '',
    })),
  resetStepTwo: () =>
    set((state) => ({
      bankAccountHolder: '',
      accountType: '',
      ownerAccountName: '',
    })),

  resetAll: () =>
    set((_) => ({
      currentStep: 0,
      payoutType: '',
      bankAccountHolder: '',
      accountType: 'personal',

      ownerAccountName: '',
      bank: '',
      accountTypeBank: '',
      accountNumber: '',
    })),
}));
