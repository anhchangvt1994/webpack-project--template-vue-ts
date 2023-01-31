## Table of Contents

1. [Install](#install)
2. [Introduction](#introduction)

<h2 align="center">Install</h2>

##### Expect Node 18.x or higher

Clone source with SSH url:

```bash
git clone git@github.com:anhchangvt1994/webpack-project--template-vue-ts.git
```

Install:

```bash
cd webpack-project--template-vue-ts
```

If use npm

```bash
npm install
```

If use yarn 1.x

```bash
yarn install
```

<h2 align="center">Introduction</h2>

This project is an advanced structure and configuration of scaffolded Webpack + Vue 3.x + Typescript project.

### Table of structure's benefit information that you must use

- [env](#env) - emvironment directory
- [src](#src) - include assets and coding of project
- [tailwind.config.cjs](#tailwincss)
- [webpack.config.ts](#webpack.config.ts) - unplugin-auto-import configuration
- [webpack.production.config.ts](#webpack.production.config.ts) - optimization splitchunks configuration, External configuration

<h3>env</h3>

```bash
├── env/
│   ├── env.[prefix].mjs
│   ├── env-register.mjs
│   └──
└──
```

**env** directory contains environment variable files used to manage environment variable by using .mjs file. You will define environment variables in .mjs file instead of .env file.

##### Why use it ?

1. I think defining environment variables in javascript file will similar with JS developer and better for managing than .env file.

Compare them

```javascript
// env.router.mjs
export default {
  prefix: 'router',
  data: {
    home: {
      path: '/',
      id: 'HomePage',
    },
  },
}
```

```.env
# .env
ROUTER_HOME_PATH=/
ROUTER_HOME_ID=HomePage
```

2. Think that you can define any type (not only string like .env) when define env in javascript file.

Imagine that you need to define a payment code validation array

```javascript
// env.router.mjs
export default {
  prefix: 'payment',
  data: {
    valid_code: [0, 1, 2, 3],
  },
}
```

```.env
# .env
PAYMENT_VALID_CODE=[0,1,2,3] #wrong
PAYMENT_VALID_CODE="[0,1,2,3]" #right (you must stringify it)
```

3. The hot benefit of this advanced structure bring out for Environment Variables is the **ImportMeta.d.ts** generating automation. With this ability, the code editor will auto suggestion available env for you.

You have a large env difination and have to open file, cop and paste variable key when want to use it. Forget it !!!

##### How to use it ?

Imagine that you need create a new env for an api title (prefix) to store all of api endpoint string

1. Create an **env.api.mjs** file and finish that

```javascript
// env.api.mjs
export default {
  prefix: 'api',
  data: {
    user: {
      info: '/api/user/info',
      edit: '/api/user/edit',
    },
    product_list: '/api/product',
  },
}
```

2. Open **env-register.mjs** and regist it

```javascript
// env-register.mjs
import ENV_API from './env.api.mjs'

export default [ENV_API]
```

Tada! Done! you're so cool

<h3>src</h3>

```bash
├── src/
│   ├── App.ts
│   ├── App.vue
│   ├── assets/...
│   ├── pages/...
│   ├── components/...
│   ├── config/...
│   └── utils/...
└──
```

The **src directory** contains the resource's assets and logic of your codes like:

| file / directory | Description                                                                                                                                     |
| :--------------: | ----------------------------------------------------------------------------------------------------------------------------------------------- |
|    **App.ts**    | contains initialization code of vue                                                                                                             |
|   **App.vue**    | contains default layout code of vue                                                                                                             |
|   **assets/**    | contains asset files <br/>**style**: assets > style > main.scss <br/>**images**: assets > static > images > logo.svg                            |
|    **pages/**    | contains files of pages layout (ex: HomePage.vue)                                                                                               |
| **components/**  | contains files of component <br/> **global**: components > [GlobalComponentName].vue <br/> **page**: components > HomePage > ProductSection.vue |
|   **config/**    | contains files of libs or plugins configuration <br/> **vue-router**: config > router > index.ts <br/> **pinia**: config > store > index.ts     |
|    **utils/**    | contains files of your customization like <br/> **Composition API, Libs, Plugins**                                                              |

##### Tip:

1. If your code editor has TSServer, the **paths** options of **tsconfig.json** will provide a list of alias for your code editor. That will make you happy with auto alias suggestion when you're typing.

![alt text](/src/assets/static/images/development/auto-alias-suggestion.png 'Title')

```javascript
// Normal way you must
import './assets/styles/...'

// tsconfig with paths options
import 'assets/styles/...'
```

In this case, that looks like the same, except **" ./ "**. But when you move **index.ts** to another location (ex: move it into **pages/**), the path with **" ./ "** will wrong and the path with alias still right.

2. You will see that the **images/** directory placed in **static/** directory. Because in this project the **static/** is set for copying instead of asset url handling.

Normal case in Vue project, you can handle asset files with some solutions (NOTE: I will use jsx instead vue SFC file (.vue) in this README markdown)

```jsx
// 1. import and use it
import Logo from 'assets/images/logo.svg'

return <img src={Logo} />

// 2. require
return <img src={require('assets/images/logo.svg')} />

// 3. vue support assets url handler
// refer: https://vue-loader.vuejs.org/guide/asset-url.html#transform-rules
return <img src="@/assets/images/logo.svg" />
```

In case using copy directory, you just easy set static files like a string

```html
<!-- Very similar and you finish! -->
<img src="/images/logo.svg" />
```

<h3>tailwind.config.cjs</h3>

All of your tailwind config for your project
[tailwind config docs](https://tailwindcss.com/docs/configuration)

<h3>webpack.config.ts</h3>

##### unplugin-auto-import configuration

##### Why use it ?

In the normal, think that if you want to use **ref** in **vue** you have to:

```javascript
import { ref } from 'vue'

const something = ref(value)
```

But if you configed auto-import before, you just do like code below. And don't worry about suggestion or wrong linting.

```javascript
const something = ref(value)
```

##### How to use it ?

I configed the auto-import into **webpack.config.ts**, the syntax of configuration is like this

```javascript
{
  plugins: [
    require('unplugin-auto-import/webpack')({
      // targets to transform
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      imports: [
        // presets
        'vue',
      ],
      dts: './config/auto-imports.d.ts',
      eslintrc: {
        enabled: true,
        filepath: './config/.eslintrc-auto-import.json',
      },
    }),
  ],
}
```

|   Options    | Description                                                                                                                                                                                                                                                                                                                                                                                 |
| :----------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **include**  | Is list of file extension that will be applied the auto-import                                                                                                                                                                                                                                                                                                                              |
| **imports**  | Set what dependencies and values will be valid to auto-import, unplugin-auto-import available some popular libs like: vue, react, solid ... [see more](https://github.com/antfu/unplugin-auto-import/tree/main/src/presets) <br /> Another hand, you can custom some of new your auto-import by using [advanced configuration](https://github.com/antfu/unplugin-auto-import#configuration) |
|   **dts**    | Where you want to place **auto-imports.d.ts** file, this file will support for auto suggestion ability                                                                                                                                                                                                                                                                                      |
| **eslintrc** | Where you want to place **.eslintrc-auto-import.json** file, this file will support for linting validation                                                                                                                                                                                                                                                                                  |

<h3>webpack.production.config.ts</h3>

##### optimization splitchunks

This configuration used to support for splitting chunks of files. This solution help to reduce the file's sizes in loading processes by loading multiple files with smaller sizes.

##### Why use it ?

Reduce file's sizes, can enhance loading resource performance.

Note: Don't use this solution for all cases, because the large amount of file be loaded in the bad internet supporter will make the loading resource process be slower and can be broken.

##### How to use it ?

I configed the splitchunks cacheGroups into **webpack.production.config.ts**, the syntax of configuration is like this

```javaScript
cacheGroups: {
  styles: {
    type: 'css/mini-extract',
    priority: 100,
    minSize: 1000,
    maxSize: 50000,
    minSizeReduction: 50000,
  },
  vendor: {
    chunks: 'all',
    test: /[\\/]node_modules[\\/]/,
    filename: '[chunkhash:8].js',
    enforce: true,
    reuseExistingChunk: true,
  },
  utils: {
    chunks: 'all',
    test: /[\\/]utils[\\/]/,
    filename: '[chunkhash:8].js',
    reuseExistingChunk: true,
    minSize: 10000,
    maxSize: 100000,
  },
  config: {
    chunks: 'all',
    test: /[\\/]config[\\/]/,
    filename: '[chunkhash:8].js',
    reuseExistingChunk: true,
    minSize: 10000,
    maxSize: 100000,
  },
},
```

In this case, I configed to split any files in node_modules, utils and config directories. About pages and components directories you can use **dynamic import** to manual handle split-chunks.

You can search more about splitchunks of webpack in [here](https://webpack.js.org/plugins/split-chunks-plugin/#optimizationsplitchunks)
NOTE: The **webpack.development.config.js** is the same, but instead config minSize and maxSize, I configed `enforce:true` for all of them.

##### ESM External in CDN

This configuration is an optional, you can read or ignore it.
The **ESM External CDN** is a solution used to replace some node_module dependencies by the corresponding ESM module in a CDN hosting.

Imagine that you have a code like this

```javascript
import { ref } from 'vue'
```

The 'vue' is a node_module dependency, you can see that infor in package.json.

![alt text](/src/assets/static/images/development/node-module-dependencies.png 'Title')

After the build tool compiles the file include the import dependencies syntax, the system will print dependency's logic code into owner file or split it into another chunk if you have configed split-chunks for that dependency. But when you define external for that dependency, the system will replace it with the synchronize insert script syntax like split-chunks case, but different about where src="from". In **ESM External CDN** case the src will from CDN hosting.

The configuration syntax like this

```javascript
// [key is dependency name]: module + value is esm cdn url (in this case I use https://esm.sh/)
externals: {
  vue: 'module https://esm.sh/vue@3.2.45',
},
```

You can use below command line to try

```bash
npm run build:esm
```
