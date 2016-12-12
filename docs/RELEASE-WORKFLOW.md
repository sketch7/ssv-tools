# Release workflow
In order to release follow the following procedure.

# Create new Release

## New Stable Release
Stable release process
 - Checkout `master`
 - Bump version `npm version minor`
 - Publish `npm publish`
 - Merge `master => develop`

Or use the below to automate it. *note* change `npm version minor` to whatever is needed.
 `git checkout master && git merge develop && git push && npm version minor && npm publish && git push && git checkout develop && git merge master && git push`

# Machine Setup
In order for this to work first need to setup github through cmd

## Auth to GitHub
Authenticate to github via username/password or SSH.

### Username/Password Auth
- run `git config --global credential.helper wincred`
 - this will persist the credentials (for windows)
- Trigger push command e.g.

```
git push origin develop
```
 - Auth to github by providing username and password/token