import React from 'react';
import VerificationInput from 'react-verification-input';
import { ClassNames, ClassNamesContent } from '@emotion/react';

const makeContainerClassName = ({ css }: ClassNamesContent) => css`
  height: 36px;
`;

const makeCharacterClassName = ({ css, theme }: ClassNamesContent) => css`
  line-height: 34px;
  font-size: 24px;
  border: 1px solid gray;
  border-radius: ${theme.shape.borderRadius}px;
  color: ${theme.palette.mode === 'light' ? 'black' : 'white'};
  margin: 0 2px;
  width: 36px;
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
  isFocussed: boolean;
  length: number;
  value: string;
  onChange: (value: string) => void;
  onFocus: () => void;
};

const EquationTermInput = ({
  isFocussed,
  length,
  value,
  onChange,
  onFocus,
}: Props) => (
  <ClassNames>
    {(classNamesProps) => (
      <VerificationInput
        autoFocus={isFocussed}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        length={length}
        validChars="0-9"
        inputProps={{ type: 'tel' }}
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
