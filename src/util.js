import { useEffect } from "react";

export const useEvent = (event, handler, passive = false) => {
  useEffect(() => {
    window.addEventListener(event, handler, passive);
    return function cleanup() {
      window.removeEventListener(event, handler);
    };
  });
};

export const getColors = (num) => {
  switch (num) {
    case 2:
      return "#831843";
    case 4:
      return "#9D174D";
    case 8:
      return "#BE185D";
    case 16:
      return "#DB2777";
    case 32:
      return "#EC4899";
    case 64:
      return "#F472B6";
    case 128:
      return "#8B5CF6";
    case 256:
      return "#7C3AED";
    case 512:
      return "#6D28D9";
    case 1024:
      return "#5B21B6";
    case 2048:
      return "#4C1D95";
    case 4069:
      return "#3730A3";
    case 8165:
      return "#4338CA";
    default:
      return "#FCA5A5";
  }
};
