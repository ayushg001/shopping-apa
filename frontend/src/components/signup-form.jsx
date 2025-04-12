import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import React, { useState } from 'react';
export default function SignupForm() {

	const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

	let navigate = useNavigate();
	const signinRedirect = () => {
		navigate("/auth/login");
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("Form submitted");
			const res = await fetch("http://localhost:8080/api/users/register", {
			  method: "POST",                                     //   Tells the server you're sending data (not just getting)
			  headers: { "Content-Type": "application/json" },    // Tells backend it's JSON
			  body: JSON.stringify({                             // Converts your JS object into JSON format, so the server can understand it.
				firstName, lastName, email, password,
			  }),
			});
		  
			const data = await res.json();  
			console.log(data);
			//Once the response comes back, this line reads the JSON from it (the actual data your backend returned).
		  
			if (data.token) {
			  localStorage.setItem("token", data.token); // 🔐 save token
			  //Saves the JWT token in the browser's local storage (so that the user stays logged in on refresh, etc.)
			  navigate("/home");
			}
	  };
	return (
		<div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
			<h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
				Suit Up in Style!
			</h2>
			<p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
				Register now and start shopping epic superhero tees that even the
				Avengers would envy.
			</p>
			<form className="my-8" onSubmit={handleSubmit}  >
				<div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
					<LabelInputContainer>
						<Label htmlFor="firstname">First name</Label>
						<Input id="firstname" placeholder="Tyler" type="text" value={firstName}
                          onChange={(e) => setFirstName(e.target.value)} />
					</LabelInputContainer>
					<LabelInputContainer>
						<Label htmlFor="lastname">Last name</Label>
						<Input id="lastname" placeholder="Durden" type="text"  value={lastName}
                          onChange={(e) => setLastName(e.target.value)} />
					</LabelInputContainer>
				</div>
				<LabelInputContainer className="mb-4">
					<Label htmlFor="email">Email Address</Label>
					<Input id="email" placeholder="projectmayhem@fc.com" type="text" value={email}
                      onChange={(e) => setEmail(e.target.value)} />
				</LabelInputContainer>
				<LabelInputContainer className="mb-4">
					<Label htmlFor="password">Password</Label>
					<Input id="password" placeholder="••••••••" type="text"   value={password}
                       onChange={(e) => setPassword(e.target.value)} />
				</LabelInputContainer>
				<button
					className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
					type="submit"
				>
					Sign up &rarr;
					<BottomGradient />
				</button>

				<div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

				<div className="flex items-center justify-center">
					<Button variant="link" onClick={signinRedirect}>
						already have an account ? login here.
					</Button>
				</div>
			</form>
		</div>
	);
}

const BottomGradient = () => {
	return (
		<>
			<span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
			<span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
		</>
	);
};

const LabelInputContainer = ({ children, className }) => {
	return (
		<div className={cn("flex w-full flex-col space-y-2", className)}>
			{children}
		</div>
	);
};
