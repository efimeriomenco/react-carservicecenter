export enum EnquiryStatus {
  Empty,
  Submitted,
  Booked,
  Rejected,
}

export type EnquiryModel = {
  id: number;
  customerDetails: {
    firstName: string;
    lastName: string;
    emailAddress: string;
    phoneNumber: string;
  };
  carDetails: {
    model: string;
    year: number;
    descriptionOfTheProblem: string;
  };
  status: EnquiryStatus;
};

export interface EnquiryModalProps {
  enq: EnquiryModel;
  modalIsOpen: boolean;
  onClose: () => void;
}
