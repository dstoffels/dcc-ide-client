import IDE from '../components/IDE/IDE';

export default function Home() {
	return (
		<main className="font-mono">
			<IDE initLanguage="javascript" />
		</main>
	);
}
