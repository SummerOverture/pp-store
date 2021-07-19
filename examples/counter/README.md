# ppstore Counter Example

This project template was built with [Create React App](https://github.com/facebookincubator/create-react-app), which provides a simple way to start React projects with no build configuration needed.

Projects built with Create-React-App include support for ES6 syntax, as well as several unofficial / not-yet-final forms of Javascript syntax such as Class Properties and JSX. See the list of [language features and polyfills supported by Create-React-App](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#supported-language-features-and-polyfills) for more information.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

## 示例说明

该示例是基于宽松模式下的 store 示例，该示例展示了状态共享功能，以及通过 Selector 的性能优化示例，在点击`increment async`按钮时可以发现 `CounterShow` 的 render count 不变，在一秒后 count 更新后才会触发 render

### store 文件

创建的 store 包含 count 和 loading 状态，用来模拟平时的请求操作

### Counter 组件

使用了 store 中的 count 和 loading 状态，ppstore 将在 count 和 loading 状态改变时重新通过 hook 的 set 操作重新渲染该组件

### CountShow 组件

使用了 store 中 count 状态，ppstore 将只在 count 改变时更新该组件
