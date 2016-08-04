
# Shrew :mouse2:

This module has only one function and it returns the root path of the current
main module when using with **NPM**.

```js
const shrew = require ('shrew');
const root = shrew ();
```

It's very useful in the case where you have a dependency (a module in
`node_modules/`) and you want to retrieve the main module path. More precisely
the module which is running a script with **NPM**.

The main module is not always located in the parent `../` because you can't
be 100% sure that there is only one level of `node_modules/`. Since node `>=5`,
it seems that all modules are placed in the root `node_modules` directory. But
it's possible that some modules are nested because it relies on uncompatible
versions of the same module (for example, two different major versions). An
other case is the use of `npm link` where the modules are always nested.

## Fine, how to use it?

In your `package.json` file, sometimes you want to call a command in a
*postinstall* script (for example). Or any other scripts even custom scripts.

```json
{
  "scripts": {
    "postinstall": "my-super-command"
  }
}
```

This command is deployed in your `./node_modules/.bin` directory and uses some
other modules like `./node_modules/my-super-command/node_modules/one-lib`. The
module `one-lib` wants to change something in the root directory of your module.

In this case, `one-lib` can not just use the parent directory `../` in order to
retrieve the main module. It's here that **Shrew** is useful. The `one-lib` module
must use `shrew ()` in order to retrieve the path on the module where the
*postinstall* script is called.

## Why it's working only with **NPM**?

You can't use **Shrew** without **NPM** because this library uses an environment
variable set by **NPM**. Without this variable, it's not possible to retrieve the
main module.
