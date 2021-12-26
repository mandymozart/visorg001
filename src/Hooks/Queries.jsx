import axios from "axios";
import { useMutation } from "react-query";
import { config } from "../config";

const getUrl = (endpoint, query) => {
  const url = new URL(config.apiURL + endpoint);
  if (query) url.search = new URLSearchParams(query);
  return url;
};

// TODO: Placeholder for API hooks
export const useAddProject = () => {
  const url = getUrl("/project-add");
  return useMutation((data) =>
    axios
      .post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.data)
  );
};
