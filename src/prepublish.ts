import fs from "fs";
import path from "path";
import cpx from "cpx";
// import chalk from "chalk";

export interface PackageFormat {
	[key: string]: any;

	name: string;
	version: string;
	scripts?: string;
	dependencies?: any[];
}

export interface PrepublishOptions {
	distPath: string;
	// distPath: string;
}

/**
 * Prepare for prepublish, as copy files such as `README.md`, `CHANGELOG.md`, copy and transform `package.json`
 */
export async function prepublish(distPath = "dist") {
	// console.log(chalk`{blue [prepublish]} {yellow starting...}`);

	await writePackageTransform(distPath);
	await writePackageVersionPlaceholder();

	const contentFileNames = ["LICENSE", "README.md", "CHANGELOG.md"];
	for (const contentFileName of contentFileNames) {
		cpx.copySync(contentFileName, distPath);
	}
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

export async function writePackageVersionPlaceholder(filePath = "src/version.ts", versionPlaceholder = "0.0.0-PLACEHOLDER") {
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
	fileContents =	fileContents.replace(versionPlaceholder, pkgVersion);

	await fs.promises.writeFile(filePath, fileContents);
}

function readPackageJson(): PackageFormat {
	return JSON.parse(fs.readFileSync("./package.json", "utf-8"));
}

function replaceAll(value: string, search: string, replacement: string): string {
	return value.replace(new RegExp(`\\${search}`, "g"), replacement);
}