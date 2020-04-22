---
title: "Footer"
description: "A basic component for displaying content in the bottom of your page"
keywords: "foot,footer,content,bottom,layouts,links"
--- 

> Redesigned in **v4.0.0**.


A **footer** is a basic layout component usually used for displaying content in the bottom of the website. A footer can be created adding a `siimple-footer` class name to a `<div>` tag:

:::snippet lang="html" title="Basic footer"
<div class="siimple-footer siimple-footer--light" align="center">
    Made with love by <b>siimple<b>
</div>
:::

A footer can contain other subelements:

- `siimple-footer-title`: usually used for displaying the company or application name.
- `siimple-footer-subtitle`: for adding extra information to the footer title.
- `siimple-footer-group`: for displaying the links group title.
- `siimple-footer-link`: for displaying special links in the footer.

:::snippet lang="html" title="Big footer example"
<div class="siimple-footer siimple-footer--light">
    <div class="siimple-row">
        <div class="siimple-column siimple-column--4 siimple-column--sm-12">
            <div class="siimple-footer-title">siimple</div>
            <div class="siimple-footer-subtitle">A minimal css toolkit</div>
        </div>
        <div class="siimple-column siimple-column--4 siimple-column--sm-12">
            <div class="siimple-footer-group">Group 1</div>
            <a href="" class="siimple-footer-link">Link 1</a>
            <a href="" class="siimple-footer-link">Link 2</a>
        </div>
        <div class="siimple-column siimple-column--4 siimple-column--sm-12">
            <div href="" class="siimple-footer-group">Group 2</div>
            <a href="" class="siimple-footer-link">Link 1</a>
            <a href="" class="siimple-footer-link">Link 2</a>
            <a href="" class="siimple-footer-link">Link 3</a>
        </div>
    </div>
</div>
:::


#### Color

Costomize the footer adding one of the siimple colors described in the [theming page](/css/getting-started/theming.html).

```html
<div class="siimple-footer siimple-footer--primary">
    <!-- Footer content -->
</div>
```

#### Breakpoints

By default the navbar has the maximun width minus the `20px` of padding left and right. You can change the width of the footer element using one of the following breakpoints class names:

- With `siimple-footer--xsmall` it will have a maximum width of `480px`.
- With `siimple-footer--small` it will have a maximum width of `600px`.
- With `siimple-footer--medium` it will have a maximum width of `768px`.
- With `siimple-footer--large` it will have a maximum width of `960px`.
- With `siimple-footer--xlarge` it will have a maximum width of `1280px`.

On screens with sizes lower than the specified in the breakpoint class, the footer will have the maximun width.

```html
<div class="siimple-footer siimple-footer--medium">
    <!-- Footer content -->
</div>
```

#### Title

You can turn an element inside your footer to a footer title adding a `siimple-footer-title` class.

```html
<div class="siimple-footer siimple-footer--light" align="center">
    <div class="siimple-footer-title">My company</div>
</div>
```


#### Subtitle

Display a subtitle in your footer with `siimple-footer-subtitle` class.

```html
<div class="siimple-footer siimple-footer--light" align="center">
    <div class="siimple-footer-title">My company</div>
    <div class="siimple-footer-subtitle">We make great things!</div>
</div>
```


#### Link

You can style your footer links using the class `siimple-footer-link`. 

```html
<div class="siimple-footer siimple-footer--light">
    <div class="siimple-grid-row">
        <div class="siimple-grid-col siimple-grid-col--8">
            <div class="siimple-footer-title">My company</div>
            <div class="siimple-footer-subtitle">We make great things!</div>
        </div>
        <div class="siimple-grid-col siimple-grid-col--4">
            <a href="" class="siimple-footer-link">Link 1</a>
            <a href="" class="siimple-footer-link">Link 2</a>
            <a href="" class="siimple-footer-link">Link 3</a>
        </div>
    </div>
</div>
```


#### Footer group

> Added in **v3.2.0**.

Use `siimple-footer-group` to style your links group title.

```html
<div class="siimple-footer siimple-footer--light">
    <div class="siimple-grid-row">
        <div class="siimple-grid-col siimple-grid-col--8">
            <div class="siimple-footer-title">My company</div>
            <div class="siimple-footer-subtitle">We make great things!</div>
        </div>
        <div class="siimple-grid-col siimple-grid-col--4">
            <div class="siimple-footer-group">Group</div>
            <a href="" class="siimple-footer-link">Link 1</a>
            <a href="" class="siimple-footer-link">Link 2</a>
            <a href="" class="siimple-footer-link">Link 3</a>
        </div>
    </div>
</div>
```


