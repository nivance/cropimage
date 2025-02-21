import { Adsense } from "@ctrl/react-adsense";
import React from "react";

const AdBlock = () => {
  return (
    <Adsense
      client="ca-pub-7420123397062174"
      slot="6989466712"
      format="display"
      responsive="true"
      layoutKey="33"
      style={{ display: "block" }}
    ></Adsense>
  );
};

export default AdBlock;