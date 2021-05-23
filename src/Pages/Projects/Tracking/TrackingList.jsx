import { useAuth0 } from "@auth0/auth0-react";
import styled from "@emotion/styled";
import React from "react";
import useProjectStore from "../../../Hooks/ProjectStore";
import TrackingForm from "./TrackingForm";
import TrackingItem from "./TrackingItem";

const Container = styled.div``;

const Timeline = styled.ul`
  position: relative;
  list-style-type: none;
  padding: 0;
`;
const TrackingList = () => {
  const { tracking } = useProjectStore();
  const { isAuthenticated } = useAuth0();

  if (!tracking) return null;

  return (
    <Container>
      <h4>History</h4>
      <Timeline>
        {tracking?.map((item) => (
          <TrackingItem key={`tracking-item-${item.id}`} item={item} />
        ))}
      </Timeline>
      {isAuthenticated && <TrackingForm />}
    </Container>
  );
};

export default TrackingList;
