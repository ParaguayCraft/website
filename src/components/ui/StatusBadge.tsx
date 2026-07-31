interface StatusBadgeProps {
  status: "online" | "offline";
  className?: string;
}

export function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const isOnline = status === "online";

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 text-sm font-medium rounded ${className}`}
    >
      <span
        className={`w-2 h-2 rounded-full ${
          isOnline ? "bg-[#54d255] shadow-[0_0_6px_#54d255]" : "bg-[#8a8f92]"
        }`}
        aria-hidden="true"
      />
      <span className={isOnline ? "text-[#54d255]" : "text-[#8a8f92]"}>
        {isOnline ? "EN LÍNEA" : "DESCONECTADO"}
      </span>
    </span>
  );
}
