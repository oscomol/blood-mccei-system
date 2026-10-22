<?php

use App\Http\Controllers\DonationController;
use App\Http\Controllers\DonorController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SettingsController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\PasswordController;

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

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/settings', [SettingsController::class, 'index'])->name('settings');

    Route::controller(UserController::class)->prefix('user-management')->group(function () {
        Route::get('/', 'index')->name('user-management');
        Route::post('/', 'createOrUpdate')->name('user.post');
        Route::delete('/{user}', 'destroy')->name('user.delete');
    });

    Route::controller(DonorController::class)->prefix('donor-management')->group(function () {
        Route::get('/', 'index')->name('donor-management');
        Route::post('/', 'createOrUpdate')->name('donor.store');
        Route::delete('/{donor}', 'destroy')->name('donor.delete');
    });

    Route::controller(DonationController::class)->prefix('donation-records')->group(function () {
        Route::get('/', 'index')->name('donation-records');
        Route::post('/', 'createOrUpdate')->name('donation.createOrUpdate');
        Route::delete('/{donation}', 'destroy')->name('donation.delete');
    });
});


Route::middleware('auth')->group(function () {
     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::put('password', [PasswordController::class, 'update'])->name('password.update');

    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
                ->name('logout');
});

Route::middleware('guest')->group(function () {
    Route::get('login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('login', [AuthenticatedSessionController::class, 'store']);
});

