<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{

    public function index(Request $request)
    {
        $search = $request->query('search');

        $users = User::where('id', '!=', auth()->id())
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                });
            })
            ->orderBy('created_at', 'desc')
            ->paginate(6)
            ->withQueryString();

        return Inertia::render('UserManagement', [
            'users' => $users,
            'filters' => $request->only(['search']),
        ]);
    }

    public function createOrUpdate(Request $request)
    {
        $validated = $request->validate([
            'id' => 'nullable|exists:users,id',
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:users,email,' . $request->id,
            'status' => 'required|string',
        ]);

        try {
            if ($request->id) {
                $user = User::findOrFail($request->id);
                $user->update($validated);
                $message = 'User ' . $user->name . ' has been updated.';
            } else {
                $validated['password'] = Hash::make('123');
                $user = User::create($validated);
                $message = 'User ' . $user->name . ' has been created with the default password of 123.';
            }

            return redirect()->back()->with('success', $message);
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to save user. Please try again.');
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
        ]);

        try {
            $validated["password"] = Hash::make('123');
            $validated["status"] = $request->status;
            $user = User::create($validated);

            return redirect()->back()->with('success', 'User ' . $user->name . ' has been created with the default password of 123.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to create user. Please try again.');
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        try {
            $name = $user->name;
            $user->delete();

            return redirect()->back()->with('success', 'User ' . $name . ' has been deleted.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to delete user. Please try again.');
        }
    }
}
