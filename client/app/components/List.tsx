"use client";
import { useQuery } from "@apollo/client";
import { GET_AUTHORS, GET_BOOKS } from "../queries";
import { Author, Book, FilterTypes, ResourceType } from "../types";
import { useEffect, useState } from "react";
import { Pagination } from "./Pagination";
import { ResourceEntry } from "./ResourceEntry";
import { LIST_CONFIG } from "../utils";
import { useRouter } from "next/navigation";

export const List = ({
	selection,
	filters,
}: {
	selection: ResourceType;
	filters: FilterTypes;
}) => {
	const isAuthor = selection === "author";
	const [page, setPage] = useState(1);

	const { data, loading, error, refetch } = useQuery(
		isAuthor ? GET_AUTHORS : GET_BOOKS,
		{
			variables: {
				limit: LIST_CONFIG.LIMIT,
				offset: (page - 1) * LIST_CONFIG.LIMIT,
				filter: filters[selection],
			},
			fetchPolicy: "cache-and-network",
		}
	);

	const listData = data?.[selection + "s"];

	const router = useRouter();

	useEffect(() => {
		setPage(1);
	}, [selection, filters]);

	// Handles the 12 hour timeout for the token
	if (error) {
		setTimeout(() => {
			if (error.message === "Not authenticated" && window?.sessionStorage) {
				sessionStorage.removeItem("userData");
				router.push("/login");
			}
		}, 2000);
		return (
			<p className="text-xl font-bold my-5 text-red-500">
				Error: {error.message}
			</p>
		);
	}
	if (loading) {
		return <p className="text-xl font-bold my-5">Loading...</p>;
	}

	if (!loading && !error && listData.items.length === 0) {
		return (
			<p className="text-xl font-bold my-5 text-red-500">
				No results to display
			</p>
		);
	}

	return (
		<div className="w-full flex flex-col gap-4">
			<div>
				{listData.items.map((resource: Author | Book) => (
					<ResourceEntry
						key={resource.id + selection}
						resource={
							Object.fromEntries(
								Object.entries(resource).filter(([k]) => k !== "__typename")
							) as typeof resource
						}
						refetch={refetch}
						isLastElement={listData.items.length === 1}
						updatePage={() => setPage(Math.max(1, page - 1))}
					/>
				))}
			</div>

			<Pagination
				totalCount={listData.count}
				page={page}
				setPage={(num: number) => setPage(num)}
				hide={loading}
				entriesPerPage={LIST_CONFIG.LIMIT}
			/>
		</div>
	);
};
