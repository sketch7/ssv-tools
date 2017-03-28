import * as simpleGit from "simple-git/promise";

// todo: rename publisher?
export async function magicPublish($args: {
	publishFn?: () => Promise<void>
}) {
	const args = { publishFn: performPublish, ...$args };
	const git = simpleGit();

	await mergeLatest({
		git,
		from: "develop",
		to: "master"
	});

	await args.publishFn();

	await mergeLatest({
		git,
		from: "master",
		to: "develop"
	});
}

async function performPublish() {
	throw new Error("performPublish not implemented");
}

async function mergeLatest($args: {
	git: simpleGit.SimpleGit,
	from: string;
	to: string
}) {
	const { git, to, from } = $args;

	const checkoutResult = await git.checkout(to);
	console.log("[mergeLatest] checkoutResult", checkoutResult);

	await git.pull();

	const mergeFromToResult = await git.mergeFromTo(from, to);
	console.log("[mergeLatest] mergeFromToResult", mergeFromToResult);

	// await git.push();
}