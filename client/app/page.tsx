"use client";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { List } from "./components/List";
import { ResourceType } from "./types";
import { useState } from "react";
import { Tab } from "./components/Tab";

export default function App() {
	const client = new ApolloClient({
		uri: process.env.NEXT_PUBLIC_BACKEND_URL,
		cache: new InMemoryCache({ addTypename: false }),
	});

	const [selection, setSelection] = useState<ResourceType>("author");

	return (
		<ApolloProvider client={client}>
			<div className="flex justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
				<main className="flex flex-col gap-4 items-center">
					<Tab
						onClick={(value: string) => setSelection(value as ResourceType)}
						currentValue={selection}
						options={["author", "book"]}
					/>
					<List resourceType={selection} />
				</main>
			</div>
		</ApolloProvider>
	);
}
