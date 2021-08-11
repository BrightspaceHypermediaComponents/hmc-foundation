# foundation-components

A collection of shareable, stateful components that interact with hypermedia APIs. These components can be used to build pages for anything that uses the D2L Hypermedia API.

## Example

```js
import '@brightspace-hmc/foundation-components/components/activity/name/d2l-activity-name.js';
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
* Discover
  * [Entitlement Rules](features/discover): Displays the rules for self enrollment and allows users to edit them

### Creating New Components

See [Creating new components](creating-new-components.md).

For details on observable properties, see [observables](https://github.com/BrightspaceHypermediaComponents/foundation-engine/tree/master/state/observable) in the [Foundation Engine](https://github.com/BrightspaceHypermediaComponents/foundation-engine).

For example components using observables, see [examples](https://github.com/BrightspaceHypermediaComponents/foundation-components/tree/master/examples).

## Developing, Testing and Contributing

After cloning the repo, run `npm install` to install dependencies.

### Localization
If you have language terms that should be translated, we recommend the following.

1. Use the [LocalizeDynamicMixin](https://github.com/BrightspaceUI/core/blob/master/mixins/localize-dynamic-mixin.js).
  - To use [OSLO](https://docs.dev.d2l/index.php/Oslo), create a custom localize mixin that extends the LocalizeDynamicMixin and include the osloCollection. Have the component extend the new mixin instead of LocalizeDynamicMixin.
  - See [example](https://github.com/BrightspaceHypermediaComponents/foundation-components/tree/master/features/lti/mixins/d2l-activity-assignment-lang-mixin.js)
2. If one doesn't exist, create a lang folder in the directory for your component.
3. Add the component to the [serge](https://github.com/BrightspaceHypermediaComponents/foundation-components/blob/master/foundation-components.serge.json). If you don't do this, your files will not be sent for translation.
4. Watch for a pull request for translations for your terms. This typically takes about a sprint to occur.

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

## Versioning & Releasing

> TL;DR: Commits prefixed with `fix:` and `feat:` will trigger patch and minor releases when merged to `master`. Read on for more details...

The [sematic-release GitHub Action](https://github.com/BrightspaceUI/actions/tree/master/semantic-release) is called from the `release.yml` GitHub Action workflow to handle version changes and releasing.

### Version Changes

All version changes should obey [semantic versioning](https://semver.org/) rules:
1. **MAJOR** version when you make incompatible API changes,
2. **MINOR** version when you add functionality in a backwards compatible manner, and
3. **PATCH** version when you make backwards compatible bug fixes.

The next version number will be determined from the commit messages since the previous release. Our semantic-release configuration uses the [Angular convention](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular) when analyzing commits:
* Commits which are prefixed with `fix:` or `perf:` will trigger a `patch` release. Example: `fix: validate input before using`
* Commits which are prefixed with `feat:` will trigger a `minor` release. Example: `feat: add toggle() method`
* To trigger a MAJOR release, include `BREAKING CHANGE:` with a space or two newlines in the footer of the commit message
* Other suggested prefixes which will **NOT** trigger a release: `build:`, `ci:`, `docs:`, `style:`, `refactor:` and `test:`. Example: `docs: adding README for new component`

To revert a change, add the `revert:` prefix to the original commit message. This will cause the reverted change to be omitted from the release notes. Example: `revert: fix: validate input before using`.

### Releases

When a release is triggered, it will:
* Update the version in `package.json`
* Tag the commit
* Create a GitHub release (including release notes)

### Releasing from Maintenance Branches

Occasionally you'll want to backport a feature or bug fix to an older release. `semantic-release` refers to these as [maintenance branches](https://semantic-release.gitbook.io/semantic-release/usage/workflow-configuration#maintenance-branches).

Maintenance branch names should be of the form: `+([0-9])?(.{+([0-9]),x}).x`.

Regular expressions are complicated, but this essentially means branch names should look like:
* `1.15.x` for patch releases on top of the `1.15` release (after version `1.16` exists)
* `2.x` for feature releases on top of the `2` release (after version `3` exists)

## Future Enhancements

* Error reporting
* Screenshots for component Readmes
* Support for Working Copy

Looking for an enhancement not listed here? Create a GitHub issue!
