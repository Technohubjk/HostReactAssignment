import React from 'react';

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface CustomerDetailsProps {
  customer: Customer;
}

const CustomerDetails: React.FC<CustomerDetailsProps> = ({ customer }) => {
  return (
    <div>
      <h2>Customer Details</h2>
      <p>Name: {customer.name}</p>
      <p>Email: {customer.email}</p>
      <p>Phone: {customer.phone}</p>
    </div>
  );
};

export default CustomerDetails;