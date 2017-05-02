## JSX Functional Components for Vue JSX

This babel plugin adds some syntactic sugar to JSX.

### Usage:

```bash
npm i babel-plugin-jsx-vue-functional -D
```
or
```bash
yarn add babel-plugin-jsx-vue-functional -D
```

Then add `jsx-vue-functional` to your `.babelrc` file under `plugins`

example .babelrc:
```json
{
  "presets": ["es2015"],
  "plugins": ["jsx-vue-functional", "transform-vue-jsx"]
}
```

Example:
```js
export const a = ({ props, listeners }) => <div onClick={listeners.click}>{props.msg}</div>
```
will be transpiled into:
```js
export const a = {
  functional: true,
  render: (h, { props, listeners }) => <div onClick={listeners.click}>{props.msg}</div>
};
```

#### Warning

This plugin will transform **all** named exported arrow functions that contain JSX.
