import simpleGit from "simple-git/promise";
import spawn from "cross-spawn-promise";
import chalk from "chalk";

/**
 * Perform auto-publishing sequence.
 * - checkout `master`
 * - merge from `develop`
 * - perform publish (can be overriden) via `publishFn`
 * - downmerge `master` to `develop`
 *
 * @param $args arguments to be passed.
 */
export async function publisher($args: {
	publishFn?: (bump: string) => Promise<void>,
	bump: string
}): Promise<void> {
	const args = { publishFn: performGulpPublish, ...$args };
	const git = simpleGit();

	await mergeLatest({
		git,
		from: "develop",
		to: "master"
	});

	await args.publishFn(args.bump);

	await mergeLatest({
		git,
		from: "master",
		to: "develop"
	});
}

async function performGulpPublish(bump: string): Promise<void> {
	if (!bump) {
		throw Error(`[performGulpPublish] bump was not specified!`);
	}

	const cmds = [
		"publish",
		"--rel",
		"--bump",
		bump
	];
	try {
		const result = await spawn("gulp", cmds);
		console.log(chalk.green("[performGulpPublish] success!"));
		console.log(result.toString());
	} catch (e) {
		const error: spawn.CrossSpawnError = e;
		console.error(chalk.red("[performGulpPublish] failed!"));
		if (error.stderr) {
			console.error(chalk.red(error.stderr.toString()));
		}
		throw e;
	}
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

	await git.push();
}