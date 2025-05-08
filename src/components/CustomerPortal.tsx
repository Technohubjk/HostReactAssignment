import React, { useState, useEffect } from 'react';

interface Customer {
  id: number;
  name: string;
  title: string;
  email: string;
  phone: string;
  address: string;
  photos: string[];
}

const CustomerList = ({ customers, onSelect, selectedCustomerId }: { customers: Customer[]; onSelect: (customer: Customer) => void, selectedCustomerId: number | null }) => {
  return (
    <div className="col-md-4">
      <h2>CustomersSH</h2>
      <ul className="list-group">
        {customers.map((customer) => (
          <li
            key={customer.id}
            className={`list-group-item ${selectedCustomerId === customer.id ? 'border-primary' : ''}`}
            onClick={() => onSelect(customer)}
            style={{ cursor: 'pointer', border: selectedCustomerId === customer.id ? '2px solid blue' : 'none' }}
          >
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{customer.name}</h5>
                <p className="card-text">{customer.title}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const CustomerDetails = ({ customer }: { customer: Customer }) => {
  const [photos, setPhotos] = useState<string[]>(customer.photos);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch('https://picsum.photos/v2/list?limit=9');
        const data = await response.json();
        const newPhotos = data.map((photo: any) => photo.download_url);
        setPhotos(newPhotos);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };

    const interval = setInterval(() => {
      fetchPhotos();
    }, 10); // Update photos every 10 seconds

    fetchPhotos(); // Initial fetch

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [customer]);

  return (
    <div className="col-md-8">
      <h2>Customer Details</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Name: {customer.name}</h5>
          <p className="card-text">Email: {customer.email}</p>
          <p className="card-text">Phone: {customer.phone}</p>
          <h5 className="card-title">About the Customer</h5>
          <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.</p>
          <h5 className="card-title">Photos</h5>
          <div className="row">
            {photos.map((photo, index) => (
              <div key={index} className="col-md-4">
                <img src={photo} alt={`Photo ${index + 1}`} className="img-fluid" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const CustomerPortal: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    // Fetch customers data from API or mock data
    const customersData = Array.from({ length: 1000 }, (_, index) => ({
      id: index + 1,
      name: `Customer ${index + 1}`,
      title: `Title ${index + 1}`,
      email: `customer${index + 1}@example.com`,
      phone: `123-456-789${index}`,
      address: `Address ${index + 1}`,
      photos: Array.from({ length: 9 }, () => `https://picsum.photos/200/300?random&t=${Date.now() + index}`),
    }));
    setCustomers(customersData);
  }, []);

  const handleCustomerSelect = (customer: Customer) => {
    setSelectedCustomer(customer);
  };

  return (
    <div>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
      />
      <div className="container">
        <div className="row">
          <CustomerList customers={customers} onSelect={handleCustomerSelect} selectedCustomerId={selectedCustomer?.id || null} />
          {selectedCustomer && (
            <CustomerDetails customer={selectedCustomer} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerPortal;