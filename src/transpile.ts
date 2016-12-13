const spawn = require("cross-spawn-promise");
const path = require("path");
import * as chalk from "chalk";

/**
 * Compiles TypeScript via CLI.
 */
export function compileTsc(opts: {
	module: string, configPath: string, continueOnError: boolean
}): Promise<any> {
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
	console.log(chalk.blue(`compileTsc (${opts.module})...`));
	return spawn(path.join(__dirname, "../../node_modules/.bin/tsc"), args, { stdio: "inherit" })
		.catch((error: any) => {
			if (!error) {
				return;
			}
			console.error(chalk.red("[compileTsc] failed!"));
			console.error(chalk.red(error.stderr ? error.stderr.toString() : error));
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
}): Promise<any> {
	const args = [
		"-c",
		opts.configPath || "./rollup.config.js",
	];
	console.log(chalk.blue(`rollup...`));
	return spawn(path.join(__dirname, "../../node_modules/.bin/rollup"), args, { stdio: "inherit" })
		.catch((error: any) => {
			if (!error) {
				return;
			}
			console.error(chalk.red("[rollup] failed!"));
			console.error(chalk.red(error.stderr ? error.stderr.toString() : error));
			if (!opts.continueOnError) {
				process.exit(1);
			}
		});
}