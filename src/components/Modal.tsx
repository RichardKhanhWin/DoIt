'use client';

import { type ElementRef, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

export default function Modal({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const dialogRef = useRef<ElementRef<'dialog'>>(null);

	useEffect(() => {
		if (!dialogRef.current?.open) {
			dialogRef.current?.showModal();
		}
	}, []);

	function onDismiss() {
		router.back();
	}

	return createPortal(
		<div className="absolute flex bg-gray-700 bg-opacity-80 justify-center items-center top-0 right-0 bottom-0 left-0">
			<dialog ref={dialogRef} onClose={onDismiss} className="flex flex-col w-4/5 max-w-lg min-h-[400px] justify-center p-2 dark:bg-blue-950">
				<button onClick={onDismiss}>
					<ArrowLeftIcon className="max-w-[20px] max-h-[20px] dark:text-white" />
				</button>
				{children}
			</dialog>
		</div>,
		document.getElementById('modal-root')!
	);
}