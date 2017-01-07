import * as chalk from "chalk";
import * as gulp from "gulp";

let _gulp: gulp.Gulp;

function getGulp(): gulp.Gulp {
	if (!_gulp) {
		console.error(chalk.red(`gulp is not set! First invoke 'setGulpContext'.`));
		throw "gulp is undefined";
	}
	return _gulp;
}

/**
 * Set Gulp context in order to extend `gulp` instance.
 *
 * @export
 * @param {gulp.Gulp} gulp
 */
export function setGulpContext(gulp: gulp.Gulp): void {
	_gulp = gulp;
}

export function registerGulpMultiTargetBuilds(options: {
	/**
	 * Task name to be defined e.g. "html", "styles" which then will generate tasks as following:
	 * compile:styles | compile:styles:dev | compile:styles:TARGET etc... (compile:styles:es2015).
	 *
	 * @type {string}
	 */
	taskName: string,
	/**
	 * Action to execute for each task, it will provide the `target` as param.
	 */
	action: (target: string) => Promise<any>,
	config: { devTarget: string, buildTargets: string[] }
}) {
	const {taskName, config, action} = options;
	const gulp = getGulp();
	if (!config.devTarget) {
		console.error(chalk.red(`${registerGulpMultiTargetBuilds.name} - config should have 'devTarget' defined!`));
		return;
	}
	if (!config.buildTargets) {
		console.error(chalk.red(`${registerGulpMultiTargetBuilds.name} - config should have 'buildTargets' defined!`));
		return;
	}
	if (config.buildTargets.indexOf(config.devTarget) === -1) {
		console.error(chalk.red(`${registerGulpMultiTargetBuilds.name} -
		config should have 'devTarget' should also be defined in 'buildTargets'!`));
		return;
	}
	gulp.task(`compile:${taskName}:dev`, [`compile:html:${config.devTarget}`]);
	gulp.task(`compile:${taskName}`, config.buildTargets.map(x => `compile:${taskName}:${x}`));
	for (let target of config.buildTargets) {
		gulp.task(`compile:${taskName}:${target}`, () => action(target));
	}
}