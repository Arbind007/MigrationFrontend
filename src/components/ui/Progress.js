import * as React from "react";

const Progress = React.forwardRef(({ className, value, max = 100, ...props }, ref) => {
  return (
    <div
      ref={ref}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      className={`relative w-full  bg-gray-200 rounded-full overflow-hidden ${className || ""}`}
      {...props}
    >
      <div className="progress">
        <div className="progress-bar bg-success" role="progressbar" style={{width: `${(value / max) * 100}%`}} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
      </div>
    </div>
  );
});

Progress.displayName = "Progress";

export { Progress };
