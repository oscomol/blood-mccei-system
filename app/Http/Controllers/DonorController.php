<?php

namespace App\Http\Controllers;

use App\Models\Donor;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class DonorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->query('search');
        $bloodType = $request->query('blood_type');
        $eligibilityType = $request->query('eligibility_type');
        $lifecycleType = $request->query('lifecycle_type');

        $donors = Donor::when($search, function ($query, $search) {
            $query->where(function ($q) use ($search) {
                $q->where('first_name', 'like', "%{$search}%")
                    ->orWhere('middle_name', 'like', "%{$search}%")
                    ->orWhere('last_name', 'like', "%{$search}%");
            });
        })
            ->when($bloodType, function ($query, $bloodType) {
                $query->where('blood_type', $bloodType);
            })
            ->when($eligibilityType, function ($query, $eligibilityType) {
                $query->where('eligibility_status', $eligibilityType);
            })
             ->when($lifecycleType, function ($query, $lifecycleType) {
                $query->where('lifecycle_status', $lifecycleType);
            })
            ->orderBy('created_at', 'desc')
            ->paginate(6)
            ->withQueryString();

        return Inertia::render('DonorManagement', [
            "donors" => $donors,
            "filters" => $request->only(['search', 'blood_type', 'eligibility_type']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {


        return Inertia::render('Donor/Create');
    }

    public function createOrUpdate(Request $request)
    {
        $validated = $request->validate([
            'id'                  => ['nullable', 'exists:donors,id'],
            'first_name'          => ['required', 'string', 'max:255'],
            'middle_name'         => ['string', 'max:255'],
            'last_name'           => ['required', 'string', 'max:255'],
            'sex'                 => ['required', 'in:Male,Female'],
            'date_of_birth'       => ['required', 'date', 'before:today'],
            'contact_number'      => ['string', 'max:20'],
            'email'               => ['email', 'max:255', Rule::unique('donors', 'email')->ignore($request->id)],
            'blood_type'          => ['string', 'max:5'],
            'address'             => ['string', 'max:500'],
            'eligibility_status'  => ['required', 'string'],
            'lifecycle_status'    => ['required', 'string'],
        ]);

        try {
            Donor::updateOrCreate(
                ['id' => $validated['id'] ?? null],
                collect($validated)->except('id')->toArray()
            );

            $message = $request->id ? 'Donor updated successfully.' : 'Donor added successfully.';

            return redirect()->back()->with('success', $message);
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to save donor. Please try again.');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Donor $donor)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Donor $donor)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Donor $donor)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Donor $donor)
    {
        try {
            $donor->delete();

            return redirect()->back()->with('success', 'Donor deleted succesfully');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to delete donor. Please try again.');
        }
    }
}
