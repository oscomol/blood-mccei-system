<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Donor extends Model
{
    use HasFactory;

    protected $fillable = [
        'first_name',
        'middle_name',
        'last_name',
        'sex',
        'date_of_birth',
        'contact_number',
        'email',
        'blood_type',
        'address',
        'eligibility_status',
        'lifecycle_status',
    ];

    protected $casts = [
        'date_of_birth' => 'date',
    ];

    protected $appends = ['full_name', 'created_at_formatted'];

    public function getCreatedAtFormattedAttribute()
    {
        return $this->created_at?->format('M d, Y');
    }

    public function getFullNameAttribute()
    {
        $middleInitial = $this->middle_name
            ? strtoupper(substr($this->middle_name, 0, 1)) . '.'
            : '';

        return trim(preg_replace('/\s+/', ' ', "{$this->first_name} {$middleInitial} {$this->last_name}"));
    }

    public function donations(): HasMany
    {
        return $this->hasMany(Donation::class);
    }
}
