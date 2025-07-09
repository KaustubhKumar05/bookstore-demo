"use client";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { List } from "./components/List";
import { FilterTypes, ResourceType } from "./types";
import { useState } from "react";
import { Tab } from "./components/Tab";
import { Filter } from "./components/Filter";
import { DEFAULT_FILTERS } from "./components/utils";
import { NewEntry } from "./components/NewEntry";

export default function App() {
	const client = new ApolloClient({
		uri: process.env.NEXT_PUBLIC_BACKEND_URL,
		cache: new InMemoryCache({ addTypename: false }),
	});

	const [selection, setSelection] = useState<ResourceType>("author");

	const [filters, setFilters] = useState<FilterTypes>(DEFAULT_FILTERS);

	return (
		<ApolloProvider client={client}>
			<div className="flex min-h-screen justify-center pt-8 p-4 font-[family-name:var(--font-geist-sans)] w-full">
				<main className="flex flex-col gap-6 items-center w-full max-w-5xl">
					<Tab
						onClick={(value: string) => setSelection(value as ResourceType)}
						currentValue={selection}
						options={["author", "book"]}
					/>
					<div className="bg-gray-800 p-5 rounded w-full gap-4 flex flex-col items-center">
						<Filter
							filters={filters}
							setFilters={setFilters}
							resourceType={selection}
						/>

						<NewEntry selection={selection} />
					</div>

					<List selection={selection} filters={filters} />
				</main>
			</div>
		</ApolloProvider>
	);
}
