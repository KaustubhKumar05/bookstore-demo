import { Cross1Icon } from "@radix-ui/react-icons";
import { FilterTypes, ResourceType } from "../types";
import { DEFAULT_FILTERS, formattedKey } from "./utils";
import { cloneDeep } from "lodash";

const FilterConfig: Record<
	ResourceType,
	Record<string, Record<string, string | number>>
> = {
	author: {
		name: { input: "text" },
		birthYear: { input: "number", min: 1900, max: 2025 },
	},
	book: {
		title: { input: "text" },
		authorName: { input: "text" },
		publishedAfter: { input: "date" },
		publishedBefore: { input: "date" },
	},
};

export const Filter = ({
	filters,
	setFilters,
	resourceType,
}: {
	filters: FilterTypes;
	setFilters: (filter: FilterTypes) => void;
	resourceType: ResourceType;
}) => {
	const noFiltersApplied = !Object.keys(filters[resourceType]).some(
		(key) =>
			filters[resourceType][key as keyof (typeof filters)[typeof resourceType]]
	);
	return (
		<div className="flex flex-col md:flex-row items-center md:items-end w-full justify-center gap-4">
			{Object.keys(filters[resourceType]).map((filter) => (
				<div className="flex flex-col w-full md:max-w-1/4 gap-1" key={filter}>
					<label className="font-semibold text-sm">
						{formattedKey[filter]}
					</label>
					<input
						{...FilterConfig[resourceType][filter]}
						className="border-2 rounded px-2 py-1 w-full"
						type={FilterConfig[resourceType][filter].input.toString()}
						value={
							filters[resourceType][
								filter as keyof (typeof filters)[typeof resourceType]
							] ?? ""
						}
						onChange={(e) => {
							setFilters((prev) => {
								const newFilters = cloneDeep(prev);
								const key =
									filter as keyof (typeof newFilters)[typeof resourceType];
								const inputType = FilterConfig[resourceType][filter].input;
								let value: any = e.target.value;
								if (inputType === "number") {
									value = value === "" ? null : Number(value);
								} else if (inputType === "date") {
									value = value === "" ? null : value;
								} else {
									value = value === "" ? null : value;
								}
								newFilters[resourceType][key] = value;
								return newFilters;
							});
						}}
					/>
				</div>
			))}
			{!noFiltersApplied && (
				<button
					title="Clear filters"
					className="bg-gray-900 p-1.5"
					style={{ borderRadius: "100%" }}
					onClick={() => setFilters(cloneDeep(DEFAULT_FILTERS))}
				>
					<Cross1Icon height={24} width={24} />
				</button>
			)}
		</div>
	);
};
