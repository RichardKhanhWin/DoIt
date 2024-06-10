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
		<div className="absolute flex bg-gray-700 justify-center items-center top-0 right-0 bottom-0 left-0 z-50">
			<dialog ref={dialogRef} onClose={onDismiss} className="bg-blue-500 w-4/5 max-w-lg h-auto max-h-lg relative justify-center items-center">
				<button onClick={onDismiss}>
					<ArrowLeftIcon className="min-w-5 min-h-5" />
				</button>
				{children}
			</dialog>
		</div>,
		document.getElementById('modal-root')!
	);
}