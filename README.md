# Live demo
https://pensive-noether-032521.netlify.app/

# How to run this repo in local development
1. install yarn
2. install dependencies through yarn
```bash
yarn
```
3. run dev server
```bash
yarn dev
```

# Implementation Description
* folder structure: each component folder has an `index.tsx` file as the entry point. Define section components in the parent folder of section. Define reusable components in `components` folder
* css in js: choose `@emotion/styled` to style components to avoid css classname naming collision and polyfill styled cross different browsers.
* styled-system: use `styled-system` to unify style property name of reusable components.
* typescript: define type of components and functions to validate function input at compile time.
* test: add test for complicated data transformation to ensure runtime correctness.
* pie chart: use `react-minimal-pie-chart` to render statistic data of poll results.
* local storage: use local storage as data storage to retrieve initial value and update value.
* draft section: add draft section and alert dialog to confirm user's input before submission.

# License
[MIT](LICENSE)
