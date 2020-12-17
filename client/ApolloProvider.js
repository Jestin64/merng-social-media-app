import React from "react"
import { ApolloClient} from "apollo-client"
import {createHttpLink  } from "apollo-link-http"
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "@apollo/react-hooks";

import App from "./App"




const httplink = createHttpLink({
    uri: 'http://localhost:3000'
})

const client = new ApolloClient({
    link: httplink, 
    cache: new InMemoryCache()
})


export default (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
)
