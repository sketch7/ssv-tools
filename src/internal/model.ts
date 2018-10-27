export interface Dictionary<T = any> {
	[key: string]: T;
}

export interface PackageFormat {
	[key: string]: any;

	name: string;
	version: string;
	descripion?: string;
	keywords?: string[];
	author?: string;
	license?: string;

	main?: string;
	typings?: string;

	scripts?: Dictionary<string>;
	dependencies?: Dictionary<string>;
	devDependencies?: Dictionary<string>;
	peerDependencies?: Dictionary<string>;
	bin?: Dictionary<string>;
}