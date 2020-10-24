import spawn from "cross-spawn-promise";
import fs from "fs";
import path from "path";
import chalk from "chalk";

/**
 * Compiles TypeScript via CLI.
 */
export async function compileTsc(opts: {
	module: string, configPath: string, continueOnError: boolean
}): Promise<void> {
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
	try {
		await spawn(commandPath, args, { stdio: "inherit" });
	} catch (e) {
		const error: spawn.CrossSpawnError = e;
		console.error(chalk.red("[rollup] failed!"));
		if (error.stderr) {
			console.error(chalk.red(error.stderr.toString()));
		}
		if (!opts.continueOnError) {
			process.exit(1);
		}
	}
}

/**
 * Rollup via CLI.
 */
export async function rollup(opts: {
	configPath: string, continueOnError: boolean, useTypeScriptConfig: boolean
}): Promise<void> {
	const args = [
		"-c",
		opts.configPath || opts.useTypeScriptConfig ? "./rollup.config.ts" : "./rollup.config.js",
	];
	console.log(chalk.blue(`rollup...`));

	const commandPath = getLocalDepOrRoot("node_modules/.bin/rollup");

	try {
		await spawn(commandPath, args, { stdio: "inherit" });
	} catch (e) {
		const error: spawn.CrossSpawnError = e;
		console.error(chalk.red("[rollup] failed!"));
		if (error.stderr) {
			console.error(chalk.red(error.stderr.toString()));
		}
		if (!opts.continueOnError) {
			process.exit(1);
		}
	}
}

/** Builds `microbundle` via CLI. */
export async function microbundle(opts: {
	continueOnError: boolean
}): Promise<void> {
	const args = [
		"build"
	];
	console.log(chalk.blue(`microbundle...`));

	const commandPath = getLocalDepOrRoot("node_modules/.bin/microbundle");

	try {
		await spawn(commandPath, args, { stdio: "inherit" });
	} catch (e) {
		const error: spawn.CrossSpawnError = e;
		console.error(chalk.red("[microbundle] failed!"));
		if (error.stderr) {
			console.error(chalk.red(error.stderr.toString()));
		}
		if (!opts.continueOnError) {
			process.exit(1);
		}
	}
}

function getLocalDepOrRoot(file: string): string {
	const localDep = path.join(__dirname, "../../", file);
	return fs.existsSync(localDep) ? localDep : file;
}
