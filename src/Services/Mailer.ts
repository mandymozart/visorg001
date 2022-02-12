import axios from "axios";
import { MailTypes } from "../Components/Cart/MailTypes";
import { config } from "../config";

type MailerData = {
  type: MailTypes;
  user: any;
  subject: string;
  body: string;
};

/**
 * TODO:
 * each benefector receives an email, about their sale
 * the renter receives an email with a confirmation of the
 * * ordered items.
 * * emergency contact information from owners
 * * an updated wallet balance
 **/
const getUrl = (endpoint: string) => {
  return new URL(config.FUNCTIONS_API_URL + endpoint).toString();
};

const postData = async (url: string, data: MailerData) => {
  return await axios
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
};

export const sendMail = (data: MailerData) => {
  const url = getUrl("/sendMail");
  postData(url, data).then((data) => {
    console.log(data); // JSON data parsed by `data.json()` call
  });
};
