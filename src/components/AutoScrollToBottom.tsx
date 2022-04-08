import React, { useRef, useEffect } from "react";

const AutoScrollToBottom = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => ref.current?.scrollIntoView({ block: "center" }));

  return <div ref={ref} />;
};

export default AutoScrollToBottom;
