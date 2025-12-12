import type { FC } from "react";

interface IDetailsBadge {
  children: React.ReactNode;
}

const DetailsBadge: FC<IDetailsBadge> = ({ children }) => (
  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium border border-white/10">
    {children}
  </span>
);

export default DetailsBadge;
