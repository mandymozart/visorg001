import { css } from "@emotion/react";
import React from "react";
import { ClockLoader } from "react-spinners";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: var(--color);
  color: var(--color);
`;

const Loader = ({size = 48}) => {
  return <ClockLoader color={"var(--color)"} css={override} size={size} />;
};

export const PageLoader = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
      }}
    >
      <Loader />
    </div>
  );
};

export default Loader;
