import styled from "@emotion/styled";
import React from "react";
import ReactMarkdown from "react-markdown";
import Tag from "../../../Components/Tag";

const Container = styled.li`
  position: relative;
  padding: 1rem;

  &:before {
    content: "";
    background-color: black;
    position: absolute;
    bottom: 0;
    top: 1rem;
    left: calc(0.25rem - 0.1rem/2);
    width: 0.1rem;
  }
  &:after {
    content: "";
    background-color: black;
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 0.5rem;
    height: 0.5rem;
    width: 0.5rem;
  }
  h5 {
    margin: 0;
    margin-top: -1.25rem;
  }
`;
const Header = styled.div``;
const Content = styled.div``;

const TrackingItem = ({ item }) => {
  console.log(item);
  return (
    <Container>
      <Header>
        {item.user && <img src={item.user.avatar} alt="avatar" />}
        <h5>
          {item.createdAt} - {item.userId}{" "}
        </h5>
        <div></div>
        <Tag>Hours: {item.hours}</Tag>
      </Header>
      <Content>
        <ReactMarkdown source={item.comment} className="description" />
      </Content>
    </Container>
  );
};

export default TrackingItem;
