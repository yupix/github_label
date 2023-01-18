import { question } from "readline-sync";
import { api } from "./api";
import { logger } from "./logging";
import { deleteLabel, getLabels } from "./middlewares/labels";

const [fromOwner, fromRepo] = question("from (owner/repo)").split("/");
const [toOwner, toRepo] = question("to (owner/repo)").split("/");
const token = question("GitHub Token");
const headers = { Authorization: `token ${token}` };

const fromRepoLabels = getLabels(fromOwner, fromRepo);
const toRepoLabels = getLabels(toOwner, toRepo);
toRepoLabels.then((labels) => {
  labels.map((label) => {
    deleteLabel(toOwner, toRepo, label.name, headers);
  });
});
fromRepoLabels.then((labels) => {
  logger.info(`success fetch ${labels.length}`);
  labels.map((label) => {
    api
      .call("POST", "/repos/:owner/:repo/labels", {
        headers,
        params: { owner: toOwner, repo: toRepo },
        body: {
          color: label.color,
          description: label.description,
          name: label.name,
        },
      })
      .then((res) => {
        if (res.type === "failed") throw "failed post";
        logger.info(`success register label: ${res.data.name}`);
      });
  });
});
