"use client";

import React from "react";

/* eslint-disable-next-line */
export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  maxHeight?: boolean;
}

export function Container({ children, className, maxHeight }: ContainerProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [height, setHeight] = React.useState<string>("");

  React.useEffect(() => {
    if (containerRef.current)
      setHeight(`${containerRef.current?.clientHeight}px`);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        maxHeight: maxHeight ? height : undefined,
      }}
      className={`p-4 rounded-2xl bg-white ${className}`}
    >
      {children}
    </div>
  );
}

export default Container;
