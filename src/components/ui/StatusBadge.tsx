type StatusType = "online" | "offline" | "unavailable";

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const labelMap: Record<StatusType, string> = {
  online: "EN LÍNEA",
  offline: "DESCONECTADO",
  unavailable: "NO SE PUDO CONSULTAR",
};

export function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const isOnline = status === "online";
  const isUnavailable = status === "unavailable";

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 text-sm font-medium ${className}`}
      role="status"
    >
      <span
        className={`w-2 h-2 rounded-full ${
          isOnline
            ? "bg-[#54d255] shadow-[0_0_6px_#54d255]"
            : isUnavailable
              ? "bg-[#e8b342]"
              : "bg-[#8a8f92]"
        }`}
        aria-hidden="true"
      />
      <span
        className={
          isOnline
            ? "text-[#54d255]"
            : isUnavailable
              ? "text-[#e8b342]"
              : "text-[#8a8f92]"
        }
      >
        {labelMap[status]}
      </span>
    </span>
  );
}
