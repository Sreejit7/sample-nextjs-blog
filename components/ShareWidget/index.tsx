import React from "react";

type Props = {
  icon: React.ReactNode;
  text: string;
};
const ShareWidget = ({ icon, text }: Props) => {
  return (
    <span
      role="button"
      className="button p-3 w-full flex items-center gap-2 text-center cursor-pointer transition duration-700 hover:bg-slate-200"
    >
      <span>{icon}</span>
      <p className="font-medium">{text}</p>
    </span>
  );
};

export default ShareWidget;
