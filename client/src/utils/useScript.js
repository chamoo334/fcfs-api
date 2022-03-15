import { useEffect } from 'react';

const useScript = whichScript => {
  useEffect(() => {
    const script = whichScript;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  });
};

export default useScript;
