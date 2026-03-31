export default function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white/75 dark:bg-white/5 backdrop-blur-xl
      border border-white/60 dark:border-white/10 rounded-2xl p-5
      hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-200
      ${className}`}>
      {children}
    </div>
  );
}