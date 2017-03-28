import * as spawn from "cross-spawn-promise";
import * as fs from "fs";
import * as path from "path";
import * as chalk from "chalk";

/**
 * Compiles TypeScript via CLI.
 */
export function compileTsc(opts: {
	module: string, configPath: string, continueOnError: boolean
}): Promise<Uint8Array> {
	const args = [
		"-p",
		opts.configPath || "./tsconfig.json",
	];
	if (opts.module) {
		args.push("--module");
		args.push(opts.module);
		args.push("--outDir");
		args.push(`dist/${opts.module}`);
	}
	console.log(chalk.blue(`compile tsc (${opts.module})...`));

	const commandPath = getLocalDepOrRoot("node_modules/.bin/tsc");
	return spawn(commandPath, args, { stdio: "inherit" })
		.catch((error: spawn.CrossSpawnError) => {
			console.error(chalk.red("[compileTsc] failed!"));
			console.error(chalk.red(error.stderr.toString()));
			if (!opts.continueOnError) {
				process.exit(1);
			}
		});
}

/**
 * Rollup via CLI.
 */
export function rollup(opts: {
	configPath: string, continueOnError: boolean
}): Promise<Uint8Array> {
	const args = [
		"-c",
		opts.configPath || "./rollup.config.js",
	];
	console.log(chalk.blue(`rollup...`));

	const commandPath = getLocalDepOrRoot("node_modules/.bin/rollup");
	return spawn(commandPath, args, { stdio: "inherit" })
		.catch((error: spawn.CrossSpawnError) => {
			console.error(chalk.red("[rollup] failed!"));
			console.error(chalk.red(error.stderr.toString()));
			if (!opts.continueOnError) {
				process.exit(1);
			}
		});
}

function getLocalDepOrRoot(file: string): string {
	const localDep = path.join(__dirname, "../../", file);
	return fs.existsSync(localDep) ? localDep : file;
}