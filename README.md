# AxDatePickerControl

A wrapper around the [jQuery UI datepicker control](https://jqueryui.com/datepicker/) for usage as AngularJS directive in LaxarJS applications.
It can directly be used with [ngModel](https://code.angularjs.org/1.3.15/docs/api/ng/directive/ngModel) or alternatively in combination with the [https://github.com/LaxarJS/ax-input-control](ax-input-control).

In some ways this directive differs from the jQuery UI implementation:
* The DatePicker as provided by jQuery UI has a "Today"-Button which only jumps to the current year and month in the displayed calendar.
  What we want is this behavior plus the selection of today in the input and an update of the model.
  The displayed calendar should remain open.
* At the moment of writing we have three different types of format strings for date formatters and parsers: AngularJS', jQuery's and moment's.
  To lower this number and due to the current usage in widget controllers, the date picker's format strings were changed to the format used by moment.js.

Additional usage note:
The expected view model is an [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601) date string (e.g. `2013-12-24`) and no Date instance.
This is due to the fact that most dates come from resources where dates are serialized as iso strings.

## Installation

To retrieve a copy of this control you can either clone it directly using git or alternatively install it via Bower.
For general information on installing, styling and optimizing controls, have a look at the [LaxarJS documentation](https://github.com/LaxarJS/laxar/blob/master/docs/manuals/installing_controls.md).

### Setup Using Bower

Install the control:

```sh
bower install laxarjs.ax-date-picker-control
```

Add RequireJS paths for the jQuery UI dependency to your `require_config.js`, if you have not already done so:

```js
   paths: [
      // ...
      jquery: 'jquery/dist/jquery',
      jquery_ui: 'jquery_ui/ui'
   ]
```

Since Moment.js internally loads own assets (for example i18n files) using a CommonJS style, we need to set it up as a package among Laxar and Laxar UIKit in the `require_config.js`:

```js
   packages: [
      // ...
      {
         name: 'moment',
         location: 'moment',
         main: 'moment'
      },
      {
         name: 'laxar',
         location: 'laxar',
         main: 'laxar'
      },
      {
         name: 'laxar_uikit',
         location: 'laxar_uikit',
         main: 'laxar_uikit'
      }
   ]
```

Reference the control from the `widget.json` of your widget:
 
```json
   "controls": [ "laxarjs.ax-date-picker-control" ]
```
