<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ItemController;
use Illuminate\Support\Facades\Artisan;

// Route::middleware("auth:api")->get('/user',function (Request $request){
//     return $request->user();
// });
Route::get('/items',[ItemController::class,'index']);

Route::prefix('/item')->group( function(){

    Route::post('/store',[ItemController::class,'store']);
    Route::put('/{id}',[ItemController::class,'update']);
    Route::delete('/{id}',[ItemController::class,'destroy']);
});
Route::get("/run-migrations",function(){
    Artisan::call('optimize:clear');
    Artisan::call('migrate:fresh');

    return "Migrations Executed Successfully";
});