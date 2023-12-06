import {useState, useEffect} from 'react';

const maybeWindow = typeof window !== 'undefined' ? window : null;
const maybeDocument = typeof document !== 'undefined' ? document : null;

export const isMobileLayout = () => {
  return maybeDocument && maybeDocument.documentElement.clientWidth < 768;
};

const useMobileLayout = () => {
  const [isMobile, setMobile] = useState(isMobileLayout());

  const updateMedia = () => {
    setMobile(isMobileLayout());
  };

  useEffect(() => {
    if (!maybeWindow) {
      return;
    }
    maybeWindow.addEventListener('resize', updateMedia);
    return () => maybeWindow.removeEventListener('resize', updateMedia);
  });

  return isMobile;
};

export default useMobileLayout;
