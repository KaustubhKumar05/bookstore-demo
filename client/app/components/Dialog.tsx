import { Cross1Icon } from "@radix-ui/react-icons";
import { ReactNode } from "react";

const width = {
	md: "w-md",
	xl: "w-xl",
};

export const Dialog = ({
	title,
	children,
	open,
	setOpen,
	size = "xl",
}: {
	title: string;
	children: ReactNode;
	open: boolean;
	setOpen: (state: boolean) => void;
	size?: "md" | "xl";
}) => {
	if (!open) {
		return <></>;
	}

	return (
		<div
			className="w-screen h-screen fixed inset-0 flex items-center justify-center backdrop-blur-sm z-20 bg-black/50 shadow-lg"
			onClick={() => setOpen(false)}
		>
			<div
				className={`flex flex-col gap-2 mx-4 ${width[size]} bg-gray-800 px-6 py-4 rounded-2xl`}
				onClick={(e) => e.stopPropagation()}
			>
				<div className="flex items-center justify-between border-b pb-2 border-gray-500">
					<h2 className="text-lg font-semibold">{title}</h2>
					<button className="p-1" onClick={() => setOpen(false)}>
						<Cross1Icon />
					</button>
				</div>

				{children}
			</div>
		</div>
	);
};
