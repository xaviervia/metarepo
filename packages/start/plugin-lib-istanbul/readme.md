# 💯 plugin-lib-istanbul

Collect, report and check code coverage using [Istanbul](https://istanbul.js.org/).

## Install

```sh
$ yarn add --dev @start/plugin-lib-istanbul
```

## Usage

### Signature

```ts
istanbulInstrument(extensions?: string[])
```

#### `options`

#### `extensions`

File extensions to instrument, for example `['.ts']`

```ts
istanbulReports(formats: string[] = ['lcovonly', 'text-summary'])
```

```ts
istanbulThresholds(options: {
  branches?: number,
  functions?: number,
  lines?: number,
  statements?: number
})
```

### Example

```js
import sequence from '@start/plugin-sequence'
import find from '@start/plugin-find'
import {
  istanbulInstrument,
  istanbulReport,
  istanbulThresholds
} from '@start/plugin-lib-istanbul'
import tape from '@start/plugin-lib-tape'

export const task = () =>
  sequence(
    find('src/**/*.js'),
    istanbulInstrument(),
    find('test/**/*.js'),
    tape(),
    istanbulReport(['lcovonly', 'html', 'text-summary']),
    istanbulThresholds({ functions: 100 })
  )
```
