"use client";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { List } from "./components/List";

export default function App() {
	console.log("debug>", process.env.NEXT_PUBLIC_BACKEND_URL);
	const client = new ApolloClient({
		uri: process.env.NEXT_PUBLIC_BACKEND_URL,
		cache: new InMemoryCache(),
	});

	return (
		<ApolloProvider client={client}>
			<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
				<main className="flex gap-8 items-center justify-center">
					Hello world
				</main>
				<List />
			</div>
		</ApolloProvider>
	);
}
