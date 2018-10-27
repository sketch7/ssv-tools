
import fs from "fs";
import { PackageFormat } from "./model";

export function readPackageJson(): PackageFormat {
	return JSON.parse(fs.readFileSync("./package.json", "utf-8"));
}