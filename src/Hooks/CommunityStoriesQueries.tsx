import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { config } from "../config";

const getUrl = (endpoint: string) => {
  return new URL(config.communityStoriesApiEndpoint + endpoint).toString();
};

function fetchSubmissions(): Promise<unknown[] | undefined> {
  return axios.get(getUrl("/submissions")).then((response) => response.data.submissions);
}

export const useGetSubmissions = () => {
  return useQuery("getSubmissions", () => fetchSubmissions());
};

export const useAddSubmission = () => {
  const url = getUrl("/submissions");
  return useMutation(async (data: unknown) => {
    await axios
      .post(
        url,
        { submission: data },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => res.data);
  });
};

function fetchVotes(): Promise<unknown[] | undefined> {
  return axios
    .get(getUrl("/votes"))
    .then((response) => response.data.votes);
}

export const useGetVotes = () => {
  return useQuery("getVotes", () => fetchVotes());
};

export const useAddVote = () => {
  const url = getUrl("/votes");
  return useMutation(async (data: unknown) => {
    await axios
      .post(
        url,
        { vote: data },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => res.data);
  });
};
