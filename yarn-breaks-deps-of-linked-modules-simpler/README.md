# updating node_modules causes modifications in `link:`ed dependencies

When `yarn` is updating an existing `node_modules` directory any packages that conflict with the dependencies in `link:` installed packages are installed into to the `node_modules` of the `link:`ed package, unlike in a fresh install where dependencies in `link:`ed packages are untouched.

To reproduce:

1. either download this directory or setup two packages with direct dependencies on different versions of some module.
2. Install one of the package into the other using `link:` versions. In this repo it looks like:
    ```
    foo
      - link:../bar
      - noop@0.2.0
    bar
      - noop@0.2.2
    ```
3. ensure neither package has a `node_modules` directory
    ```sh
    rm -rf */node_modules
    ```
4. install dependencies in the package with the `link:`
    ```sh
    cd foo
    yarn
    cd ..
    ```
5. validate that there is no `node_modules` in the `link:`ed dependency
    ```sh
    ls bar/node_modules # No such file or directory
    ```
6. delete the `.yarn-integrity` to simulate an outdated `node_modules` directory
    ```sh
    rm foo/node_modules/.yarn-integrity
    ```
7. reinstall dependencies in the package with the `link:`
    ```sh
    cd foo
    yarn
    cd ..
    ```
8.  validate that the `node_modules` directory was created in the `link:`ed dependency
    ```sh
    ls bar/node_modules/ # noop
    ```