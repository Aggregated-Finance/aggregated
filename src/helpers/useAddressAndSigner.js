import { useState, useEffect } from 'react';

export function useANS(shouldChange, change) {
  const [ address, signer, setAddress, setSigner ] = useState(null);

  function handleChange(changeTo) {
    setAddress(changeTo.address);
    setSigner(changeTo.signer);
  }

  useEffect(() => {
    if (shouldChange) {
      handleChange(change);
    }
  });

  return { address, signer };
}
