type Props = {
  name: string;
  size?: "sm" | "md" | "lg";
};

const sizes = { sm: "w-7 h-7 text-[10px]", md: "w-9 h-9 text-[12px]", lg: "w-13 h-13 text-[16px]" };

function initials(name: string) {
  return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
}

export default function Avatar({ name, size = "md" }: Props) {
  return (
    <div className={`${sizes[size]} rounded-full bg-c4 flex items-center justify-center
      font-extrabold text-sidebar shrink-0`}>
      {initials(name)}
    </div>
  );
}