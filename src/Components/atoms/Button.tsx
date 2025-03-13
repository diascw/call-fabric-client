import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: "primary" | "secondary" | "danger" | "warning" | "success";
}

const variantClasses = {
  primary: "bg-blue-500 hover:bg-blue-600 text-white",
  secondary: "bg-gray-500 hover:bg-gray-600 text-white",
  danger: "bg-red-500 hover:bg-red-600 text-white",
  warning: "bg-yellow-500 hover:bg-yellow-600 text-white",
  success: "bg-green-500 hover:bg-green-600 text-white",
};

const Button = ({
  label,
  className,
  variant = "primary",
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={`${variantClasses[variant]} font-medium py-2 px-4 rounded-md transition shadow-sm text-sm ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
