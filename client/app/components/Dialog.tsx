import { Cross1Icon } from "@radix-ui/react-icons";
import { ReactNode } from "react";

export const Dialog = ({
	title,
	children,
	open,
	setOpen,
}: {
	title: string;
	children: ReactNode;
	open: boolean;
	setOpen: (state: boolean) => void;
}) => {
	if (!open) {
		return <></>;
	}

	return (
		<div
			className="w-screen h-screen fixed inset-0 flex items-center justify-center backdrop-blur-sm z-20"
			onClick={() => setOpen(false)}
		>
			<div
				className="flex flex-col gap-2 w-2xl bg-gray-800 px-4 py-2 rounded-2xl"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="flex items-center justify-between border-b pb-2 border-gray-500">
					<h2 className="text-lg font-semibold">{title}</h2>
					<button
						className="cursor-pointer p-1 hover:opacity-90"
						onClick={() => setOpen(false)}
					>
						<Cross1Icon />
					</button>
				</div>

				{children}
			</div>
		</div>
	);
};
