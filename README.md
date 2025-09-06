### 1) What is the difference between var, let, and const?

**Answer:**

1. **var:** var is a function scoped variable. Can be redeclared inside the function.
2. **let:** let is a block scoped. Can be redeclared inside a block where it was declared and also can be accessed in nested blocks. Outside the block, it's inaccessible.
3. **const:** const is a block scoped constant variable. Inside a block, it can't be redeclared and must be assign a value during variable declaration.

---

### 2) What is the difference between map(), forEach(), and filter()?

**Answer:**

1. **map():** This map() method calls a callback function on each element of an array and return an array containing results.
2. **forEach():** forEach() method is almost similar to map(), but the key difference is: forEach doesn't return something, it just do the loop. On the other hand, map() returns a result.
3. **filter():** filter() method returns condition based array output.

---

### 3) What are arrow functions in ES6?

**Answer:**
Arrow Functions are shorter version of function expressions. The "Arrow Function" was introduced in ES6. Example:

```
const myFunction = ( a, b ) => a + b;
```

---

### 4) How does destructuring assignment work in ES6?

**Answer:**
We take a piece from an object or array and make it a new reusable variable. Example:

```
const car = { brand: "Toyota", model: "Supra", year: 2019 };
const { model } = car;
```

---

### 5) Explain template literals in ES6. How are they different from string concatenation?

**Answer:**
**Template literals:** Template string is a new effective replacement for string typing. Imagine we need to write a person's info in a string form an object.

```
const person = {
    name: "Michael Jackson",
    age: 45,
    address: 'USA',
    phoneNo: '01234556778',
}
```

Old Method:

```
personStr = "I am " + person.name + ". I am " + person.age + " years old. I live in " + person.address + ". My phone number is: " + person.phoneNo + "."
```

New Method:

```
personStr = `I am ${person.name}. I am ${person.age} years old. I live in ${person.address}. My phone number is: ${person.phoneNo}.`
```

In short: Template literal is a life saving string writing system. It makes our code cleaner and much more readable.
