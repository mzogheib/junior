import styled from "@emotion/styled";

import Attempt from "@/components/Attempt";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const AttempWrapper = styled.div`
  margin-bottom: 4px;
  width: 100%;
`;

type Props = {
  target: string;
  attempts: string[];
  readOnlyValues?: string[];
  characterMap?: Record<string, string>;
};

const Attempts = ({
  target,
  attempts,
  readOnlyValues,
  characterMap,
}: Props) => (
  <Wrapper>
    {attempts.map((attempt, i) => (
      <AttempWrapper key={`${attempt}-${i}`}>
        <Attempt
          attempt={attempt}
          target={target}
          readOnlyValues={readOnlyValues}
          characterMap={characterMap}
        />
      </AttempWrapper>
    ))}
  </Wrapper>
);

export default Attempts;
