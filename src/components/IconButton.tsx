import react, { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import { MdRefresh } from 'react-icons/md';

const iconMap = {
  MdRefresh,
};

const Wrapper = styled.button`
  width: 30px;
  height: 30px;
  border: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  cursor: pointer;
`;

type OwnProps = {
  icon: keyof typeof iconMap;
};

type Props = OwnProps & ButtonHTMLAttributes<HTMLButtonElement>;

const IconButton = ({ icon, ...buttonProps }: Props) => {
  const Icon = iconMap[icon];
  return (
    <Wrapper {...buttonProps}>
      <Icon />
    </Wrapper>
  );
};

export default IconButton;
