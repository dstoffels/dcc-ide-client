import { loader } from '@monaco-editor/react';
import useMonaco from 'hooks/useMonaco';
import { useEffect } from 'react';

const Shortcuts = ({ onSave, onEnter }: ShortCutsProps) => {
	const onEnterOverride = async () => {
		const monaco = await useMonaco();

		monaco.editor.addEditorAction({
			id: 'run-coded',
			label: 'Run Code',
			// @ts-ignore
			run: onEnter,
			keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter],
		});
	};

	useEffect(() => {
		onEnterOverride();

		const handleKeyDown = (event: any) => {
			// CTRL/CMD + S
			if ((event.ctrlKey || event.metaKey) && event.key === 's') {
				event.preventDefault();
				onSave && onSave();
			}

			// CTRL/CMD + ENTER
			if ((event.ctrlKey || event.metaKey) && event.key === 'enter') {
				event.preventDefault();
				onEnter && onEnter();
			}
		};

		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [onSave, onEnter]);

	return null;
};

export default Shortcuts;

export interface ShortCutsProps {
	onSave?: Function;
	onEnter?: Function;
}
