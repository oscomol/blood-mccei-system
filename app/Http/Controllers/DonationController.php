<?php

namespace App\Http\Controllers;

use App\Models\Donation;
use App\Models\Donor;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DonationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $search = $request->query('search');
        $blood_type = $request->query('blood_type');
        $status_type = $request->query('status_type');

        $donations = Donation::with('donor:id,first_name,middle_name,last_name')
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->whereHas('donor', function ($d) use ($search) {
                        $d->where('first_name', 'like', "%{$search}%")
                            ->orWhere('middle_name', 'like', "%{$search}%")
                            ->orWhere('last_name', 'like', "%{$search}%")
                            ->orWhere('email', 'like', "%{$search}%")
                            ->orWhereRaw(
                                "CONCAT(first_name, ' ', last_name) LIKE ?",
                                ["%{$search}%"]
                            );
                    })
                        ->orWhere('blood_type', 'like', "%{$search}%")
                        ->orWhere('donation_status', 'like', "%{$search}%");
                });
            })
            ->when($blood_type, function ($query, $blood_type) {
                $query->where('blood_type', $blood_type);
            })
            ->when($status_type, function ($query, $status_type) {
                $query->where('donation_status', $status_type);
            })
            ->orderBy('created_at', 'desc')
            ->paginate(5)
            ->withQueryString()
            ->through(fn($donation) => [
                'id'                         => $donation->id,
                'donor_id'                   => $donation->donor_id,
                'donor_name'                 => $donation->donor?->full_name,
                'blood_type'                 => $donation->blood_type,
                'donation_date'              => $donation->donation_date?->format('Y-m-d'),
                'donation_date_display'      => $donation->donation_date?->format('M d, Y'),
                'donation_status'            => $donation->donation_status,
                'next_eligible_date'         => $donation->next_eligible_date?->format('Y-m-d'),
                'next_eligible_date_display' => $donation->next_eligible_date?->format('M d, Y'),
                'remarks'            => $donation->remarks,
            ]);


        $donors = Donor::select('id', 'first_name', 'middle_name', 'last_name', 'blood_type')
            ->get()
            ->map(fn($donor) => [
                'id'         => $donor->id,
                'full_name'  => $donor->full_name,
                'blood_type' => $donor->blood_type,
            ]);


        $counts = Donation::selectRaw('donation_status, COUNT(*) as total')
            ->groupBy('donation_status')
            ->pluck('total', 'donation_status');

        $reports = [
            ['title' => 'Total Donations', 'value' => $counts->sum()],
            ['title' => 'Completed',       'value' => $counts['Completed'] ?? 0],
            ['title' => 'Scheduled',       'value' => $counts['Scheduled'] ?? 0],
            ['title' => 'Deferred',        'value' => $counts['Deferred'] ?? 0],
        ];

        return Inertia::render('DonationRecords', [
            'donations' => $donations,
            'donors'    => $donors,
            'reports' => $reports
        ]);
    }

    public function createOrUpdate(Request $request)
    {
        $validated = $request->validate([
            'id'                  => ['nullable', 'exists:donations,id'],
            'donor_id'           => ['required', 'exists:donors,id'],
            'donation_date'      => ['required', 'date'],
            'blood_type'         => ['required', 'string'],
            'donation_status'    => ['required', 'string'],
            'next_eligible_date' => ['date', 'after:donation_date'],
            'remarks'            => ['string'],
        ]);

        try {
            Donation::updateOrCreate(
                ['id' => $validated['id'] ?? null],
                collect($validated)->except('id')->toArray()
            );

            $message = $request->id ? 'Donation updated successfully.' : 'Donation added successfully.';

            return redirect()->back()->with('success', $message);
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to save donation. Please try again.');
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
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
    public function show(Donation $donation)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Donation $donation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Donation $donation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Donation $donation)
    {
        //
    }
}
