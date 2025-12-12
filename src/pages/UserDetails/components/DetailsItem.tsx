import type { FC } from "react";

interface IDetailsItems {
  label: string;
  value: string;
  href?: string;
  isExternal?: boolean;
}

const DetailsItem: FC<IDetailsItems> = ({ label, value, href, isExternal }) => (
  <div className="flex flex-col sm:flex-row sm:items-baseline border-b border-slate-50 pb-3 last:border-0">
    <span className="text-sm font-semibold text-slate-400 w-24 uppercase tracking-wide">
      {label}
    </span>
    {href ? (
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel="noreferrer"
        className="text-lg text-blue-600 hover:underline font-medium break-all"
      >
        {value}
      </a>
    ) : (
      <span className="text-lg text-slate-700 font-medium">{value}</span>
    )}
  </div>
);

export default DetailsItem;
