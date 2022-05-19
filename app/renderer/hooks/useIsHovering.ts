import { RefObject, useEffect, useState } from "react";

const useIsHovering = (ref: RefObject<HTMLElement>) => {
  const [isHovering, setIsHovering] = useState(false);
  useEffect(
    () => {
      const onMouseEnter = (_event: MouseEvent ) => {
        setIsHovering(true);
      };
      const onMouseLeave = (_event: MouseEvent) => {
        setIsHovering(false);
      }
      ref.current?.addEventListener("mouseenter", onMouseEnter);
      ref.current?.addEventListener("mouseleave", onMouseLeave);
      return () => {
        ref.current?.removeEventListener("mouseenter", onMouseEnter);
        ref.current?.removeEventListener("mouseleave", onMouseLeave);
      };
    },

    [ref]
  );
  return isHovering;
}

export default useIsHovering;