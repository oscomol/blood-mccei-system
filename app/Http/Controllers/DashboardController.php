<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\Donor;
use App\Models\Donation;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard', [
            'stats' => [
                ['label' => 'TOTAL DONORS',     'value' => Donor::count()],
                ['label' => 'ELIGIBLE DONORS',  'value' => Donor::where('eligibility_status', 'Eligible')->count()],
                ['label' => 'TOTAL DONATIONS',  'value' => Donation::count()],
            ],
        ]);
    }
}
