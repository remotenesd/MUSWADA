import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";

const Docs = ({ route, gotoRoute }) => {
  // DIGITAL SIGNING HELP FILE
  const [goto, setGoto] = useState("");

  if (goto !== "") {
    return gotoRoute(goto);
  }

  return (
    <>
      <h3>DOCS : AN INSIGHT INTO MUSWADA'S TECH</h3>
      <h5>
        <i>
          Discover the key technologies that govern the mechanism of MUSWADA.
        </i>
      </h5>
      <ul className="list-group">
        <li
          className="list-group-item text-dark"
          onClick={() => gotoRoute("docs/asymetric")}
        >
          Asymetric encryption
        </li>
        <li
          className="list-group-item text-dark"
          onClick={() => gotoRoute("docs/digitalsignatures")}
        >
          Digital Signatures
        </li>
        <li className="list-group-item darkColor" onClick={() => gotoRoute("")}>
          Back Home.
        </li>
      </ul>
    </>
  );
};

export default Docs;
