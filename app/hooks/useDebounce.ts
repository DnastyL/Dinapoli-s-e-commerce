import { useEffect, useMemo, useRef } from "react";
import debounce from "lodash/debounce";

export const useDebounce = <T>(
  callback: (query?: T) => void,
  delay: number
) => {
  const ref = useRef(callback);

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const debouncedCallback = useMemo(() => {
    const func = (query?: T) => {
     
      ref.current?.(query);
    };

    return debounce(func, delay);
  }, [delay]);

  return debouncedCallback;
};
