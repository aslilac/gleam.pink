# Gleam installer

> Finally, an installer that will have the latest version Gleam version 3 seconds after it's been released _and_ work on my toaster.

```sh
curl -fsSL https://gleam.pink/install.sh | sh
```

### `--version`

You can install a specific version with the `--version` flag. This works for Gleam nightly as well!

```sh
curl -fsSL https://gleam.pink/install.sh | sh -s -- --version nightly  # bleeding edge 😎
curl -fsSL https://gleam.pink/install.sh | sh -s -- --version 2.0.0    # maybe one day :^)
```

### `--prefix`

To avoid conflict with your system package manager, the default install prefix is /usr/local/gleam. You may specify a different directory if you like!

```sh
curl -fsSL https://gleam.pink/install.sh | sh -s -- --prefix /usr/local
curl -fsSL https://gleam.pink/install.sh | sh -s -- --prefix ~/.local
```
