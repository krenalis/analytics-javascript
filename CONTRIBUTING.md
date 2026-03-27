# Contributing

This section is intended for contributors working on the SDK codebase.

## Install dependencies

You'll need:

- [Node.js](https://nodejs.org/) (with npm)
- [Deno](https://deno.com/)

Copy the Deno version specified under the `deno-version` field in `.github/workflows/build.yml`, then run the following
command to upgrade Deno to that exact version:

```sh
deno upgrade --version <deno-version>
```

where `<deno-version>` is the version taken from the workflow file.

Run:

```sh
deno task commit
```

### Format files

```sh
deno fmt
```

## Build `dist/krenalis.min.js`

```sh
deno task build
```

Or step-by-step:

```sh
deno task bundle
deno task transpile
deno task minify
```

- `bundle`: bundles the SDK to `build/krenalis.bundle.js`
- `transpile`: transpiles to ES5 and creates `build/krenalis.es5.js`
- `minify`: minifies into `dist/krenalis.min.js`

## Build ES6 and CJS modules

```sh
deno task build:es6     # Builds dist/krenalis.es6.min.js
deno task build:cjs     # Builds dist/krenalis.bundle.cjs
```

## Run tests

```sh
deno test
```

## Before committing

Use this to format, test, and build before commits:

```sh
deno task commit
```

## Update Deno to the latest version

To update Deno to the latest available release:

1. Upgrade Deno: `deno upgrade`
2. Confirm the installed version: `deno --version`
3. Refresh dependencies: `deno update`
4. Run the full test suite before committing: `deno task commit`
5. Update the `deno-version` field in `.github/workflows/build.yml` to match the new version

## Update SWC to the Latest Version

To update SWC to the latest release:

1. Update the npm packages: `npm install @swc/core@latest @swc/cli@latest --save-dev`
2. Run the full test suite before committing: `deno task commit`

## Update esbuild to the Latest Version

To update esbuild to the latest release:

1. Update the npm package: `npm install esbuild@latest --save-dev`
2. Run the full test suite before committing: `deno task commit`

## Publish a new version to NPM

1. Ensure you're on the `main` branch and that your local repository — including tags — is up to date:
   ```sh
   git switch main
   git fetch --all --tags
   git pull --ff-only
   ```

2. Build the distribution files:
   ```sh
   deno task build
   deno task build:es6
   deno task build:cjs
   ```

3. Update the version in `package.json`:
   ```sh
   npm version patch --no-git-tag-version
   git add package.json package-lock.json
   ```
   (Use `npm version minor` if you want to release a minor version.) Then copy the new version number.

4. Commit and create a tag with the version number:
   ```sh
   git commit -m "Release vX.Y.Z"
   git tag vX.Y.Z
   ```

5. Verify the commit and tag:
   ```sh
   git log -1 --oneline --decorate
   ```

6. Push the commit and all tags:
   ```sh
   git push
   git push --tags
   ```

7. Publish to NPM:
   ```sh
   npm publish
   ```
