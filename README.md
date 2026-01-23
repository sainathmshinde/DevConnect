# DevConnect

In Express, routing follows a top-to-bottom sequence. First global middleware runs, then route matching happens using app.use. Inside routers, router-level middleware executes before route-specific middleware, followed by the controller. If any error occurs, control is passed to the global error-handling middleware at the end.

Use app.use() for middleware and common logic that should run for multiple routes or HTTP methods.
Use app.get(), app.post(), etc., for handling specific HTTP requests and business logic.

Use app.use() for middleware and common logic that should run for multiple routes or HTTP methods.
Use app.get(), app.post(), etc., for handling specific HTTP requests and business logic.

Express supports pattern-based routing where ? makes a character optional, \* matches any number of characters, and + matches one or more occurrences. These are mainly used for backward compatibility, wildcard matching, and catch-all routes like 404 handling.

| Symbol | Meaning     | Example      |
| ------ | ----------- | ------------ |
| `?`    | Optional    | `/user?s`    |
| `+`    | One or more | `/go+gle`    |
| `*`    | Wildcard    | `/file*`     |
| `()`   | Group       | `/user(s)?`  |
| `:`    | Param       | `/users/:id` |

Interview Note

Avoid ?, +, \* in REST APIs unless required

Prefer clean routes like /users/:id

- is commonly used for 404 routes

One-Line Interview Answer

Express supports pattern-based routing where ? makes characters optional, + matches one or more occurrences, and \* acts as a wildcard, mainly used for backward compatibility and catch-all routes.
