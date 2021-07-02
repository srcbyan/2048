import React from "react";
import { getColors } from "./util";

const Block = ({ num }) => {
  return (
    <div
      style={{ background: getColors(num) }}
      className="h-28 w-28 flex justify-center items-center text-3xl font-extrabold text-white m-1"
    >
      {num !== 0 ? num : ""}
    </div>
  );
};

export default Block;
