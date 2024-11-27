import React from 'react';
import PhoneCard from './PhoneCard';

const PhoneList = ({ phones }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {phones.map(phone => (
        <PhoneCard key={phone.id} phone={phone} />
      ))}
    </div>
  );
};

export default PhoneList;
