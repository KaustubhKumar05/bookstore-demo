import { useMutation } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { LOGIN, SIGNUP } from "../queries";

export const AuthFlow = ({ flow }: { flow: "signUp" | "logIn" }) => {
	const isSignUp = flow === "signUp";
	const usernameRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const router = useRouter();
	const [auth, { data, loading, error }] = useMutation(
		isSignUp ? SIGNUP : LOGIN,
		{ fetchPolicy: "network-only" }
	);

	useEffect(() => {
		if (!window?.sessionStorage) {
			return;
		}
		if (data?.[flow]?.token) {
			sessionStorage.setItem("userData", JSON.stringify(data[flow]));
		}
		if (sessionStorage.getItem("userData")) {
			router.push("/");
		}
	}, [data, router, flow]);

	return (
		<div className="w-full h-screen flex items-center justify-center">
			<main className="flex flex-col gap-4 bg-gray-800 px-8 py-6 rounded-md max-w-2xs w-full">
				{error && (
					<p className="text-xl font-bold my-5 text-red-500 text-center">
						Error: {error.message}
					</p>
				)}
				<h1 className="text-lg font-bold text-center">
					{isSignUp ? "Sign up" : "Log in"} to continue
				</h1>

				<input
					required
					className="border-2 rounded px-2 py-1 text-center"
					type="text"
					ref={usernameRef}
					disabled={loading}
					placeholder="Username"
				/>

				<input
					required
					className="border-2 rounded px-2 py-1 text-center"
					type="password"
					ref={passwordRef}
					disabled={loading}
					placeholder="Password"
				/>
				<button
					disabled={loading}
					onClick={async () => {
						const username = usernameRef.current?.value;
						const password = passwordRef.current?.value;
						if (username && password) {
							await auth({
								variables: {
									input: { username, password },
								},
							});
						} else {
							alert("Please enter the username and password!");
						}
					}}
					className="bg-black px-4 py-2 rounded"
				>
					{isSignUp
						? loading
							? "Signing up..."
							: "Sign in"
						: loading
						? "Loggin in..."
						: "Log in"}
				</button>
				<Link
					className="font-semibold text-sm hover:opacity-80 text-center"
					href={isSignUp ? "/login" : "/signup"}
				>
					<p>
						{isSignUp
							? "Already have an account? Log in"
							: "Create a new account"}
					</p>
				</Link>
			</main>
		</div>
	);
};
