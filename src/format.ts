type Request = {
  context: {
    method: string;
  };
  headers;
  proxyRequest;
  body;
  queryString;
};

type ApolloRequest = {
  httpMethod: string;
  accept: string;
  path: string;
  query;
};

export const formatClaudia = ({ req }: { req: Request }): ApolloRequest => {
  const httpMethod = req.context.method;
  const accept = req.headers['Accept'] || req.headers['accept'];
  const path = req.proxyRequest.requestContext.path;
  const query = Object.entries(req.body).length ? req.body : req.queryString;

  return {
    httpMethod,
    accept,
    path,
    query,
  };
};
