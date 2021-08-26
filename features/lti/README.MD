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

## Development
### Developing With Web Dev Server (Independant of LMS)
You can quickly make changes by using the lit element dev tools. You can see your changes by running:
```shell
npm run start
```
You should see some output like below, and your browser should automatically open to the page, if not you can
go to the page manually.
```shell
  Root dir: C:\BrightspaceGithub\foundation-components
  Local:    http://localhost:8000/
  Network:  http://10.151.100.8:8000/
```
Navigate to the page for LTI Link
```html
http://localhost:8000/features/lti/demo/d2l-lti-activity.html
```
You can make changes or additions to the html demo files at [features/lti/demo](./features/lti/demo)

### Developing with the BSI (Brightspace Integration)
The BSI packages up a lot of our web components together, and the foundations-components are included.

To start working with the BSI clone the [repo](https://github.com/Brightspace/brightspace-integration) locally.

#### NPM Linking the lti-activity Component With the BSI
To get our local changes in foundations-components to work in our local BSI we need to set up a local npm link. This will
have the BSI pull in our local foundations-components folder into its NPM modules folder.

The first step is to npm link the foundations-components repo, from the repo root run
```shell
npm link
```
This creates a module in our local npm store.
Next we need to set up the BSI repo to pull this module from our local npm store. Go to the BSI directory and run
```shell
npm link @brightspace-hmc/foundation-components
```

### Running the BSI Locally
Follow the instructions for [Building & Running a Local BSI](https://github.com/Brightspace/brightspace-integration#building--running-a-local-bsi)
and follow the development build instructions. You can use the config files method or the config variables method.
```shell
npm run start
```

#### Running the BSI With Sitelord
You can set up a Sitelord site to use your local BSI by running a ngrok tunnel to where your local BSI is running. Then
on the sitelord site set the d2l.System.BsiEndpointOverride config variable to your ngrok tunnel. Also set the
d2l.System.BsiEnvironmentOverride to development.
```shell
ngrok http 8080 # or whatever port your local BSI is running on
```

