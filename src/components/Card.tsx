import type { ReactNode } from "react";

const Card = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <article
    className={`
      group relative flex flex-col justify-between 
      bg-white rounded-2xl border border-slate-100 
      shadow-sm hover:shadow-md hover:border-blue-100
      transition-all duration-300 ease-out
      active:scale-[0.99] touch-manipulation
      ${className}
    `}
  >
    {children}
  </article>
);

const Header = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="p-5 pb-2">
    <h3 className="text-lg font-bold text-slate-800 tracking-tight group-hover:text-blue-600 transition-colors">
      {title}
    </h3>
    {subtitle && (
      <p className="text-sm font-medium text-slate-500 mt-1">{subtitle}</p>
    )}
  </div>
);

const Body = ({ children }: { children: ReactNode }) => (
  <div className="px-5 py-2 text-slate-600 leading-relaxed text-sm flex-grow">
    {children}
  </div>
);

const Footer = ({ children }: { children: ReactNode }) => (
  <div className="p-5 pt-3 border-t border-slate-50 mt-2 bg-slate-50/50 rounded-b-2xl">
    {children}
  </div>
);

Card.Header = Header;
Card.Body = Body;
Card.Footer = Footer;

export default Card;
