"use client"

import { useState, useEffect } from "react";
import "@/styles/variables.css";
import css from "@/styles/themetoggle.module.css";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

export default function ThemeToggle() {
	const [theme, setTheme] = useState("");

	const toggleTheme = () => {
		if (theme == "light") {
			setTheme("dark");
		} else if (theme == "dark") {
			setTheme("light");
		}
	}

	const buttonIcon = () => {
		switch (theme) {
			case "dark": return (<SunIcon />);
			case "light": return (<MoonIcon />);
		}
	}

	const defaultTheme = () => {
		const themeLocalStorage = localStorage.getItem("theme");
		const themeSystem = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

		return themeLocalStorage ?? themeSystem;
	}

	useEffect(() => {
		if (!theme) {
			return setTheme(defaultTheme());
		}

		document.querySelector(":root")!.dataset.theme = theme;
		localStorage.setItem("theme", theme);

		const useSetTheme = (e: MediaQueryListEvent) => { setTheme(e.matches ? "dark" : "light") };
		const watchSysTheme = window.matchMedia("(prefers-color-scheme: dark)");

		watchSysTheme.addEventListener("change", useSetTheme);

		return () => {
			watchSysTheme.removeEventListener("change", useSetTheme);
		}
	}, [theme]);

	return (
		<>
			<button onClick={toggleTheme} data-theme={theme} className={css.toggle}>
				{buttonIcon()}
			</button>
		</>
	)
}