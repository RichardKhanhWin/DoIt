'use client'

import { useState } from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';

export default function Checkbox({ name, defaultChecked, onClick }: { name: string, defaultChecked?: boolean, onClick?: () => any }) {
	const [checked, setChecked] = useState(defaultChecked || false);

	function handleClick() {
		setChecked(!checked);
		if (onClick) {
			onClick();
		}
	}

	return (
	<>
		<input name={name} checked={checked} type="checkbox" className="hidden" />
		<div className="h-6 w-6 bg-slate-200 border-black border-2 text-black" onClick={handleClick}>
			{ checked && <CheckIcon /> }
		</div>
	</>
	)
}