"use client";
import { List } from "./components/List";
import { FilterTypes, ResourceType } from "./types";
import { useEffect, useState } from "react";
import { Tab } from "./components/Tab";
import { Filter } from "./components/Filter";
import { DEFAULT_FILTERS, getFromSessionStorage } from "./utils";
import { NewEntry } from "./components/NewEntry";
import { useRouter } from "next/navigation";

export default function App() {
	const router = useRouter();
	const [selection, setSelection] = useState<ResourceType>("author");
	const [filters, setFilters] = useState<FilterTypes>(DEFAULT_FILTERS);
	const username = getFromSessionStorage("user")?.username;

	useEffect(() => {
		const token = getFromSessionStorage("token");
		if (!token) {
			router.push("/login");
		}
	}, [router]);

	return (
		<div className="flex min-h-screen justify-center pt-18 p-4 font-[family-name:var(--font-geist-sans)] w-full">
			<div className="fixed top-0 bg-gray-800 p-4 flex items-center justify-between w-full">
				<p>Hi {username}!</p>
				<button
					onClick={() => {
						if (!window?.sessionStorage) {
							return;
						}

						window.sessionStorage.clear();
						router.push("/login");
					}}
					className="bg-black px-2 py-1"
				>
					Log out
				</button>
			</div>
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
	);
}
