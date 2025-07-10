"use client";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { ApolloProvider } from "@apollo/client";
import React from "react";
import { getFromSessionStorage } from "../utils";

const httpLink = createHttpLink({
	uri: process.env.NEXT_PUBLIC_BACKEND_URL,
});

const authLink = setContext((_, { headers }) => {
	const token = getFromSessionStorage("token");
	return {
		headers: {
			...headers,
			Authorization: token ? `Bearer ${token}` : "",
		},
	};
});

const client = new ApolloClient({
	uri: process.env.NEXT_PUBLIC_BACKEND_URL,
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

export const ApolloProviderClient = ({
	children,
}: {
	children: React.ReactNode;
}) => <ApolloProvider client={client}>{children}</ApolloProvider>;
