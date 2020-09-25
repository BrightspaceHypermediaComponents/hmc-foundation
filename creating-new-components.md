# Creating New Components

If your tool needs to interact with hypermedia entities in a way that isn't available in existing shared components, you can create a new component.

## Basic Setup

```js
import { customHypermediaElement, html } from 'hmc-foundation/framework/hypermedia-components.js';
import { HypermediaLitMixin } from 'hmc-foundation/framework/hypermedia-lit-mixin.js';
import { LitElement } from 'lit-element/lit-element.js';

class CustomComponent extends HypermediaLitMixin(LitElement) {

  render() {
    return html`
      <div>Some custom stuff</div>
      <div>You could also include other hmc-foundation components in here!</div>
    `;
  }
}

// This line maps the 'd2l-activity-editor-main' tag to the new 'd2l-activity-editor-main-custom'
// tag when 'some-class' exists on the hypermedia entity
customHypermediaElement(
  'd2l-activity-editor-main-custom', // the tag for the new component
  CustomComponent, // the class of the component
  'd2l-activity-editor-main', // the base tag the component will resolve from
  [['some-class']] // the entity classes to determine when this component is used
);
```

### Determining When a Tag Will Load

Base tags like `d2l-activity-editor-main` resolve to other components based on the hypermedia classes on the entity. We can customize this logic using the following syntax:

- Add classes to an inner array to `AND` them.
- Add more arrays of classes to `OR` them.

A single class does not need to be wrapped in an array.

|Argument|Resolve when classes include|
|-|-|
|`[['learning-path']]`| `learning-path`|
|`'learning-path'`| `learning-path`|
|`[['activity-collection'], ['learning-path']]`| `activity-collection` OR `learning-path`|
|`[['activity-usage', 'course-offering']]`| `activity-usage` AND `course-offering`|
|`[['activity-usage', 'course-offering'], ['quiz']]`| (`activity-usage` AND `course-offering`) OR `quiz`|
|`[['activity-usage', 'course-offering'], 'quiz']`| (`activity-usage` AND `course-offering`) OR `quiz`|

Tag resolution will always use the most specific logic available; a component defined with a longer `AND` statement will be preferred over a component defined with a shorter statement.

**Example:** Two components are defined as follows:

- `component1` defined with class argument `[['foo', 'bar'], ['cherry', 'coke']]`
- `component2` defined with class argument `[['foo', 'bar', 'baz']], ['cherry']`

The entity associated with the `href` has classes `foo, bar, baz, cherry, coke, vanilla`. `component2` resolves based on the entity classes because `component2` has a longer matching `AND` statement.

### Registering

Most use cases will be shareable and the new components should be added to this repository. If your tool has custom logic that is not reusable, the component can live in a different repository.

The new component **needs to be imported** in the base component. In this case, in `d2l-activity-editor-main.js`:

```js
// START custom component imports
import './d2l-activity-editor-main-custom.js';
...
// END custom component imports
```

## Adding observables

Often, your component will want to observe specific information about an entity. We can do this by adding observable properties to the component.

```js
import { observableTypes } from 'hmc-foundation/framework/hypermedia-lit-mixin.js';
...

static get properties() {
  return {
    _organizationHref: { type: String, observable: observableTypes.link, rel: 'https://api.brightspace.com/rels/organization' }
  };
}
```

This will attach the organization `link` (based on the `rel` we pass) to our entity and update the component if it changes.

We can reference this observable to render more information.

```js
render() {
  return html`
    <d2l-hm-name href="${this._organizationHref}" .token="${this.token}"></d2l-hm-name>
  `;
}
```

### Observable Types

Types are based on Siren's hypermedia format.

- `classes`: classes on the entity
- `entity`: an entity that's relevant to this entity, such as a course image
- `link`: a string representing a link
- `property`: a simple property that's part of the entity
- `subEntities`: sub entities that are attached to the entity, such as an array of activities

## Performing Actions

Many components will need to alter the state of their entity. Let's see how performing a `delete` action might work. **[Currently in development]**
