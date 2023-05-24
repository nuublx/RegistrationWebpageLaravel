<?php

namespace Tests\Feature;

use App\Http\Controllers\ActorsController;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class ApiTest extends TestCase
{
    /**
     * API TESTING CLASS
     */
    public function test_the_api_key_if_valid(): void
    {
        $actors_controller = new ActorsController();

        $response = Http::withHeaders([
            'X-RapidAPI-Host' => 'online-movie-database.p.rapidapi.com',
            'X-RapidAPI-Key' => $actors_controller->get_api_key(),

        ])->get('https://imdb8.p.rapidapi.com/actors/get-bio', [
                'nconst' => 'nm0000093', // Brad Pitt ID from IMDB
            ]);
        // Convert the JSON response into a PHP object or associative array
        $data = json_decode($response, true);

        // Access the name property of the object or array
        $name = $data['name'];

        $this->assertEquals('Brad Pitt', $name);

    }
}