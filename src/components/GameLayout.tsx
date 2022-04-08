import { ReactNode } from "react";

import AutoScrollToBottom from "./AutoScrollToBottom";
import ErrorMessage from "./ErrorMessage";

type Props = {
  error?: string;
  renderAttempts: () => ReactNode;
  renderInput: () => ReactNode;
};

const GameLayout = ({ error, renderAttempts, renderInput }: Props) => {
  return (
    <>
      {renderAttempts()}
      {renderInput()}
      {error && (
        <>
          <br />
          <ErrorMessage error={error} />
        </>
      )}

      <AutoScrollToBottom />
    </>
  );
};

export default GameLayout;
