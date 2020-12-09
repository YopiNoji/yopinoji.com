import React from "react";
import { Footer } from "@Components/molecules/Footer";

const Base: React.FC = ({ children }) => {
  return (
    <div className="min-h-screen m-12">
      <div className="container mx-auto my-12">{children}</div>
      <Footer />
    </div>
  );
};

export default Base;
