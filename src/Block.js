import React from "react";
import { getColors } from "./util";

const Block = ({ num }) => {
  return (
    <div
      style={{ background: getColors(num) }}
      className="h-14 w-16 flex justify-around items-center text-3xl font-extrabold text-white m-1 md:h-28 md:w-28"
    >
      {num !== 0 ? num : ""}
    </div>
  );
};

export default Block;
