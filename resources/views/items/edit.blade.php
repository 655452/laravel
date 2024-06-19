<!-- resources/views/items/edit.blade.php -->
<!DOCTYPE html>
<html>
<head>
    <title>Edit Item</title>
</head>
<body>
    <h1>Edit Item</h1>

    <form action="{{ route('items.update', $item->id) }}" method="POST">
        @csrf
        @method('PUT')
        <label for="name">Name:</label>
        <input type="text" name="name" id="name" value="{{ $item->name }}" required>
        <br>
        <label for="title">Title:</label>
        <input type="text" name="title" id="title" value="{{ $item->title }}" required>
        <br>
        <label for="body">Body:</label>
        <textarea name="body" id="body" required>{{ $item->body }}</textarea>
        <br>
        <button type="submit">Update</button>
    </form>
</body>
</html>
