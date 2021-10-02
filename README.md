# TodoOrDie.ts
Write TODOs in code that ensure you actually do them

### Credits
This utility was heavily inspired by this Ruby implementation https://github.com/searls/todo_or_die

## Usage

Install it from npm:

```shell
npm i todoordie
```

Once required, you can mark TODOs for yourself anywhere you like:

```typescript
TodoOrDie("Update after backend is implemented", "2023-12-24");
```

To understand why you would ever call a method to write a comment, read on.

### The awful way you used to procrastinate

In the Bad Old Days™, if you had a bit of code you knew you needed to change
later, you might leave yourself a code comment to remind yourself to change it.

``` typescript
# TODO: rewrite with hooks before the next sprint
class UserList extends React.Component<{Props}> {
  ...
}
```

This is bad. The comment does nothing to remind the developer to
actually update the code. If no one is working on this part of the system
for a while, that code won't be updated soon

### The cool new way you put off coding now

To use it, try replacing one of your TODO comments with something like this:

``` typescript
TodoOrDie("Rewrite with hooks", "2021-10-27");
class UserList extends React.Component<{Props}> {
  ...
}
```

Nothing will happen at all until October 27th, at which point the TodoOrDie will
raise an error whenever this class is loaded until someone deals with it.

### What kind of error?

For now, it's only a `console.error` kind of error.
More configuration options will be available soon 
