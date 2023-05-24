<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ActorsController extends Controller
{
    private $month;
    private $day;

    private $api_key = "a8cb7d67d5mshe1afcf4396a06e0p1b3eb3jsn006972e569cf";
    protected function getActorsIds()
    {
        $curl = curl_init();

        curl_setopt_array($curl, [
            CURLOPT_URL => "https://online-movie-database.p.rapidapi.com/actors/list-born-today?month=" . $this->month . "&day=" . $this->day,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "GET",
            CURLOPT_HTTPHEADER => [
                "X-RapidAPI-Host: online-movie-database.p.rapidapi.com",
                "X-RapidAPI-Key: " . $this->api_key,

            ],
        ]);

        $response = curl_exec($curl);
        $err = curl_error($curl);

        curl_close($curl);

        if ($err) {
            return ("cURL Error #:" . $err);
        } else {
            return $response;
        }
    }

    protected function getActorsData($month, $day)
    {
        $this->month = $month;
        $this->day = $day;

        $actorsIDs = json_decode($this->getActorsIds(), true);
        $IDs = [];

        foreach ($actorsIDs as $value) {
            $IDs[] = substr($value, 6, 9);
        }

        $actorsNames = [];

        for ($i = 0; $i < count($IDs); $i++) {

            $response = Http::withHeaders([
                'X-RapidAPI-Host' => 'online-movie-database.p.rapidapi.com',
                'X-RapidAPI-Key' => $this->api_key,

            ])->get('https://imdb8.p.rapidapi.com/actors/get-bio', [
                    'nconst' => $IDs[$i],
                ]);
            // Convert the JSON response into a PHP object or associative array
            $data = json_decode($response, true);

            // Access the name property of the object or array
            $name = $data['name'];

            $actorsNames[] = $name;


        }

        $data = array(
            "Actors' names" => $actorsNames
        );

        return $data;
    }
    public function get_api_key()
    {
        return $this->api_key;
    }
    public function index(Request $request)
    {
        return response()->json($this->getActorsData($request->query('month'), $request->query('day')));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('popup');
    }

}