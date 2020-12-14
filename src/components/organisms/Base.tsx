import React from "react";
import { Header } from "@Components/molecules/Header";
import { Footer } from "@Components/molecules/Footer";

interface BaseProps {
  title?: string;
}

const Base: React.FC<BaseProps> = ({ title, children }) => {
  return (
    <div className="min-h-screen p-12 bg-gray-50 dark:bg-gray-900">
      <Header title={title} />
      <div className="container mx-auto my-12">{children}</div>
      <Footer />
    </div>
  );
};

export default Base;
