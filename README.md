# foundation-components

[![NPM version](https://img.shields.io/npm/v/@brightspace-ui/polaris.svg)](https://www.npmjs.org/package/@brightspace-ui/polaris)
[![Dependabot badge](https://flat.badgen.net/dependabot/BrightspaceUI/polaris?icon=dependabot)](https://app.dependabot.com/)
[![Build status](https://travis-ci.com/@brightspace-ui/polaris.svg?branch=master)](https://travis-ci.com/@brightspace-ui/polaris)

A collection of shareable, stateful components that interact with hypermedia APIs. These components can be used to build pages for anything that uses the D2L Hypermedia API.

## Example

```js
import 'foundation-components/components/activity/name/d2l-activity-name.js';
import { html } from '@brightspace-hmc/foundation-engine/framework/hypermedia-components.js';
import { LitElement } from 'lit-element/lit-element.js';

class MyComponent extends LitElement {
  render() {
    return html`
      <d2l-activity-name href="url-to-a-learning-path-entity" token="some-token"></d2l-activity-name>
    `;
  }
}
```

The above will render the name of a learning path. The tag `d2l-activity-name` will **automatically resolve** to `d2l-activity-name-learning-path` based on the **classes** in the hypermedia entity.

The components are **stateful** because they react to changes to the entity. Components are bi-directional with their entity states &mdash; they can read the state of and perform actions on their entities.

## Components

* [Common](components/common/)
  * Course Image
  * Description
  * Name

* Activity
  * [Description](components/activity/description): Description of an activity
  * [Editor](components/activity/editor): Editor layout components
  * [Icon](components/activity/icon): `d2l-icon` associated with the activity
  * [Image](components/activity/image): Image for a specific activity (e.g., a course image)
  * [List](components/activity/list): Components for lists of activities
  * [Name](components/activity/name): The title of an activity
  * [Type](components/activity/type): The activity's type

### Feature-specific Components

Components that have not been made fully shareable can be found in the [features](features) folder:

* Assignments
  * Availability editor
  * Score editor
  * Submission editor

### Creating New Components

See [Creating new components](creating-new-components.md).

## Developing, Testing and Contributing

After cloning the repo, run `npm install` to install dependencies.

### Running the demos

To start an [es-dev-server](https://open-wc.org/developing/es-dev-server.html) that hosts the demo page and tests:

```shell
npm start
```

### Testing

To lint:

```shell
npm run lint
```

To run local unit tests:

```shell
npm run test:local
```

To run both linting and unit tests:

```shell
npm test
```

## Versioning, Releasing & Deploying

All version changes should obey [semantic versioning](https://semver.org/) rules.

Include either `[increment major]`, `[increment minor]` or `[increment patch]` in your merge commit message to automatically increment the `package.json` version and create a tag.

## Future Enhancements

* Error reporting
* Screenshots for component Readmes
* Support for Working Copy

Looking for an enhancement not listed here? Create a GitHub issue!
