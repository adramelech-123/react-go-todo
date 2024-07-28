# GO REACT Project

## Using the MongoDB Driver

```go
func getTodos(c *fiber.Ctx) error {
	var todos []Todo
	cursor, err := collection.Find(context.Background(), bson.M{})
	if err != nil {
		return err
	}

	for cursor.Next(context.Background()) {
		var todo Todo
		if err := cursor.Decode(&todo); err != nil {
			return err
		}
		todos = append(todos, todo)
	}

	return c.JSON(todos)
}
```

This function is a handler for fetching "todos" from a MongoDB collection and returning them as a JSON response. It uses the Fiber web framework for handling HTTP requests.

#### Breakdown of the Code:

1. **Function Definition**:
    ```go
    func getTodos(c *fiber.Ctx) error {
    ```
    This defines a function named `getTodos` that takes a single parameter `c` of type `*fiber.Ctx` (a pointer to a Fiber context) and returns an error.

2. **Variable Declaration**:
    ```go
    var todos []Todo
    ```
    This declares a slice of `Todo` structs to hold the results fetched from the MongoDB collection.

3. **Finding Documents**:
    ```go
    cursor, err := collection.Find(context.Background(), bson.M{})
    if err != nil {
        return err
    }
    ```
    - `collection.Find`: This method is used to search for documents in the MongoDB collection. The `Find` method returns a cursor which can be used to iterate over the results.
    - `context.Background()`: This creates a context, which is used to manage the lifecycle of the request. In this case, it is used to handle the cancellation and timeout for the operation.
    - `bson.M{}`: This is an empty BSON (Binary JSON) map, meaning the query will match all documents in the collection.
    - If there's an error during the `Find` operation, it returns the error.

4. **Iterating Over the Cursor**:
    ```go
    for cursor.Next(context.Background()) {
        var todo Todo
        if err := cursor.Decode(&todo); err != nil {
            return err
        }
        todos = append(todos, todo)
    }
    ```
    - `cursor.Next`: This method advances the cursor to the next document. It returns `true` if there is another document available.
    - `cursor.Decode`: This method decodes the current document into the `todo` variable of type `Todo`.
    - If there's an error during decoding, it returns the error.
    - Each `todo` is appended to the `todos` slice.

5. **Returning JSON Response**:
    ```go
    return c.JSON(todos)
    ```
    This converts the `todos` slice to a JSON response and sends it back to the client.

### Use of the API Driver

In this code, the API driver in use is the MongoDB Go driver (`go.mongodb.org/mongo-driver`). It provides methods and functionalities to interact with MongoDB from Go code. The `collection.Find` method is part of this driver and is used to execute a query against the MongoDB collection.

### Cursor in MongoDB Driver

In MongoDB, a cursor is a pointer to the result set of a query. When you perform a query in MongoDB, it returns a cursor which can be used to iterate over the documents that match the query criteria. The cursor is a powerful concept because it allows you to efficiently handle large sets of data without loading all of them into memory at once. Instead, you can process documents one at a time.

In the provided code:
- `cursor, err := collection.Find(context.Background(), bson.M{})` initializes the cursor by executing the `Find` query.
- `cursor.Next(context.Background())` advances the cursor to the next document in the result set.
- `cursor.Decode(&todo)` decodes the current document into a `Todo` struct.

The cursor abstracts the details of fetching documents and provides a simple way to iterate over the results, making it easier to work with large data sets.