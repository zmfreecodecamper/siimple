---
title: "Navbar"
description: "A horizontally navigation component"
keywords: "navbar,nav,navigation,top,layouts,header"
--- 

> Redesigned in **v4.0.0**.

A **navbar** is a basic horizontal navigation component. It is just a `<div>` element with the class `siimple-navbar`. Generally it contains the following child elements:

- `siimple-navbar-brand`: generally contains the **logo** of the website. Is placed at the left side of the navbar and is **always visible**.
- `siimple-navbar-toggle`: a hamburger icon, only visible on mobile devices.
- `siimple-navbar-menu`: a container for the navbar links that is placed at the right side of the navbar. Is visible on desktop devices and hidden on mobile devices.

Here is a full navbar example:

:::snippet lang="html" title="Navbar overview"
<div class="siimple-navbar siimple-navbar--dark">
    <!-- Navbar brand logo -->
    <div class="siimple-navbar-brand">
        <strong>Website Brand</strong>
    </div>
    <!-- Navbar toggle -->
    <div class="siimple-navbar-toggle" tabindex="0">
        <div class="siimple-navbar-navicon"></div>
    </div>
    <!-- Navbar menu -->
    <div class="siimple-navbar-menu">
        <div class="siimple-navbar-item">
            <div class="siimple-navbar-link">Products</div>
        </div>
        <div class="siimple-navbar-item">
            <div class="siimple-navbar-link">About</div>
        </div>
    </div>
</div>
:::


#### Color

Costomize the navbar adding one of the siimple colors described in the [theming page](/css/getting-started/theming.html).

```html
<div class="siimple-navbar siimple-navbar--primary">
    <!-- Navbar content -->
</div>
```

#### Breakpoints

By default the navbar has the maximun width minus the `20px` of padding left and right. You can change the width of the navbar element using one of the following breakpoints class names:

- With `siimple-navbar--xsmall` it will have a maximum width of `480px`.
- With `siimple-navbar--small` it will have a maximum width of `600px`.
- With `siimple-navbar--medium` it will have a maximum width of `768px`.
- With `siimple-navbar--large` it will have a maximum width of `960px`.
- With `siimple-navbar--xlarge` it will have a maximum width of `1280px`.

On screens with sizes lower than the specified in the breakpoint class, the navbar will have the maximun width.

```html
<div class="siimple-navbar siimple-navbar--medium">
    <!-- Navbar content -->
</div>
```

#### Brand

The navbar brand is a container for your website logo. Remember that the brand is **always visible**, in both desktop (`> 1024px`) and mobile devices (`< 1024px`).

```html
<div class="siimple-navbar">
    <div class="siimple-navbar-brand">
        Website brand
    </div>
</div>
```


#### Toggle 

The navbar toggle is a container for the hamburger icon, and is only visible **on mobile devices**. The toggle button has to contain a `<div>` tag with a `siimple-navbar-navicon` class to display the hamburger bars. 
Also, the toggle container must have a `tabindex="0"` attribute, in order to allow the menu toggle on mobile devices.

```html
<div class="siimple-navbar">
    <div class="siimple-navbar-toggle" tabindex="0">
        <div class="siimple-navbar-navicon"></div>
    </div>
</div>
```


#### Menu

The navbar menu is a `<div>` with a `siimple-navbar-menu` class that works as a container for the navbar links or other elements (linke buttons or inputs). 

```html
<div class="siimple-navbar">
    <div class="siimple-navbar-menu">
        <!-- Menu content -->
    </div>
</div>
```

The menu is **always visible** on desktop devices (`> 1024px`) and is always placed at the right side of the navbar. On mobile devices (`< 1024px`), it is **hidden by default**, and is only visible when the user press the toggle button. 

:::tip:info title="No JavaScript required"
You do not need JavaScript to display the menu on mobile devices. We have implemented a pure css solution, so the  menu is automatically displayed when user clicks on the toggle button.
::: 


#### Menu item

Each item of the navbar menu should be included in a `<div>` tag with the `siimple-navbar-item` class. This is a container where you can place a navigation link element, with the class `siimple-navbar-link`.

```html
<div class="siimple-navbar">
    <div class="siimple-navbar-menu">
        <div class="siimple-navbar-item">
            <a class="siimple-navbar-link">Link</a>
        </div>
    </div>
</div>
```

You can also put other elements inside an item, for example a button or an input element:

```html
<div class="siimple-navbar">
    <div class="siimple-navbar-menu">
        <div class="siimple-navbar-item">
            <a class="siimple-btn siimple-btn--primary">
                Contact us!
            </a>
        </div>
    </div>
</div>
```


#### Fixed navbar

You can fix the navbar to the **top of the page** adding the `siimple-navbar--fixed-top` class, or fix the navbar to the **bottom of the page** adding the `siimple-navbar--fixed-bottom` lcass to the parent navbar.

```html
<div class="siimple-navbar siimple-navbar--fixed-top">
    <!-- Navbar content -->
</div>
```


