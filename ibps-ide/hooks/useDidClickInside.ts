import { useRef } from "preact/hooks";

export const useDidClickInside = () => {
  const ref = useRef(null);
  const didClickInside = (e: MouseEvent) => {
    return ref.current && e.target && (ref.current as Node).contains(e.target as Node);
  };

  return { ref, didClickInside };
};
