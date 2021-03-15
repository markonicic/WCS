export interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: string;
  doctor: number;
  vatCode: string;
  addresses: [
    {
      type: string;
      name: string;
      street: string;
      email: string;
      phone: string;
      city: string;
      country: string;
      zipCode: number;
    }
  ];
}
