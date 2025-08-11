import React from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CreateButtonProps {
  onClick?: () => void;
  text: string;
  variant?: "primary" | "secondary" | "accent" | "neutral";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  icon?: React.ReactNode;
  className?: string;
  to?: string;
}

const Button = ({
  onClick,
  text,
  variant = "primary",
  size = "md",
  fullWidth = false,
  icon = <Plus className="w-5 h-5" />,
  className = "",
  to,
}: CreateButtonProps) => {
  const navigate = useNavigate();

  function handleClick() {
    if (to) {
      navigate(to);
    }
  }

  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-500 shadow-lg shadow-emerald-500/20";
      case "secondary":
        return "bg-blue-600 hover:bg-blue-700 text-white border-blue-500 shadow-lg shadow-blue-500/20";
      case "accent":
        return "bg-purple-600 hover:bg-purple-700 text-white border-purple-500 shadow-lg shadow-purple-500/20";
      case "neutral":
        return "bg-gray-800 hover:bg-gray-700 text-white border-slate-600 border-dashed";
      default:
        return "bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-500";
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "px-3 py-2 text-sm";
      case "md":
        return "px-4 py-2.5 text-base";
      case "lg":
        return "px-6 py-4 text-lg";
      default:
        return "px-4 py-2.5 text-base";
    }
  };

  return (
    <button
      onClick={to ? handleClick : onClick}
      className={`
        ${fullWidth ? "w-full" : "inline-flex"}
        cursor-pointer
        font-medium
        rounded-lg
        border
        transition-all
        duration-200
        flex
        items-center
        justify-center
        space-x-2
        transform
        hover:scale-[1.02]
        active:scale-[0.98]
        ${getVariantClasses()}
        ${getSizeClasses()}
        ${className}
      `}
    >
      {icon}
      <span>{text}</span>
    </button>
  );
};

export default Button;
