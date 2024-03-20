import { create } from 'zustand';

interface PayoutState {
  currentStep: number;
  payoutType: string;
  bankAccountHolder: string;
  accountType: string;
  ownerAccountName: { firstName: string; lastName: string };

  onPayoutType: (value: string) => void;
  onSetBankAccountHolder: (value: string) => void;
  onSetAccountType: (value: string) => void;
  onSetOwnerAccountName: (firstName: string, lastName: string) => void;
  setCurrentStep: (step: number) => void;
  resetStepOne: () => void;
  resetStepTwo: () => void;
}

export const usePayoutStore = create<PayoutState>()((set) => ({
  currentStep: 0,
  payoutType: '',
  bankAccountHolder: '',
  accountType: '',
  ownerAccountName: { firstName: '', lastName: '' },

  onPayoutType: (value: string) => set((_) => ({ payoutType: value })),
  onSetBankAccountHolder: (value: string) =>
    set((_) => ({ bankAccountHolder: value })),

  onSetAccountType: (value: string) => set((_) => ({ accountType: value })),
  onSetOwnerAccountName: (firstName: string, lastName: string) =>
    set((_) => ({ ownerAccountName: { firstName, lastName } })),

  setCurrentStep: (step) => set({ currentStep: step }),
  
  resetStepOne: () =>
    set((state) => ({
      payoutType: '',
      bankAccountHolder: '',
      accountType: '',
      ownerAccountName: { firstName: '', lastName: '' },
    })),
  resetStepTwo: () =>
    set((state) => ({
      bankAccountHolder: '',
      accountType: '',
      ownerAccountName: { firstName: '', lastName: '' },
    })),
}));
