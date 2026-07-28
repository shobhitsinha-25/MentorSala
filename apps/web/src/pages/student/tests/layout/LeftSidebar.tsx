import type { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

const LeftSidebar = ({ children }: Props) => {
  return (
    <section className="flex-1 overflow-auto bg-white p-6 text-black">
      {children}
    </section>
  );
};

export default LeftSidebar;