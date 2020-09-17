# d2l-activity-editor

An administrative editor for an activity.

The editor includes several components to make customization of each layout section easier.

**Properties**

| Property | Type | Description |
|--|--|--|
|`sub-title`|String|Title to add in the header|
|`template`|String|Template to use for editor: `default` or `primary-secondary`|

## d2l-activity-editor-header

The header includes the name and description of the activity if available.

**Properties**

| Property | Type | Description |
|--|--|--|
|`sub-title`|String|Title to add in the header|

## d2l-activity-editor-main

The main content editor of the activity. **Currently does not have a default.**

### d2l-activity-editor-main-collection

Shows an add activity button and a list of activities that are part of the collection.

**Classes Matched:** `activity-collection` or `learning-path`

## d2l-activity-editor-sidebar

A grey sidebar that appears on the right side of the editor.

## d2l-activity-editor-footer

The footer includes the save and cancel buttons, as well as a visibility editor and save status.
