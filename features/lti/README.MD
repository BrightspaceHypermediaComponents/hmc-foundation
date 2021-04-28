# LTI Foundation Components

Components specific to LTI (Learning Tools Interoperability) or External Learning Tools

## d2l-lti-activity

Displays an LTI Activity where a basic launch can be performed to the LTI tool.

**Properties:**

| Property | Type | Description |
|--|--|--|
| 'open-as-external' | Boolean | Only Render a button to open in a new window |

### Example

```html
<d2l-lti-activity href="${activity usage href}" .token="${token}"></d2l-discover-rules>
<d2l-lti-activity href="${activity usage href}" .token="${token}" open-as-external></d2l-discover-rules>
```
