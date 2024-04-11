'use client';

import React, { useState } from "react";

export default function CreatePage() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");

	const onSubmit = (e) => {
		e.preventDefault();
	}

	return (
		<form>
			<label id="title">Title</label>
			<input name="title" />

			<label id="description">Description</label>
			<textarea name="description"/>

			<button onClick={onSubmit}>Create</button>
		</form>
	)
}