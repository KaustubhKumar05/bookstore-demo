import { Cross1Icon } from "@radix-ui/react-icons";
import { FilterTypes, ResourceType } from "../types";
import { formattedKey } from "./utils";

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
	setFilters: (filter: any) => void;
	resourceType: ResourceType;
}) => {
	console.log({ filters });
	return (
		<div className="flex items-center gap-2">
			{Object.keys(filters[resourceType]).map((filter: string) => (
				<div className="flex flex-col" key={filter}>
					<label>{formattedKey[filter]}</label>
					<input
						{...FilterConfig[resourceType][filter]}
						className="border rounded px-2 py-1"
						type={FilterConfig[resourceType][filter].input.toString()}
						value={
							filters[resourceType][filter as keyof FilterTypes[ResourceType]]
						}
						onChange={(e) => {
							setFilters((prev) => {
								const newFilters = { ...prev };

								newFilters[resourceType][filter] =
									FilterConfig[resourceType][filter].input === "number"
										? Number(e.target.value)
										: e.target.value;
								return newFilters;
							});
						}}
					/>
				</div>
			))}
			<button className="bg-gray-800 p-2" style={{ borderRadius: "100%" }}>
				<Cross1Icon height={24} width={24} />
			</button>
		</div>
	);
};
