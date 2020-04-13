---
title: "Theming"
description: "Font and colors that @siimple/css uses"
---

#### Before getting started

Before customizing **siimple css**, you will need to:

- Download `@siimple/css` using a package manager. Read the [installation guide](/css/getting-started/installation.html) for more information.
- Ensure that you have `sass` installed in your computer. You will need version `>1.23.0`. 
- Ensure that the `node_modules` folder is listed in your [sass include paths](https://sass-lang.com/documentation/cli/dart-sass#load-path) for resolving the path to the **siimple css** package.

:::tip:warning title="Important note about imports"
In version `v4.0.0`, **siimple css** switched to the new `@use` rule instead of using the `@import` rule. You can read about the new [sass module system here](https://sass-lang.com/blog/the-module-system-is-launched).
:::

#### Include siimple css

**siimple css** is written in [SCSS](https://sass-lang.com), so you can include it in your own build adding the following line in your scss file:

```scss
//Option 1: load the whole siimple css package
@use "@siimple/css";
```

The previous line includes the whole package, but you can include only some parts of **siimple css**:

```scss
//Option 2: include only some parts of siimple css
@use "@siimple/css/scss/elements/btn.scss";
@use "@siimple/css/scss/components/alert.scss";
```

Every variable in **siimple css** includes the `!default` flag, so you can **override** the default value of the variables described in this page including the package with the `with` rule without modifying the source code:

```scss
@use "@siimple/css" with (
    $primary: #3298dc,
    $error: #f32b51
);
```

Note that this works only when you include the whole package, but does not work when you include only some parts of the package. Read more about [configuring sass modules here](https://sass-lang.com/documentation/at-rules/use#configuring-modules).


#### Typography

##### Font family variables

**siimple css** uses [Roboto](https://fonts.google.com/specimen/Roboto) as the default font family, imported automatically from **Google Fonts**. You can customize the default font using the following variables: 

```scss
$font-url: "https://fonts.googleapis.com/css?family=Roboto:400,700";
$font-default: "Roboto", sans-serif;
```

Also, you can customize the font used in `code` or `pre` elements with the following variable:

```scss
$font-monospace: monospace;
```

##### Font weight variables 

You can define the font weight for normal and bold texts with the following variables:

```scss
$weight-normal: 400;
$weight-bold: 600;
```

##### Line height variables

```scss
$line-height-small: 18px;
$line-height: 22px;
```

##### Text variables

```scss
$text-size-small: 12px;
$text-size: 15px;
$text-color: $dark;
$text-font: $font-default;
$text-weight: $weight-normal;
```


#### Colors

The following colors are defined in **siimple css**:
 
<style>
.colors {
    display: inline-block;
    width: 80px;
    border-radius: 5px;
    padding: 15px;
    margin: 5px;
}
.colors-title {
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 2px;
}
.colors-hex {
    font-size: 12px;
    text-align: center;
}
.colors-container {
    margin-bottom: 15px;
    margin-left: -5px;
    margin-right: -5px;
}
</style>
<div class="colors-container">
    <div class="colors siimple--color-white siimple--bg-primary">
        <div class="colors-title">primary</div>
        <div class="colors-hex">#4e91e4</div>
    </div>
    <div class="colors siimple--color-white siimple--bg-secondary">
        <div class="colors-title">secondary</div>
        <div class="colors-hex">#4ccdac</div>
    </div>
    <div class="colors siimple--color-white siimple--bg-success">
        <div class="colors-title">success</div>
        <div class="colors-hex">#4acf7f</div>
    </div>
    <div class="colors siimple--color-white siimple--bg-warning">
        <div class="colors-title">warning</div>
        <div class="colors-hex">#fbc850</div>
    </div>
    <div class="colors siimple--color-white siimple--bg-error">
        <div class="colors-title">error</div>
        <div class="colors-hex">#ee675d</div>
    </div>
</div>
<div class="colors-container">
    <div class="colors siimple--color-white siimple--bg-dark">
        <div class="colors-title">dark</div>
        <div class="colors-hex">#34495e</div>
    </div>
    <div class="colors siimple--color-dark siimple--bg-light">
        <div class="colors-title">light</div>
        <div class="colors-hex">#dde5ee</div>
    </div>
</div>

These colors can be overrided using the following sass variables:

```scss
$primary: #4e91e4;
$secondary: #4ccdac;
$success: #4acf7f;
$warning: #fbc850;
$error: #ee675d;
$dark: #34495e;
$light: #eef2f7;
```

#### Breakpoints

The breakpoints are useful to customize how the content is displayed depending on the screen width. Currently responsive breakpoints are used in `grid` and `layout` modules.

##### Breakpoints variables

The following breakpoints variables are defined by default in **siimple css**:

```scss
$breakpoint-xsmall: 480px;
$breakpoint-small: 600px;
$breakpoint-medium: 768px;
$breakpoint-large: 960px;
$breakpoint-xlarge: 1280px;
```



