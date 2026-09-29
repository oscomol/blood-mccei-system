<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('donors', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('middle_name');
            $table->string('last_name');
            $table->enum('sex', ['Male', 'Female']);
            $table->date('date_of_birth');
            $table->string('contact_number');
            $table->string('email')->unique();
            $table->string('blood_type');
            $table->text('address');
            $table->string('eligibility_status')->default('Pending');
            $table->string('lifecycle_status')->default('Active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('donors');
    }
};
