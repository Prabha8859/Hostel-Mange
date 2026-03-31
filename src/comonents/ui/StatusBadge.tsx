type Props = {
  value: string;
  type: "status" | "fees";
};

const config: Record<string, string> = {
  Active:  "bg-emerald-50 text-emerald-700 border-emerald-200",
  Left:    "bg-red-50 text-red-600 border-red-200",
  Paid:    "bg-emerald-50 text-emerald-700 border-emerald-200",
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
};

export default function StatusBadge({ value }: Props) {
  return (
    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border inline-block
      ${config[value] ?? "bg-gray-100 text-gray-500 border-gray-200"}`}>
      {value}
    </span>
  );
}