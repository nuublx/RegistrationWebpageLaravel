<?php

namespace App\Http\Controllers;

use App\Models\my_user;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('register');
    }

    private function process_image($request, $user_id)
    {
        $image = $request->file('user_image');
        $image_name = $user_id . '.' . $image->extension();
        if ($image->move(public_path('images'), $image_name))
            return $image_name;

        return null;
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'user_name' => 'required|max:20',
                'full_name' => 'required|max:50',
                'birth_date' => 'required|date',
                'phone' => 'required|max:20',
                'address' => 'required|max:100',
                'user_image' => 'required|max:100',
                'email' => 'required|email|max:50',
                'password' => 'required|max:100'
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error validating, please fill all required fields correctly',
                'error' => $th->getMessage(),
                'status' => 400
            ], 400);
        }

        if ($request->user_name == null || $request->full_name == null || $request->birth_date == null || $request->phone == null || $request->address == null || $request->email == null || $request->password == null)
            return response()->json([
                'message' => 'Please fill all the fields',
                'status' => 400
            ], 400);

        if (my_user::where('user_name', $request->user_name)->exists())
            return response()->json([
                'message' => 'Username already exists',
                'status' => 302
            ], 302);

        $User = new my_user();
        $user_id = uniqid("USR");

        $User->user_id = $user_id;
        $User->user_name = $request->user_name;
        $User->full_name = $request->full_name;
        $User->birth_date = $request->birth_date;
        $User->phone = $request->phone;
        $User->address = $request->address;
        $User->user_image = $this->process_image($request, $user_id);


        if ($User->user_image == null)
            return response()->json([
                'message' => 'Error in uploading image',
                'status' => 400
            ], 400);


        $User->email = $request->email;
        $User->password = $request->password;
        $User->save();


        return response()->json([
            'message' => 'User registered successfully!',
            'user_id' => $user_id,
            'status' => 201
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(My_User $my_User)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(My_User $my_User)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, My_User $my_User)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(My_User $my_User)
    {
        //
    }
}