# LTI Foundation Components

Components specific to LTI (Learning Tools Interoperability) or External Learning Tools

## d2l-lti-activity

Displays an LTI Activity where a basic launch can be performed to the LTI tool.

![LTI Activity](./screenshots/lti-activity.PNG?raw=true)

**Properties:**

| Property | Type | Description |
|--|--|--|
| 'href' | String, required | The reference to the activity usage |
| 'token' | string, required | The user token |
| 'open-as-external' | Boolean | Only Render a button to open in a new window |
| 'preview' | Boolean | Perform the launch in preview mode |
| 'grading' | Boolean | Perform the launch in submission review mode |
| 'assigned-activity-href' | String | An href to the assigned activity attempt for a user |

### Example

```html
<d2l-lti-activity href="${activity usage href}" token="${token}"></d2l-lti-activity>
<d2l-lti-activity
	href="${activity usage href}"
	token="${token}"
	open-as-external
	preview
	grading
	assigned-activity-href="https://tenant.activities.api.dev.brightspace.com/assigned/guid"
></d2l-lti-activity>
```
