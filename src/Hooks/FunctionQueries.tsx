import axios from "axios";
import { useMutation } from "react-query";
import { config } from "../config";

const getUrl = (endpoint: string) => {
  return new URL(config.FUNCTIONS_API_URL + endpoint).toString();
};

export const useSendMail = () => {
  const url = getUrl("/sendMail");
  return useMutation(async (data: any) => {
    await axios
      .post(
        url,
        { body: data },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => res.data);
  });
};
