<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\Donor;
use App\Models\Donation;
use Illuminate\Http\Request;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $year = now()->year;

        $rows = Donation::whereYear('donation_date', $year)
            ->selectRaw("MONTH(donation_date) as m,
                        COUNT(*) as donations,
                        SUM(donation_status = 'Scheduled') as pending")
            ->groupBy('m')
            ->get()
            ->keyBy('m');

        $monthlyDonation = collect(range(1, 12))->map(fn ($m) => [
            'month'     => Carbon::create($year, $m, 1)->format('M'),
            'donations' => (int) ($rows[$m]->donations ?? 0),
            'pending'   => (int) ($rows[$m]->pending ?? 0),
        ])->values();

        $colors = [
            'A+'  => '#2563eb', 'A-'  => '#bfdbfe',
            'AB+' => '#1e3a8a', 'AB-' => '#1e40af',
            'B+'  => '#93c5fd', 'B-'  => '#3b82f6',
            'O+'  => '#1d4ed8', 'O-'  => '#60a5fa',
        ];

        $counts = Donation::selectRaw('blood_type, COUNT(*) as value')
            ->groupBy('blood_type')
            ->pluck('value', 'blood_type');

        $bloodTypeData = collect($colors)->map(fn ($color, $type) => [
            'type'  => $type,
            'value' => (int) ($counts[$type] ?? 0),
            'color' => $color,
        ])->values();

        $recentDonations = Donation::with('donor')
        ->latest('donation_date')
        ->limit(4)
        ->get()
        ->map(fn ($d) => [
            'name'      => trim(($d->donor->first_name ?? '') . ' ' . ($d->donor->last_name ?? '')) ?: '-',
            'id'        => 'DON' . str_pad($d->id, 3, '0', STR_PAD_LEFT),
            'date'      => $d->donation_date->format('M d, Y'),
            'bloodType' => $d->blood_type,
            'status'    => $d->donation_status,
        ]);

        return Inertia::render('Dashboard', [
            'stats' => [
                ['label' => 'TOTAL DONORS',    'value' => Donor::count()],
                ['label' => 'ELIGIBLE DONORS', 'value' => Donor::where('eligibility_status', 'Eligible')->count()],
                ['label' => 'TOTAL DONATIONS', 'value' => Donation::count()],
            ],
            'monthlyDonation' => $monthlyDonation,
            'bloodTypes' => $bloodTypeData,
            'recentDonations' => $recentDonations
        ]);
    }
}
