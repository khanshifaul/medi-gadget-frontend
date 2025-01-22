"use client";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const client = new ApolloClient({
    uri: "/api/graphql",
    cache: new InMemoryCache(),
    devtools: {
      enabled: true,
    },
  });
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
