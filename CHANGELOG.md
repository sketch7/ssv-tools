## [0.8.0](https://github.com/sketch7/ssv-tools/compare/0.7.5...0.8.0) (2018-10-27)

### Features

- **prepublish:** now normalizes much more paths for properties such as `esnext`, `es2015`, etc...
- **prepublish:** add `prepareReleaseBuild` which update a placeholder version from `package.json`


### BREAKING CHANGES

- **prepublish:**  rename `prepublish` to `buildResources`


## [0.7.5](https://github.com/sketch7/ssv-tools/compare/0.7.4...0.7.5) (2018-10-27)

### Bug Fixes

- **prepublish:** create `dist` directory if not found, instead of throwing


## [0.7.4](https://github.com/sketch7/ssv-tools/compare/0.7.3...0.7.4) (2018-10-27)

### Features

- **transpile:** rollup now supports config in `.ts`


### Bug Fixes

- **install:** remove devDependency from `@ssv/core` since it was circular and causing it not to install properly


## [0.7.3](https://github.com/sketch7/ssv-tools/compare/0.7.2...0.7.3) (2018-10-27)

### Features

- **config:** add `esModuleInterop` to `true` in tsconfig by default


### Bug Fixes

- **prepublish:** not correctly check whether key exists when transforming package.json
- **prepublish:** path was not unix format on windows when transforming package.json paths


## [0.7.2](https://github.com/sketch7/ssv-tools/compare/0.7.1...0.7.2) (2018-10-25)

### Features

- **prepublish:** implement `prepublish` which invokes `writePackageTransform` + copy contents such as `CHANGELOG.md`, `LICENSE` etc...
- **prepublish:** implement `writePackageTransform`


## [0.7.1](https://github.com/sketch7/ssv-tools/compare/0.7.0...0.7.1) (2018-10-25)

### Bug Fixes

- **configs:** several configs were being ignored in npm pack


## [0.7.0](https://github.com/sketch7/ssv-tools/compare/0.6.12...0.7.0) (2018-10-24)

### Features

- **deps:** update all dependencies

### BREAKING CHANGES

- configs has been removed to `/config` and remove `base` from the naming
