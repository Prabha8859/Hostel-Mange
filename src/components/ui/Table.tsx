// components/ui/Table.tsx
type TableProps = {
  headers: string[];
  data: (string | number)[][];
};

export default function Table({ headers, data }: TableProps) {
  return (
    <div className="bg-white dark:bg-white/5 border-[1.5px] border-c3/30 dark:border-white/10
      rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-c1 dark:bg-white/5 border-b-[1.5px] border-c3/30">
              {headers.map((h, i) => (
                <th key={i} className="px-4 py-3 text-left text-[10px] font-extrabold text-gray-400
                  uppercase tracking-[0.8px] whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="border-b border-c3/10 last:border-none
                hover:bg-c4/5 hover:translate-x-0.5 transition-all cursor-pointer group">
                {row.map((cell, j) => (
                  <td key={j} className="px-4 py-3 text-[13px] font-bold text-sidebar dark:text-white">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}