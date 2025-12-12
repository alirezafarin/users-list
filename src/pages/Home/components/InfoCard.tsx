import type { FC } from "react";

interface IInfoRow {
  icon: string;
  text: string;
}

const InfoRow: FC<IInfoRow> = ({ icon, text }) => (
  <div className="flex items-center gap-3 text-slate-600">
    <span className="opacity-60 text-base" aria-hidden="true">
      {icon}
    </span>
    <span className="truncate">{text}</span>
  </div>
);

export default InfoRow;
