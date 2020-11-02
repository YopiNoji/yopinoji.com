import React from "react";
import { Footer } from "@Components/molecules/Footer";

type PropsType = {
  children: React.ReactNode;
};

const Base: React.FC<PropsType> = (props) => {
  return (
    <div className="min-h-screen m-12">
      <div className="container mx-auto my-12">{props.children}</div>
      <Footer />
    </div>
  );
};

export default Base;
