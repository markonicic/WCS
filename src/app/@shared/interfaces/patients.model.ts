export interface Patients {
  id: number;
  registeredDate: string;
  firstName: string;
  lastName: string;
  doctor: number;
  addresses: [
    {
      type: string;
      email: string;
      phone: string;
      street: string;
      city: string;
      zipcode: number;
      country: string;
    }
  ];
}
