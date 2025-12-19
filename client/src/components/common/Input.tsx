type Props = {
  label: string;
  value: string;
  type?: string;
  disabled?: boolean;
  error?: string;
  onChange: (v: string) => void;
};

export function Input({
  label,
  value,
  type = "text",
  disabled = false,
  error,
  onChange,
}: Props) {
  return (
    <div className="w-full">
      {/* Label */}
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>

      {/* Input */}
      <input
        type={type}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className={`
          w-full rounded-md border px-3 py-2 text-sm
          placeholder-gray-400 text-gray-700
          transition duration-200
          focus:outline-none focus:ring-2
          ${
            error
              ? "border-red-500 focus:ring-red-400"
              : "border-gray-300 focus:ring-blue-500"
          }
          ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
        `}
      />

      {/* Error */}
      {error && (
        <p className="text-xs text-red-500 mt-1">
          {error}
        </p>
      )}
    </div>
  );
}
