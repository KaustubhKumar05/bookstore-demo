"use client";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { List } from "./components/List";
import { FilterTypes, ResourceType } from "./types";
import { useState } from "react";
import { Tab } from "./components/Tab";
import { Filter } from "./components/Filter";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { CreateDialog } from "./components/CreateDialog";

export default function App() {
	const client = new ApolloClient({
		uri: process.env.NEXT_PUBLIC_BACKEND_URL,
		cache: new InMemoryCache({ addTypename: false }),
	});

	const [selection, setSelection] = useState<ResourceType>("author");

	const [showCreateForm, setShowCreateForm] = useState(false);

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
					<div className="flex gap-4 items-stretch">
						<Tab
							onClick={(value: string) => setSelection(value as ResourceType)}
							currentValue={selection}
							options={["author", "book"]}
						/>
						<button
							className="px-2 rounded bg-gray-700"
							onClick={() => setShowCreateForm(true)}
						>
							<PlusCircledIcon height={20} width={20} />
						</button>
					</div>
					<Filter
						filters={filters}
						setFilters={setFilters}
						resourceType={selection}
					/>
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
