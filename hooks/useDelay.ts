import { useEffect, useRef, useState } from 'react';

const useDelay = (callback: Function, timer: number) => {
  const [params, setParams] = useState<any[]>([]);
  const timePointer = useRef<number | null>(null);
  const firstLoad = useRef(false);

  const setDelayContent = (...params: any[]) => {
    setParams(params);
  };

  useEffect(() => {
    if (!firstLoad.current) {
      firstLoad.current = true;
      return;
    }

    if (timePointer.current) clearTimeout(timePointer.current);

    timePointer.current = setTimeout(() => callback(...params), timer);
  }, [params]);

  return {
    setDelayContent,
  };
};

export default useDelay;
