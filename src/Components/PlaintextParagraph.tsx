import React from "react";

type Props = {
  text?: string;
};
const PlaintextParagraph = ({ text }: Props) => {
  if (!text) return <></>;
  return (
    <p>
      {text?.split("\n").map((line, index) => (
        <span key={index}>
          {line}
          <br />
        </span>
      ))}
    </p>
  );
};

export default PlaintextParagraph;
