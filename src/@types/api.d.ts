interface IHeaders {
  [key: string]: string;
}

interface IGitHubLabel {
  id: number;
  node_id: string;
  url: string;
  name: string;
  description: string;
  color: string;
  default: boolean;
}

type Schema = {
  resource: {
    "/repos/:owner/:repo/labels": {
      GET: {
        params: { owner: string; repo: string };
        response: IGitHubLabel[];
      };
      POST: {
        params: { owner: string; repo: string };
        body: {
          name: string;
          color: string;
          description: string;
        };
        response: IGitHubLabel;
      };
    };
    "/repos/:owner/:repo/labels/:name": {
      DELETE: {
        params: { owner: string; repo: string; name: stirng };
        response: void;
      };
    };
  };
};
