# laxar-date-picker-control

> Wraps the [jQuery UI datepicker component](https://jqueryui.com/datepicker/) as an AngularJS directive, for LaxarJS widgets.

This control can be used directly with [ngModel](https://code.angularjs.org/1.3.15/docs/api/ng/directive/ngModel) or alternatively in combination with the [https://github.com/LaxarJS/ax-input-control](ax-input-control).

In some ways this directive differs from the jQuery UI implementation:
* The DatePicker as provided by jQuery UI has a "Today"-Button which only jumps to the current year and month in the displayed calendar.
  What we want is this behavior plus the selection of today in the input and an update of the model.
  The displayed calendar should remain open.
* At the moment of writing we have three different types of format strings for date formatters and parsers: AngularJS', jQuery's and moment's.
  To lower this number and due to the current usage in widget controllers, the date picker's format strings were changed to the format used by moment.js.
* While *options* may be passed through to the jQuery UI datepicker by attribute-binding to the `axDatePicker` directive (see [usage](#usage)), not all options will be compatible with the Bootstrap styling applied by this directive.

Additional usage note:
The expected view model is an [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601) date string (e.g. `2013-12-24`) and no Date instance.
This is due to the fact that most dates come from resources where dates are serialized as iso strings.


## Installation

To use this control you should install it into your LaxarJS v2 project:

```console
npm install laxar-date-picker-control
```

This control only works for LaxarJS widget that are targeting AngularJS v1. It requires jQuery UI.

## Usage

The control provides an AngularJS directive `axDatePicker`, which can be used as follows:

```html
<input type="text" data-ax-date-picker>
```

Or, passing [jQuery UI datepicker options](api.jqueryui.com/datepicker/) such as `"defaultDate"` to set the initial date to the next day:

```html
<input type="text" data-ax-date-picker='{"defaultDate": "+1d"}'>
```

Note that some jQuery UI options may not work properly, particularly if they conflict with the Bootstrap styling applied by this control.

Or, in combination with the [laxar-input-control](https://github.com/LaxarJS/ax-input-control#axinputcontrol),
to add validation:

```html
<input
   type="text"
   data-ax-input="date"
   data-ax-input-required="true"
   data-ax-input-validation-message="'Please enter your birthday'">
```
