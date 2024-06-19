<!-- resources/views/items/index.blade.php -->

<!DOCTYPE html>
<html>
<head>
    <title>Items List</title>
</head>
<body>
    <h1>Items List</h1>
    <!-- Display list of items -->
    @foreach ($items as $item)
        <p>{{ $item->name }}</p>
    @endforeach
</body>
</html>
