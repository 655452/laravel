<!-- resources/views/items/create.blade.php -->
<!DOCTYPE html>
<html>
<head>
    <title>Create Item</title>
</head>
<body>
    <h1>Create Item</h1>

    <form action="{{ route('items.store') }}" method="POST">
        @csrf
        <label for="name">Name:</label>
        <input type="text" name="name" id="name" required>
        <br>
        <label for="title">Title:</label>
        <input type="text" name="title" id="title" required>
        <br>
        <label for="body">Body:</label>
        <textarea name="body" id="body" required></textarea>
        <br>
        <button type="submit">Create</button>
    </form>
</body>
</html>
