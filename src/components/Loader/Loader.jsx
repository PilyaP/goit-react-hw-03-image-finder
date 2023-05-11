import { Rings } from 'react-loader-spinner';
import React from 'react';

export const Loader = () => {
  return (
    <div className="Loader">
      <Rings
        height="120"
        width="120"
        color="#4fa94d"
        radius="6"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="rings-loading"
      />
    </div>
  );
};
