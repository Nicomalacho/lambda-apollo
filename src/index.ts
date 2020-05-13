import ApiBuilder from 'claudia-api-builder';
import { graphqlHandler } from './graphHandler';
import { formatClaudia } from './format';

const api: ApiBuilder = new ApiBuilder();

export = api;

api.get('/graphql', async (request) => {
  request.lambdaContext.callbackWaitsForEmptyEventLoop = false;

  const response = await graphqlHandler(formatClaudia({ req: request }));

  const body =
    response.headers['Content-Type'] === 'text/html'
      ? response.body
      : JSON.parse(response.body);

  // You must parse the body so ApiResponse does not JSON.stringify() twice
  return new api.ApiResponse(body, response.headers, response.statusCode);
});

api.post('/graphql', async (request) => {
  request.lambdaContext.callbackWaitsForEmptyEventLoop = false;

  const response = await graphqlHandler(formatClaudia({ req: request }));

  // You must parse the body so ApiResponse does not JSON.stringify() twice
  return new api.ApiResponse(
    JSON.parse(response.body),
    response.headers,
    response.statusCode
  );
});
