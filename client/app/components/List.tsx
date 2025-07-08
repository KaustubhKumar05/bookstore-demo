"use client";
import { useQuery } from "@apollo/client";
import { GET_AUTHORS, GET_BOOKS } from "../queries";
import { Author, Book, ResourceType } from "../types";
import { useEffect, useState } from "react";
import { Pagination } from "./Pagination";
import { ResourceEntry } from "./ResourceEntry";

const CONFIG = {
	LIMIT: 5,
	OFFSET: 0,
};

export const List = ({ resourceType }: { resourceType: ResourceType }) => {
	const isAuthor = resourceType === "author";
	const [page, setPage] = useState(1);

	const { data, loading, error } = useQuery(
		isAuthor ? GET_AUTHORS : GET_BOOKS,
		{
			variables: {
				limit: CONFIG.LIMIT,
				offset: (page - 1) * CONFIG.LIMIT,
				filter: {},
			},
		}
	);
	console.log("debug>", { data, loading, error });

	useEffect(() => {
		setPage(1);
	}, [resourceType]);

	if (error) {
		return <p>Error: {error.message}</p>;
	}
	if (loading) {
		return <p>Loading...</p>;
	}

	return (
		<div className="max-w-3xl flex flex-col gap-4">
			<div>
				{data[resourceType + "s"].items.map((resource: Author | Book) => (
					<ResourceEntry key={resource.id + resourceType} resource={resource} />
				))}
			</div>

			<Pagination
				totalCount={data[resourceType + "s"].count}
				page={page}
				setPage={(num: number) => setPage(num)}
				hide={loading}
				entriesPerPage={CONFIG.LIMIT}
			/>
		</div>
	);
};
