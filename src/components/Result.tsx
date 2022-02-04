import React from 'react';

type Props = {
  numAttempts: number;
};

const Result = ({ numAttempts }: Props) => {
  return (
    <div>
      <div>Success! Solved in {numAttempts} attempt(s).</div>
    </div>
  );
};

export default Result;
