"use client";
import { useQuery } from "@apollo/client";
import { InfoCircledIcon, Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import { GET_AUTHORS, GET_BOOKS } from "../queries";
import { ResourceType } from "../types";
import { useEffect, useState } from "react";
import { Pagination } from "./Pagination";

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
				{data[resourceType + "s"].items.map(
					(resource: Record<string, string>) => (
						<div
							className="bg-gray-800 flex items-center gap-4 px-4 py-2 rounded my-1"
							key={resource.id}
						>
							<p className="text-sm font-bold">{resource.id}</p>
							<div>
								<p className="font-semibold">
									{isAuthor ? resource?.name : resource.title} -{" "}
									{new Date(
										isAuthor ? resource.bornDate : resource.publishedDate
									).toDateString()}
								</p>
								<p className="text-sm">
									{isAuthor ? resource.biography : resource.description}
								</p>
							</div>
							<div className="ml-auto flex gap-4">
								<button className="p-2 rounded bg-black cursor-pointer hover:opacity-90">
									<InfoCircledIcon />
								</button>
								<button className="p-2 rounded bg-black cursor-pointer hover:opacity-90">
									<Pencil2Icon />
								</button>
								<button className="p-2 rounded bg-red-500 cursor-pointer hover:opacity-90">
									<TrashIcon strokeWidth={24} />
								</button>
							</div>
						</div>
					)
				)}
			</div>

			<Pagination
				totalCount={data[resourceType + "s"].count}
				page={page}
				setPage={(num: number) => setPage(num)}
				hide={loading}
				itemsPerPage={CONFIG.LIMIT}
			/>
		</div>
	);
};
