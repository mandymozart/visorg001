import { useMutation, useQuery } from "react-query";
import axios from "axios";
import config from "../config";

const getUrl = (endpoint, query) => {
  const url = new URL(config.apiURL + endpoint);
  if (query) url.search = new URLSearchParams(query);
  return url;
};

export const useGetUsers = () => {
  return useQuery("getUsers", () =>
    fetch(getUrl("/users")).then((res) => res.json())
  );
};

export const useGetUser = (query) => {
  const url = getUrl("/users", query);
  return useQuery(`getUser-${query.id}`, () =>
    fetch(url).then((res) => res.json())
  );
};

export const useGetProjects = (query) => {
  const url = getUrl("/projects", query);
  return useQuery(`getProjects-${query.status}${query.ownerId}`, () =>
    fetch(url).then((res) => res.json())
  );
};

export const useGetProject = (id) => {
  const url = getUrl("/projects", { id });
  return useQuery(`getProject-${id}`, () =>
    fetch(url).then((res) => res.json())
  );
};

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

export const useUpdateProject = () => {
  const url = getUrl("/project-update");
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

export const useAddTracking = () => {
  const url = getUrl("/tracking-add");
  return useMutation((data) => {
    axios
      .post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.data);
  });
};

export const useUpdateTracking = () => {
  const url = getUrl("/tracking-update");
  return useMutation((data) => {
    axios
      .post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.data);
  });
};
