import styled from "@emotion/styled";
import React from "react";
import ProjectList from "./ProjectList";
import { ProjectListNewItem } from "./ProjectListNewItem";

const KanbanContainer = styled.div``;
const Header = styled.header`
  display: grid;
  font-weight: 700;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 3rem;

  margin-bottom: 2rem;
  > div {
    padding-bottom: 1rem;
    border-bottom: 1px solid;
  }
`;
const Columns = styled.div`
  display: grid;
  grid-gap: 3rem;
  grid-template-columns: repeat(3, 1fr);
`;
const Kanban = ({ drafts, opencalls, done, children }) => {
  return (
    <KanbanContainer>
      <Header>
        <div>Drafts</div>
        <div>Open Calls</div>
        <div>Finished</div>
      </Header>
      <Columns>
        <div>
          <ProjectList projects={drafts} />
          <ProjectListNewItem/>
        </div>
        <div>
          <ProjectList projects={opencalls} />
        </div>
        <div>
          <ProjectList projects={done} />
        </div>
      </Columns>
    </KanbanContainer>
  );
};

export default Kanban;