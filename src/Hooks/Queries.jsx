import { useMutation, useQuery } from "react-query";
import axios from "axios";

export const useGetUsers = () => {
  return useQuery("getUsers", () =>
    fetch("https://visinn001.viennastruggle.at/api/users").then((res) =>
      res.json()
    )
  );
};

export const useGetUser = ({ id }) => {
  return useQuery(`getUser-${id}`, () =>
    fetch(
      "https://visinn001.viennastruggle.at/api/users?id=" + id
    ).then((res) => res.json())
  );
};

export const useGetProjects = (query) => {
  console.log(query);
  const url = new URL(`https://visinn001.viennastruggle.at/api/projects`);
  url.search = new URLSearchParams(query);
  return useQuery(`getProjects-${query.status}${query.ownerId}`, () =>
    fetch(url).then((res) => res.json())
  );
};

export const useGetProject = (id) => {
  return useQuery(`getProject-${id}`, () =>
    fetch(
      `https://visinn001.viennastruggle.at/api/projects?id=${id}`
    ).then((res) => res.json())
  );
};

export const useAddProject = () => {
  return useMutation((data) =>
    axios
      .post(
        `https://visinn001.viennastruggle.at/api/project-add`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => { 
        console.log(res)
        return res.data
      })
  );
};
