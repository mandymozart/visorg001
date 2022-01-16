import { config } from "./config";

export const stripHtml = (html) => {
  var tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

export const convertToPlainText = (prismicText) => {
  let result = "";
  prismicText.map((p) => {
    result = result + stripHtml(p.text) + `\n\n`;
    return true;
  });
  return result;
};

export const round = (value, decimals) => {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
};

export const urlEncodeParams = (data) => {
  let out = [];

  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      out.push(`issue[${key}]=${encodeURIComponent(data[key])}`);
    }
  }
  out.join("&");
  console.log(out);
  return out;
};

export const openNewGitlabIssue = (issue) => {
  // console.log('create issue:', issue)
  let issueMap = {
    title: convertToPlainText(issue.titel),
    description: convertToPlainText(issue.description),
  };

  return window.open(
    config.repoURL + "/issues/new?" + urlEncodeParams(issueMap).join("&"),
    "_blank"
  );
};
