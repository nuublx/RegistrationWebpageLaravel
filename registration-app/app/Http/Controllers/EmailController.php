<?php

namespace App\Http\Controllers;

use App\Mail\emailMailable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Routing\Controller as BaseController;


class EmailController extends BaseController
{
    public function send($username)  {
        Mail::to('Fadiakhaledd@gmail.com')->send(new emailMailable($username));
    }
}
