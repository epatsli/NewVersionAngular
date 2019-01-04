export interface Order {
  id: number;
  dishIds: number[];
  amountDish: number[];
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  city: string;
  zipCode: string;
  street: string;
  houseNumber: string;
  price: number;
  status: string;
}
