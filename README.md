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
[![npm version](https://badge.fury.io/js/%40ssv%2Ftools.svg)](https://badge.fury.io/js/%40ssv%2Ftools)

tools and utilities used for builds and develop sketch7 (ssv) libraries.
includes sharing of the following configs:
 - `.eslintrc`
 - `.stylelintrc`
 - `tslint.json`
 - `tsconfig.json`


In order to contribute please read the [Contribution guidelines][contribWiki].

**Quick links**

[Change logs][changeLog] | [Project Repository][projectUri] | [Contribution guidelines][contribWiki]

## Installation

Get library via [npm]
```bash
npm install @ssv/tools --save
```

## Usage

### API

```ts
import { compileTsc, rollup } from "@ssv/tools";

// compile typescript - execute typescript with cli.
compileTsc({
    module: "es2015",
    configPath: "./tsconfig.build.json",
    continueOnError: args.continueOnError
});

// rollup - execute rollup with cli.
rollup({ continueOnError: args.continueOnError });
```

#### gulp utils
```ts
import { setGulpContext, registerGulpMultiTargetBuilds } from "@ssv/tools";
import gulp from "gulp";

// before geting started with gulp utils, you need to invoke this once in order to share same instance of gulp.
setGulpContext(gulp)

// generates and register task for gulp by convention for multi-targetting build e.g. amd, umd, es2015 etc...
// e.g. compile:styles (all) | compile:styles:dev (dev target) | compile:styles:TARGET etc... (compile:styles:es2015).
registerGulpMultiTargetBuilds({
    taskName: "html",
    action: compileHtml,
    config: { 
        buildTargets: [
            "es2015",
            "amd",
            "umd"
        ],
	    devTarget: "amd", 
    }
});
```


#### ES5
for usage with es5, use as following:

```ts
const ssvTools = require("@ssv/tools");
ssvTools.compileTsc(...);
```

### Base configs

#### eslint
```json
{
    "extends": "./node_modules/@ssv/tools/base.eslintrc"
}
```

#### tslint
```json
{
    "extends": [
        "./node_modules/@ssv/tools/tslint.base.json"
    ]
}
```

#### tsconfig
```json
{
    "extends": "./node_modules/@ssv/tools/tsconfig.base.json"
}
```

#### stylelint
```json
{
    "extends": "./node_modules/@ssv/tools/base.stylelintrc"
}
```

## Getting Started

### Setup Machine for Development
Install/setup the following:

- NodeJS v7+
- Visual Studio Code or similar code editor
- TypeScript 2.2+
- Git + SourceTree, SmartGit or similar (optional)
- Ensure to install **global NPM modules** using the following:


```bash
npm install -g git gulp karma-cli
```


#### Cloning Repo

- Run `git clone https://github.com/sketch7/ssv-tools.git`
- Switch to `develop` branch


### Project Setup
The following process need to be executed in order to get started.

```bash
npm install
```


### Building the code

```
npm run build
```