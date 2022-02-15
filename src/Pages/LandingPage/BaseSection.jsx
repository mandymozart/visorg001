import styled from "@emotion/styled";

export const BaseSection = styled.section`
  padding: 1rem;
  min-height: calc(100vh - 2.75rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  img {
    max-width: 100%;
    &.full {
      width: 100%;
    }
  }
`;
