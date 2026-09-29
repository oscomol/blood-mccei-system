<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Donation extends Model
{
    use HasFactory;

    protected $fillable = [
        'donor_id',
        'donation_date',
        'blood_type',
        'donation_status',
        'next_eligible_date',
        'remarks',
    ];

    protected $casts = [
        'donation_date'      => 'date',
        'next_eligible_date' => 'date',
    ];

    public function donor(): BelongsTo
    {
        return $this->belongsTo(Donor::class);
    }
}