export const Pagination = ({
	page,
	setPage,
	entriesPerPage,
	totalCount,
	hide = false,
}: {
	totalCount: number;
	page: number;
	entriesPerPage: number;
	setPage: (num: number) => void;
	hide: boolean;
}) => {
	const pages: number[] = Array.from(
		{
			length: Math.ceil(totalCount / entriesPerPage),
		},
		(_, index) => index
	);
	console.log({ totalCount, page, pages });
	return (
		<div
			className={`flex gap-2 justify-center ${
				hide ? "opacity-0 pointer-events-none" : ""
			}`}
		>
			{pages.map((index) => (
				<button
					key={index}
					className={`px-3 py-1 font-bold ${
						page === index + 1 ? "bg-gray-900" : "bg-gray-800"
					} tabular-nums`}
					onClick={() => setPage(index + 1)}
				>
					{index + 1}
				</button>
			))}
		</div>
	);
};
