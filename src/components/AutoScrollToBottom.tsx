import React, { useRef, useEffect } from 'react';

const AutoScrollToBottom = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => ref.current?.scrollIntoView(false));

  return <div ref={ref} />;
};

export default AutoScrollToBottom;
