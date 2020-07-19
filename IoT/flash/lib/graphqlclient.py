# Ported python-graphql-client to use micropython-urequests.
# - https://github.com/prismagraphql/python-graphql-client
# - https://github.com/micropython/micropython-lib/tree/master/urequests

from urequests import post
import json


def shrink_query(query):
    query = query.replace(r'\n', ' ')
    query = query.replace(r'\t', ' ')

    while query != query.replace('  ', ' '):
        query = query.replace('  ', ' ')

    return query


class GraphQLClient:
    def __init__(self, endpoint, useGet=False):
        self.endpoint = endpoint
        self.useGet = useGet
        self.token = None

    def execute(self, query, variables=None):
        return self._send(query, variables)

    def inject_token(self, token):
        self.token = token

    def _send(self, query, variables):
        query = shrink_query(query)

        headers = {
            'Content-Type': 'application/json'
        }

        if self.token is not None:
            headers['Authorization'] = '{}'.format(self.token)

        data = {"query": query}
        response = post(
            self.endpoint,
            headers=headers,
            data=json.dumps(data)
        )
        return json.loads(response.content.decode('utf-8'))
