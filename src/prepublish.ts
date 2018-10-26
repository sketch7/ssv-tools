import fs from "fs";
import path from "path";
import cpx from "cpx";
// import chalk from "chalk";

/**
 * Prepare for prepublish, as copy files such as `README.md`, `CHANGELOG.md`, copy and transform `package.json`
 */
export async function prepublish(distPath = "dist") {
	// console.log(chalk`{blue [prepublish]} {yellow starting...}`);

	await writePackageTransform(distPath);

	const contentFileNames = ["LICENSE", "README.md", "CHANGELOG.md"];
	for (const contentFileName of contentFileNames) {
		cpx.copySync(contentFileName, distPath);
	}
}

/**
 * Copy and transform package.json for publishing.
 */
export async function writePackageTransform(distPath = "dist") {
	const pkgKeysNormalizePaths = ["main", "umd:main", "module", "typings"];
	const pkgRemoveKeys = ["scripts", "devDependencies", "jest"];

	const pkg = JSON.parse(fs.readFileSync("./package.json", "utf-8"));

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

	await fs.promises.writeFile(path.join(distPath, "package.json"), JSON.stringify(pkg, undefined, 2));
}

function replaceAll(value: string, search: string, replacement: string): string {
	return value.replace(new RegExp(`\\${search}`, "g"), replacement);
}