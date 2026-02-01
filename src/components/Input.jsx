import { useId, forwardRef } from "react";

const Input = forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref /*ref is imp*/,
) {
  const id = useId();

  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        type={type}
        id={id}
        ref={ref}
        className={`border px-3 py-2 rounded-md ${className}`}
        {...props}
      />
    </div>
  );
});

export default Input;
