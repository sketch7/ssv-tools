import fs from "fs";
import path from "path";
import cpx from "cpx";
import { readPackageJson } from "./internal";
import chalk from "chalk";


export interface PrepareReleaseBuildOptions {
	filePath: string;
	versionPlaceholder: string;
	shouldSkip: boolean;
}

const PREPARE_RELEASE_DEFAULT_OPTIONS = Object.freeze({
	filePath: "src/version.ts",
	versionPlaceholder: "0.0.0-PLACEHOLDER",
} as PrepareReleaseBuildOptions);

/**
 * Build resource for publishing, copy files such as `README.md`, `CHANGELOG.md`, copy and transform `package.json`
 */
export async function buildResources(distPath = "dist") {
	// console.log(chalk`{blue [buildResources]} {yellow starting...}`);

	await writePackageTransform(distPath);

	const contentFileNames = ["LICENSE", "README.md", "CHANGELOG.md"];
	for (const contentFileName of contentFileNames) {
		cpx.copySync(contentFileName, distPath);
	}
}

/** Update version etc... Generally must be invoked before building release. */
export async function prepareReleaseBuild(options: Partial<PrepareReleaseBuildOptions> = {}) {
	options = { ...PREPARE_RELEASE_DEFAULT_OPTIONS, ...options };

	if (options.shouldSkip) {
		console.log(chalk`{blue [prepareReleaseBuild]} {gray skipping...}`);
		return;
	}

	await writeCodeVersion();
}

/**
 * Copy and transform package.json for publishing.
 */
export async function writePackageTransform(distPath = "dist") {
	const pkgKeysNormalizePaths = [
		"main", "umd:main", "module", "typings", "es2015",
		"esm5", "esm2015", "fesm5", "fesm2015", "metadata",
		"esnext"
	];
	const pkgRemoveKeys = ["scripts", "devDependencies", "jest"];

	const pkg = readPackageJson();

	for (const key of pkgRemoveKeys) {
		delete pkg[key];
	}

	// fix paths such as "main"
	for (const key of pkgKeysNormalizePaths) {
		const pathToNormalize = pkg[key];
		if (!pathToNormalize) {
			continue;
		}
		const relativePath = path.relative(distPath, pathToNormalize);
		pkg[key] = replaceAll(relativePath, path.win32.sep, path.posix.sep);
	}

	if (!fs.existsSync(distPath)) {
		fs.mkdirSync(distPath);
	}
	await fs.promises.writeFile(path.join(distPath, "package.json"), JSON.stringify(pkg, undefined, 2));
}

/** Write package version onto code placeholder.  */
export async function writeCodeVersion(filePath = "src/version.ts", versionPlaceholder = "0.0.0-PLACEHOLDER") {
	console.log("Update version...");
	if (!fs.existsSync(filePath)) {
		console.log("File not exists", filePath);
		return;
	}

	let fileContents = await fs.promises.readFile(filePath, { encoding: "utf-8" });
	if (!fileContents || typeof fileContents !== "string") {
		console.log("File empty", fileContents);
		return;
	}

	const pkgVersion = readPackageJson().version;
	fileContents = fileContents.replace(versionPlaceholder, pkgVersion);

	await fs.promises.writeFile(filePath, fileContents);
}

function replaceAll(value: string, search: string, replacement: string): string {
	return value.replace(new RegExp(`\\${search}`, "g"), replacement);
}