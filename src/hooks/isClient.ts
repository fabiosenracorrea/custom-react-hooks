import { useEffect, useState } from 'react';

/*
 * Yes, we want an extra render on the client with this hook
 * Use `useSsr' if you dont need the extra render.
 */
function useIsClient(): boolean {
  const [isClient, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  return isClient;
}

export default useIsClient;
