"use client";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { List } from "./components/List";
import { FilterTypes, ResourceType } from "./types";
import { useState } from "react";
import { Tab } from "./components/Tab";
import { Filter } from "./components/Filter";

export default function App() {
	const client = new ApolloClient({
		uri: process.env.NEXT_PUBLIC_BACKEND_URL,
		cache: new InMemoryCache({ addTypename: false }),
	});

	const [selection, setSelection] = useState<ResourceType>("author");
	const [filters, setFilters] = useState<FilterTypes>({
		author: { name: "", birthYear: undefined },
		book: {
			title: "",
			authorName: "",
			publishedAfter: undefined,
			publishedBefore: undefined,
		},
	});

	return (
		<ApolloProvider client={client}>
			<div className="flex justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
				<main className="flex flex-col gap-4 items-center">
					<Tab
						onClick={(value: string) => setSelection(value as ResourceType)}
						currentValue={selection}
						options={["author", "book"]}
					/>
					<Filter
						filters={filters}
						setFilters={setFilters}
						resourceType={selection}
					/>
					<List resourceType={selection} filters={filters} />
				</main>
			</div>
		</ApolloProvider>
	);
}
