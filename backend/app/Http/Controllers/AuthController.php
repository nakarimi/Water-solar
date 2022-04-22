<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request){
        // return $request;
        try{

     
        if(Auth::attempt($request->only('email', 'password'))){
            /**@var User $user */
            $user = Auth::user();
            $token = $user->createToken('app')->accessToken;
            return response([
                'message' => 'success',
                'token' => $token,
                'user' => $user
            ]);
        }

        return response([
            'message'=>'Invalid Username / Password'
        ],  401);

    }catch(\Exception $exception){
           return response([
               'message' => $exception->getMessage()
           ], 400);
       }
   }

   public function loginUser(){
       return Auth::user();
   }
}
