import React from 'react';
import VerificationInput from 'react-verification-input';
import { ClassNames, ClassNamesContent } from '@emotion/react';

const makeContainerClassName = ({ css }: ClassNamesContent) => css`
  height: 50px;
`;

const makeCharacterClassName = ({ css, theme }: ClassNamesContent) => css`
  line-height: 50px;
  font-size: 36px;
  border: 1px solid gray;
  border-radius: ${theme.shape.borderRadius}px;
  color: ${theme.palette.mode === 'light' ? 'black' : 'white'};
  margin: 0 2px;
  width: 50px;
`;

const focussedConfig = {
  light: 'black',
  dark: 'white',
};

const makeCharacterSelectedClassName = ({
  css,
  theme,
}: ClassNamesContent) => css`
  border: 1px solid ${focussedConfig[theme.palette.mode]};
`;

type Props = {
  autoFocus: boolean;
  isFocussed: boolean;
  length: number;
  value: string;
  onChange: (value: string) => void;
  onFocus: () => void;
};

const EquationTermInput = ({
  autoFocus,
  isFocussed,
  length,
  value,
  onChange,
  onFocus,
}: Props) => (
  <ClassNames>
    {(classNamesProps) => (
      <VerificationInput
        autoFocus={autoFocus}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        length={length}
        validChars="0-9"
        placeholder=""
        removeDefaultStyles
        classNames={{
          container: makeContainerClassName(classNamesProps),
          character: makeCharacterClassName(classNamesProps),
          characterSelected: isFocussed
            ? makeCharacterSelectedClassName(classNamesProps)
            : undefined,
        }}
      />
    )}
  </ClassNames>
);

export default EquationTermInput;
