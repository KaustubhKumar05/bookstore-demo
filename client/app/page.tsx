"use client";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { List } from "./components/List";
import { FilterTypes, ResourceType } from "./types";
import { useState } from "react";
import { Tab } from "./components/Tab";
import { Filter } from "./components/Filter";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { CreateDialog } from "./components/CreateDialog";
import { DEFAULT_FILTERS } from "./components/utils";

export default function App() {
	const client = new ApolloClient({
		uri: process.env.NEXT_PUBLIC_BACKEND_URL,
		cache: new InMemoryCache({ addTypename: false }),
	});

	const [selection, setSelection] = useState<ResourceType>("author");

	const [showCreateForm, setShowCreateForm] = useState(false);

	const [filters, setFilters] = useState<FilterTypes>(DEFAULT_FILTERS);

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
					<button
						className="px-2 py-1 rounded bg-gray-700 flex items-center gap-2"
						onClick={() => setShowCreateForm(true)}
					>
						New Entry <PlusCircledIcon height={20} width={20} />
					</button>
					<List resourceType={selection} filters={filters} />
					<CreateDialog
						open={showCreateForm}
						setOpen={setShowCreateForm}
						resourceType={selection}
						onConfirm={() => {}}
					/>
				</main>
			</div>
		</ApolloProvider>
	);
}
