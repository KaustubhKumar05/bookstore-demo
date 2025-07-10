"use client";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { ApolloProvider } from "@apollo/client";
import React from "react";

const httpLink = createHttpLink({
	uri: process.env.NEXT_PUBLIC_BACKEND_URL,
});

const authLink = setContext((_, { headers }) => {
	const token =
		typeof window !== "undefined"
			? JSON.parse(sessionStorage.getItem("userData") || "{}").token
			: null;
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
