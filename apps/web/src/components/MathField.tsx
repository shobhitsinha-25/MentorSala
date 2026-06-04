import React, { useEffect, useRef } from "react";
import "mathlive";


interface Props {
  value: string;
  onChange: (value: string) => void;
}

const MathField = ({
  value,
  onChange,
}: Props) => {

  const mathRef = useRef<any>(null);

  useEffect(() => {

    const mf = mathRef.current;

    if (!mf) return;

    mf.value = value;

    const handler = () => {
      onChange(mf.value);
    };

    mf.addEventListener(
      "input",
      handler
    );

    return () => {
      mf.removeEventListener(
        "input",
        handler
      );
    };

  }, [value, onChange]);

 return React.createElement(
  "math-field",
  {
    ref: mathRef,
    style: {
      width: "100%",
      minHeight: "48px",
      background: "#1e293b",
      color: "white",
      borderRadius: "12px",
      padding: "12px",
    },
  }
);
};

export default MathField;