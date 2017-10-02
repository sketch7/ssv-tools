# Release workflow
In order to release follow the following procedure.

 - Create branch e.g. `feature/xyz`.. *onces changes are ready...*
 - Bump version accordingly (manually)
 - Create a PR from `feature/xyz` to `master`
 - Once merged it will auto `npm publish` and `git tag`