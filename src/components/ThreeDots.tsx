import React, { MouseEventHandler, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: 8px;`;

const Dot = styled.div`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: #000;
  animation: ${rotate} 1.5s linear infinite;
  
  &:not(:last-child) {
    margin-bottom: 4px;
  }
`;

const Dropdown: React.FC<{open: boolean, children: any}> = ({open, children}) => {
  const Menu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1;
  width: 150px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 8px;1`;

  return <Menu style={{display: open ? 'block' : 'none'}}>{children}</Menu>
}

const Option = styled.a`
  display: block;
  color: #000;
  text-decoration: none;
  padding: 4px;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #f0f0f0;
  }
`;

const ThreeDots: React.FC<{options: {name: string, onClick: MouseEventHandler<HTMLAnchorElement>}[] }> = ({ options }) => {
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => {
    setOpen(!open);
  };

  return (
    <Container onClick={toggleDropdown}>
      <Dot />
      <Dot />
      <Dot />
      <Dropdown open={open}>
        {options && options?.map((option) => (
          <Option key={option.name} onClick={option.onClick}>
            {option.name}
          </Option>
        ))}
      </Dropdown>
    </Container>
  );
};

export default ThreeDots;
