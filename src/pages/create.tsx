'use client';

import React, { useState } from "react";
import "@/app/globals.css";
import Router from "next/router";

export default function CreatePage() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");

	const onSubmit = async (e) => {
		e.preventDefault();

		try {
			const body = { title, description };
			await fetch("/api/items", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body)
			});

			await Router.push("/");
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<form className="flex flex-col items-center justify-between">
			<div className="flex flex-col">
				<label id="title">Title</label>
				<input className="text-black" name="title" onChange={(e) => setTitle(e.target.value)} value={title} />
			</div>

			<div className="flex flex-col">
				<label id="description">Description</label>
				<textarea className="text-black" name="description" onChange={(e) => setDescription(e.target.value)} value={description} />
			</div>

			<button onClick={onSubmit} value="Create">Create</button>
		</form>
	)
}