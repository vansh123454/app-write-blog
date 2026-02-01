import React, { useId } from "react";

function Select({ options, lebel, className = "", ...props }, ref) {
  const id = useId();

  return (
    <div>
      {lebel && <lebel htmlFor={id} className={className}></lebel>}
      <select {...props} id={id} className={`${className}`} ref={ref}>
        {options?.map((option)=>(
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select); // it is imp
