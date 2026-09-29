<?php

use App\Http\Controllers\DonationController;
use App\Http\Controllers\DonorController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/user-management', [UserController:: class, "index"])->middleware(['auth', 'verified'])->name('user-management');
Route::post('/user-management', [UserController:: class, "createOrUpdate"])->middleware(['auth', 'verified'])->name('user.post');
Route::delete('/user-management/{user}', [UserController::class, 'destroy'])
    ->middleware(['auth', 'verified'])
    ->name('user.delete');

Route::get('/donor-management', [DonorController::class, 'index'])->middleware(['auth', 'verified'])->name('donor-management');
Route::post('/donor-management', [DonorController::class, 'createOrUpdate'])->middleware(['auth', 'verified'])->name('donor.store');
Route::delete('/donor-management/{donor}', [DonorController::class, 'destroy'])
    ->middleware(['auth', 'verified'])
    ->name('donor.delete');

Route::get('/donation-records', [DonationController::class, 'index'])->middleware(['auth', 'verified'])->name('donation-records');
Route::post('/donation-records', [DonationController::class, 'createOrUpdate'])->middleware(['auth', 'verified'])->name('donation.createOrUpdate');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
