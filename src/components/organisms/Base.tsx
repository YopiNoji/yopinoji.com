import React from "react";
import { Header } from "@Components/molecules/Header";
import { Footer } from "@Components/molecules/Footer";

interface BaseProps {
  title?: string;
}

const Base: React.FC<BaseProps> = ({ title, children }) => {
  return (
    <div className="min-h-screen py-12 px-14 bg-white dark:bg-black">
      <Header title={title} />
      <div className="container">{children}</div>
      <Footer />
    </div>
  );
};

export default Base;
