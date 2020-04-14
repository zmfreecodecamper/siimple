---
title: "Content"
description: "A responsive component to center content horizontally"
keywords: "content,container,center,layouts,responsive"
--- 

A **content** is a layout component that divides your website in section and places the information it contains in the center of the window in every moment. Add the class `siimple-content` to your container `<div>` to use it:

```html
<div class="siimple-content">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit...
</div>
```

By default the container has the maximun width minus the `20px` of padding left and right. You can change the width of the content element using one of the following breakpoints:

- With `siimple-content--xsmall` it will have a maximum width of `480px`.
- With `siimple-content--small` it will have a maximum width of `600px`.
- With `siimple-content--medium` it will have a maximum width of `768px`.
- With `siimple-content--large` it will have a maximum width of `960px`.
- With `siimple-content--xlarge` it will have a maximum width of `1280px`.

```html
<div class="siimple-content siimple-content--medium">
    768px container
</div>
```

