import {useState, useEffect} from 'react';

const maybeWindow = typeof window !== 'undefined' ? window : null;
const maybeDocument = typeof document !== 'undefined' ? document : null;

const useMobileLayout = () => {
  const [isMobile, setMobile] = useState(maybeDocument && maybeDocument.documentElement.clientWidth < 768);

  const updateMedia = () => {
    setMobile(maybeDocument && maybeDocument.documentElement.clientWidth < 768);
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
