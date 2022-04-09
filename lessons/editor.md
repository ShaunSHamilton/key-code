# Key Code - Editor

## 1

### --description--

Use the `CTRL + SHIFT + DOWN` shortcut to select lines `1` and `2`.

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

Use the `SHIFT + ALT + DOWN` shortcut to copy the seleted lines down.

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

Use the `CTRL + SHIFT + UP` shortcut to select lines `6 - 4`.

### --tests--

You should use the `CTRL + SHIFT + UP` shortcut to select lines `6 - 4`.

```js

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
placeCursor(0, 0);
```

## 4

### --description--

Use the `CTRL + SHIFT + K` shortcut to completely delete lines `6 - 4`.

### --tests--

You should use the `CTRL + SHIFT + K` shortcut to completely delete lines `6 - 4`.

```js

```

### --seed--

```js
let myCode = "Key";
let yourCode = "Code";
console.log(myCode + " " + yourCode);
let myCode = "Key";
let yourCode = "Code";
console.log(myCode + " " + yourCode);
```

### --cmd--

```js
placeCursor(0, 0);
```

### --description--

Well done!

### --tests--

FaIl

```md
test
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
