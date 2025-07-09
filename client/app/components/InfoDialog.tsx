import { useQuery } from "@apollo/client";
import { Author, Book } from "../types";
import { Dialog } from "./Dialog";
import { formattedKey, isAuthor } from "./utils";
import { GET_AUTHOR, GET_REVIEWS } from "../queries";
import { Reviews } from "./Reviews";

export const InfoDialog = ({
	resource,
	open,
	setOpen,
	title,
}: {
	resource: Book | Author;
	open: boolean;
	setOpen: (state: boolean) => void;
	title: string;
}) => {
	const author = isAuthor(resource);
	const { data, loading } = useQuery(GET_REVIEWS, {
		variables: { bookId: resource.id },
		skip: author,
		fetchPolicy: "cache-and-network",
	});

	const { data: authorData } = useQuery(GET_AUTHOR, {
		variables: { id: (resource as Book).authorId },
		fetchPolicy: "network-only",
		skip: author,
	});

	return (
		<Dialog title={title} open={open} setOpen={setOpen}>
			<div className="flex flex-col">
				{Object.keys(resource)
					.filter((key) => !key.toLowerCase().includes("id"))
					.map((key) => (
						<div
							className="flex flex-col gap-1 my-0.5 py-1 w-full text-sm border-dashed"
							key={key}
						>
							<span className="w-40 font-semibold text-gray-300">
								{formattedKey[key]}
							</span>
							<span>{resource[key as keyof (Book | Author)]}</span>
						</div>
					))}
				{authorData && (
					<>
						<span className="w-40 font-semibold text-gray-300">Author</span>
						<span>{authorData?.author?.name}</span>
					</>
				)}
				{!author && !loading && (
					<Reviews reviews={data?.reviews} loading={loading} />
				)}

				<div className="flex justify-center items-center w-full mt-4">
					<button
						className="px-4 py-2 bg-black text-sm"
						onClick={() => setOpen(false)}
					>
						Close
					</button>
				</div>
			</div>
		</Dialog>
	);
};
