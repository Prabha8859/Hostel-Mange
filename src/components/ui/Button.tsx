// components/ui/Button.tsx
type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

export default function Button({ children, onClick, className = "" }: Props) {
  return (
    <button
      onClick={onClick}
      className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors ${className}`}
    >
      {children}
    </button>
  );
}