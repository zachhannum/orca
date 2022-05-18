import { useEffect } from "react";

const useOnWheel = (handler: (event: WheelEvent) => void) => {
  useEffect(
    () => {
      const listener = (event: WheelEvent) => {
        handler(event);
      };
      document.addEventListener("wheel", listener);
      return () => {
        document.removeEventListener("wheel", listener);
      };
    },

    [handler]
  );
}

export default useOnWheel;