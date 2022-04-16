# Key Code - Editor

## 1

### --description--

Use the `CTRL + SHIFT + DOWN` shortcut to select lines `1` and `2`.

```js
// h: 1-2
let myCode = "Key";
let yourCode = "Code";
console.log(myCode + " " + yourCode);
```

### --tests--

You should use the `CTRL + SHIFT + DOWN` shortcut to select lines `1 - 2`.

```js
const sel = getSel();
assert(sel.start.line === 0 && sel.start.character === 0);
assert(sel.end.line === 2 && sel.end.character === 0);
```

### --seed--

```js
let myCode = "Key";
let yourCode = "Code";
console.log(myCode + " " + yourCode);
```

### --cmd--

```js
placeCursor(0, 0);
```

## 2

### --description--

Reselect lines `1 - 2`. Then, use the `SHIFT + ALT + DOWN` shortcut to copy the seleted lines down.

### --tests--

You should use the `SHIFT + ALT + DOWN` shortcut to copy the seleted lines down.

```js
assert(key === "shift+alt+down");
```

### --seed--

```js
let myCode = "Key";
let yourCode = "Code";
console.log(myCode + " " + yourCode);
```

### --cmd--

```js
placeCursor(0, 0);
```

## 3

### --description--

Use the `CTRL + SHIFT + UP` shortcut to select lines `5 - 3`.

```js
// h: 3-5
let myCode = "Key";
let yourCode = "Code";
let myCode = "Key";
let yourCode = "Code";
console.log(myCode + " " + yourCode);
```

### --tests--

You should use the `CTRL + SHIFT + UP` shortcut to select lines `5 - 3`.

```js
const sel = getSel();
assert(sel.start.line === 2 && sel.start.character === 0);
assert(sel.end.line === 4 && sel.end.character === 0);
```

### --seed--

```js
let myCode = "Key";
let yourCode = "Code";
let myCode = "Key";
let yourCode = "Code";
console.log(myCode + " " + yourCode);
```

### --cmd--

```js
placeCursor(5, 0);
```

## 4

### --description--

Reselect lines `5 - 3`. Then, use the `CTRL + SHIFT + K` shortcut to completely delete lines `5 - 3`.

### --tests--

You should use the `CTRL + SHIFT + K` shortcut to completely delete lines `5 - 3`.

```js
assert(key === "ctrl+shift+k");
```

### --seed--

```js
let myCode = "Key";
let yourCode = "Code";
let myCode = "Key";
let yourCode = "Code";
console.log(myCode + " " + yourCode);
```

### --cmd--

```js
// placeCursor(0, 0);
```

### --description--

Well done!

### --tests--

This will always fail.

```js
assert(false);
```

### --seed--

```js
let myCode = "Key";
let yourCode = "Code";
```

### --cmd--

```js
placeCursor(0, 0);
```

## 5

### --description--

Next

### --tests--

Fail

```js
assert(false);
```

### --seed--

```js
let myCode = "Key";
let yourCode = "Code";
```
