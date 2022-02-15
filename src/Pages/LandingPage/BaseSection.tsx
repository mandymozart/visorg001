import styled from "@emotion/styled";
import clsx from "clsx";
import React, { ReactElement } from "react";

export const BaseSection = styled.section`
  padding: 1rem;
  min-height: calc(50vh - 2.75rem);
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
type Props = {
  hasPadding:boolean;
  children: ReactElement | ReactElement[]
}
const Container =  styled.section`
  .hasPadding {
    padding: 1rem;
  }
  min-height: calc(50vh - 2.75rem);
  img {
    max-width: 100%;
    &.full {
      width: 100%;
    }
  }
`;
export const PageSection = ({hasPadding = true, children}:Props) => {
    return (
      <Container className={clsx({hasPadding:hasPadding})}>
        {children}
      </Container>
    )
}
