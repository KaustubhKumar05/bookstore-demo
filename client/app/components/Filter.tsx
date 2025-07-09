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
		<div className="flex items-center gap-2">
			{Object.keys(filters[resourceType]).map((filter) => (
				<div className="flex flex-col" key={filter}>
					<label className="text-sm">{formattedKey[filter]}</label>
					<input
						{...FilterConfig[resourceType][filter]}
						className="border rounded px-2 py-1"
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
					className="bg-gray-800 p-2"
					style={{ borderRadius: "100%" }}
					onClick={() => setFilters(cloneDeep(DEFAULT_FILTERS))}
				>
					<Cross1Icon height={24} width={24} />
				</button>
			)}
		</div>
	);
};
