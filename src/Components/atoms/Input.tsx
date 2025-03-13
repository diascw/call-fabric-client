import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = ({ label, className, ...props }: InputProps) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-gray-800 text-sm font-semibold mb-2">
          {label}
        </label>
      )}
      <input
        {...props}
        className={`w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 bg-white shadow-sm transition ${className}`}
      />
    </div>
  );
};

export default Input;
