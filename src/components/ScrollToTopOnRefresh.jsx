import { useEffect } from 'react';

function ScrollToTopOnRefresh() {
  useEffect(() => {
    const onBeforeUnload = () => {
      window.scrollTo(0, 0);
    };

    window.addEventListener('beforeunload', onBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload);
    };
  }, []);

  return null;
}

export default ScrollToTopOnRefresh;
