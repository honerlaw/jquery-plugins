Picker
======

Picker is a simple library that creates an interface for the user to select or
pick a specific date or time.

Usage
----

Include picker.js and picker.css in your HTML files.

```html
<link href="picker.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="picker.js"></script>
```

Create a container element and give it an identifier

```html
<div id="time"></div>
<div id="date"></div>
```

Next initialize and build the pickers using the identifiers given above

```javascript
picker.date.init({
    element: 'date',
    callback: function(date) {
        console.log(date);
    }
}).build();

picker.time.init({
    element: 'time',
    callback: function(time) {
        picker.time.hide();
    }
}).build();
```

In order to show the picker you simple can call `show()` on either the `picker.time` or `picker.date`. In order to hide the pickers you simply can call the `hide()` function on either `picker.time` or `picker.date`.

For example

```javascript
picker.time.show();
picker.time.hide();
```

The above will show the time picker and then hide the time picker
