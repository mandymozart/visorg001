import React, { useEffect } from "react";
import Layout from "../../Components/Layout";
import useProjectStore from "../../Hooks/ProjectStore";
import { useGetProject, useGetTracking } from "../../Hooks/Queries";
import NotFound from "../NotFound";
import Briefing from "./Briefing";
import TrackingList from "./Tracking/TrackingList";

export default ({ match }) => {
  const projectId = match.params.projectId;
  const { error, isLoading, data } = useGetProject(projectId);
  const { isLoading: isLoadingTracking, data: dataTracking } = useGetTracking(
    projectId
  );
  const { setProject, setTracking } = useProjectStore();

  useEffect(() => {
    if(dataTracking){
      console.log(dataTracking.message)
      setTracking(dataTracking.message);
    }
  }, [dataTracking, setTracking]);

  useEffect(() => {
    if (data) {
      console.log(data);
      setProject(data.message);
    }
  }, [data, setProject]);

  return (
    <Layout>
      {isLoading && ("Loading ...")}
      {!isLoading && <Briefing />}
      {!isLoadingTracking && <TrackingList />}
      {error && (<NotFound />)}
    </Layout>
  );
};
