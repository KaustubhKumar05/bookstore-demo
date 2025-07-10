"use client";
import { useMutation } from "@apollo/client";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { SIGNUP } from "../queries";
import Link from "next/link";

export default function SignupPage() {
	const usernameRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const router = useRouter();
	const [signUp, { data, loading, error }] = useMutation(SIGNUP);

	useEffect(() => {
		if (data?.signUp?.token) {
			console.log({ data });
			sessionStorage.setItem("token", data.signUp.token);
			console.log("pushing");
			router.push("/");
		}
	}, [data, router]);

	return (
		<div className="w-full h-screen flex items-center justify-center">
			<main className="flex flex-col gap-4 bg-gray-800 px-8 py-6 rounded-md max-w-2xs w-full">
				{error && (
					<p className="text-xl font-bold my-5 text-red-500 text-center">
						Error: {error.message}
					</p>
				)}
				<h1 className="text-lg font-bold text-center">Sign up to continue</h1>

				<input
					required
					className="border-2 rounded px-2 py-1 text-center"
					type="text"
					ref={usernameRef}
					placeholder="Username"
				/>

				<input
					required
					className="border-2 rounded px-2 py-1 text-center"
					type="password"
					ref={passwordRef}
					placeholder="Password"
				/>
				<button
					disabled={loading}
					onClick={async () => {
						const username = usernameRef.current?.value;
						const password = passwordRef.current?.value;
						if (username && password) {
							await signUp({
								variables: {
									input: { username, password },
								},
							});
						}
					}}
					className="bg-black px-4 py-2 rounded"
				>
					{loading ? "Signing up..." : "Sign up"}
				</button>
				<Link
					className="font-semibold text-sm hover:opacity-80 text-center"
					href="/login"
				>
					<p>Already have an account? Log in</p>
				</Link>
			</main>
		</div>
	);
}
