[projectUri]: https://github.com/sketch7/ssv-tools
[projectGit]: https://github.com/sketch7/ssv-tools.git
[changeLog]: ./doc/CHANGELOG.md

[contribWiki]: ./doc/CONTRIBUTION.md
[releaseWorkflowWiki]: ./doc/RELEASE-WORKFLOW.md

[npm]: https://www.npmjs.com

# ssv-tools
[![Build status](https://ci.appveyor.com/api/projects/status/2e0an5hvxtfs08mf?svg=true)](https://ci.appveyor.com/project/chiko/ssv-tools)
[![Build status](https://ci.appveyor.com/api/projects/status/2e0an5hvxtfs08mf/branch/master?svg=true)](https://ci.appveyor.com/project/chiko/ssv-tools/branch/master)
[![bitHound Overall Score](https://www.bithound.io/github/sketch7/ssv-tools/badges/score.svg)](https://www.bithound.io/github/sketch7/ssv-tools)
[![npm version](https://badge.fury.io/js/ssv-tools.svg)](https://badge.fury.io/js/ssv-tools)

frontend tooling for builds, lints etc...
includes sharing of the following configs:
 - `.eslintrc`
 - `tslint.json`
 - `tsconfig.json`


In order to contribute please read the [Contribution guidelines][contribWiki].

**Quick links**

[Change logs][changeLog] | [Project Repository][projectUri] | [Contribution guidelines][contribWiki]

# Installation

Get library via [npm]
```bash
npm install @ssv/tools --save
```

# Usage

## Base configs

### eslint
```json
{
	"extends": "./node_modules/@ssv/tools/base.eslintrc"
}
```

### tslint
```json
{
	"extends": [
		"./node_modules/@ssv/tools/tslint.base.json"
	]
}
```

### tsconfig
```json
{
	"extends": "./node_modules/@ssv/tools/tsconfig.base.json"
}
```

# Getting Started

## Setup Machine for Development
Install/setup the following:

- NodeJS v6+
- Visual Studio Code or similar code editor
- TypeScript 2.0+
- Git + SourceTree, SmartGit or similar (optional)
- Ensure to install **global NPM modules** using the following:


```bash
npm install -g git gulp karma-cli
```


### Cloning Repo

- Run `git clone https://github.com/sketch7/ssv-tools.git`
- Switch to `develop` branch


## Project Setup
The following process need to be executed in order to get started.

```bash
npm install
```


## Building the code

```
npm run build
```