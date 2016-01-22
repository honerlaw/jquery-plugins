# jquery-plugins
A list of plugins developed for jQuery to solve specific problems.


jQuery ToolTips
---------------
A simple plugin that displays tool-tips for any given element when the user hovers over the element with their mouse.

Usage

```
<div class="tooltip-test" message="This is the tooltip message.">Hover Over Me</div>

<script type="text/javascript">
    $('.tooltip-test').tooltips();
</script>
```

jQuery Confirms
---------------
Asks the user for confirmation using the `window.confirm` dialog on any elements that contain the correct attribute and have been initialized using the plugin.

Usage

```
<div class="confirm-test" confirm="This is the message to confirm.">Click On Me to get a confirm message</div>

<script type="text/javascript">
    $('.confirm-test').confirms();
</script>
```
