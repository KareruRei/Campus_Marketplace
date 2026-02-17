Route::get('/products', function () {
    return response()->json([
        ['id' => 1, 'name' => 'Test Product']
    ]);
});
