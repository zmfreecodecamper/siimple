---
title: "Class Names"
description: "How siimple css is structured"
---

Class names in **siimple css** are based on the [BEM](https://getbem.com/) (**B**lock **E**lement **M**odifier) methodology. 
Each class has the prefix `siimple` and is followed by one dash and the block name. For example, for building a button you should add a `siimple-btn` class to any `<div>` or `<button>` element:

```
<div class="siimple-btn">
    My button
</div>
```

Any modifier of a block (for example to change the block color) can be specified adding a double dash after the block name and then the modifier name. For example, for adding the primary color to the preoviuos button, you should add the class `siimple-btn--primary`:

```
<div class="siimple-btn siimple-btn--primary">
    My blue button
</div>
```

There are also blocks that can contain elements inside. Class names for these elements are specified adding a dash after the block name and followed by the element name. For example, to style each item of a menu, you should add the class `siimple-menu-item` to each item element:

```
<div class="siimple-menu">
    <div class="siimple-menu-item">Menu item</div>
</div>
```

Also, any modifier bound to an element is denoted by a double dash after the element name and then the modifier name.

```
<div class="siimple-menu">
    <div class="siimple-menu-item siimple-menu-item--active">
        Menu item
    </div>
</div>
```


