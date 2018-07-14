# Updating node_modules breaks transitive deps of packages installed with `link:`

When `yarn` is updating an existing node_modules directory any packages that conflict with the dependencies in `link:` installed packages are installed into to the node_modules of the `link:`ed package, without considering all of its dependencies.

To reproduce:

1. Either download the reproduction from the repo or setup two packages with direct and transitive dependencies on different versions of some module that which has a direct dependency on different versions of another module. In the reproduction we use `chalk`, which has a direct dependency on `ansi-styles@2.x` in the `chalk@1.x` major and `ansi-styles@3.x` in the `chalk@2.x` major.
2. Install one of the package into the other using `link:` versions so that the packages look something like this:
    ```
    foo
      - link:../bar
      - chalk@^2.4.1
        - ansi-styles@3.2.1
      - elasticsearch@13.0.1
        - chalk@^1.0.0
          - ansi-styles@2.2.1
    bar
      - chalk@^2.4.1
        - ansi-styles@3.2.1
      - elasticsearch@^14.1.0
        - chalk@^1.0.0
          - ansi-styles@2.2.1
    ```
4. Ensure neither package has a node_modules directory
    ```sh
    rm -rf */node_modules
    ```
5. Install dependencies in both packages
    ```sh
    cd foo && yarn && cd ..
    cd bar && yarn && cd ..
    ```
6. Validate that `ansi-styles@3.2.1` is installed in the root of `bar` 
    ```sh
    jq .version bar/node_modules/ansi-styles/package.json #"3.2.1"
    ```
7. Delete the `foo/node_modules/.yarn-integrity` file to simulate an outdated node_modules directory
    ```sh
    rm foo/node_modules/.yarn-integrity
    ```
8. Reinstall dependencies in `foo`
    ```sh
    cd foo && yarn && cd ..
    ```
9. Validate that `ansi-styles` in `bar` was replaced with version `2.2.1` even though `yarn list` indicates the correct version:
    ```sh
    jq .version bar/node_modules/ansi-styles/package.json #"2.2.1"
    cd bar && yarn list && cd ..
    # yarn list v1.6.0
    # ├─ ansi-styles@3.2.1
    # └─ elasticsearch@14.2.0
    #    └─ ansi-styles@2.2.1
    # ✨  Done in 0.08s.
    ```

This seems to indicate that Yarn is attempting to install `elasticsearch@^14.1.0` in the root of `bar` because it conflicts with it's local dependency on `elasticsearch@13.0.1`, but doesn't take into account the dependencies from `bar` that **don't** conflict, like `chalk@^2.4.1`, so it installs `ansi-styles@2.2.1` from `chalk@^1.0.0` at the root of `bar`, wiping out the existing version.