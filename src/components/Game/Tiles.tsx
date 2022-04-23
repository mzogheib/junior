import styled from "@emotion/styled";

const Tiles = styled.div<{ length: number }>`
  display: inline-grid;
  grid-template-columns: ${({ length }) => `repeat(${length}, 1fr)`};

  margin-bottom: 4px;
`;

export default Tiles;
