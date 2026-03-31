import type { ReactNode } from "react";

type Props = {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  breadcrumb?: string;
};

export default function PageHeader({ title, subtitle, action, breadcrumb }: Props) {
  return (
    <div className="flex items-center justify-between mb-6 p-5 bg-white dark:bg-white/5 
      rounded-2xl border-[1.5px] border-c3/30 shadow-[0_8px_30px_rgb(0,0,0,0.04)] 
      dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] flex-wrap gap-4">
      <div className="flex-1 min-w-[200px]">
        {breadcrumb && (
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
            {breadcrumb}
          </p>
        )}
        <h1 className="text-[22px] font-extrabold text-sidebar dark:text-white leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-[12px] text-gray-400 font-medium mt-0.5">{subtitle}</p>
        )}
      </div>
      {action && <div className="flex items-center gap-2">{action}</div>}
    </div>
  );
}