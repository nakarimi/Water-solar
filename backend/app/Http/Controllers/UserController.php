<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Privilige;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use DB;
use Illuminate\Support\Facades\File;
use App\Models\Pump_brands;
use App\Models\Solar_brands;
use App\Models\InvertorBrand;
use App\Models\Pump_list;
use App\Models\Solar_list;
use App\Models\InvertorList;
use App\Models\Projects;
use App\Models\Geolocation;
Use \Carbon\Carbon;


class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function signupRequest(Request $request){
        // return $request;

        $photoname = null;
        if($request['companyLogo']){
            $photoname = time().'1.' . explode('/', explode(':', substr($request->companyLogo, 0, strpos($request->companyLogo, ';')))[1])[1];
            \Image::make($request->companyLogo)->save(public_path('temp/').$photoname);
            $request->merge(['photo' => $photoname]);
        }
        $user = [
            'name'=> $request['name'],
            'companyname'=> $request['companyname'],
            'logo'=> $photoname,
            'email'=> $request['email'],
            'city'=> $request['city'],
            'phone'=> $request['phone'],
            'website'=> $request['website'],
        ];
        // $title = "newsletter subscriber";

        // $content = "This is a new newsletter subscriber.";
    
        
        // Mail::send('mail.sendMail', ['title' => $title, 'content' => $content], function ($message) //use ($attach)
        // {
    
        //     $message->from($request['email'], 'Admin');
    
        //     $message->to('mail@tolosoft.co');
    
            
        //     //Add a subject
        //     $message->subject("Newsletter new subscriber");
    
        // });
    
        Mail::send('mail.sendMail', $user, function ($message) use ($user) {
            $message->to('mail@tolosoft.co');
            $message->subject('Sign Up Request');
        });
    }

    public function userCity(){
        return Geolocation::all()->unique('city');
    }
    public function adminDashboard()
    {   
        $pumpbrand = Pump_brands::all();
        $solarbrand = Solar_brands::all();
        $invertorBrand = InvertorBrand::all();
        $pumpLists = Pump_list::all();
        $solarLists = Solar_list::all();
        $invertorLists = InvertorList::all();
        $users = User::where('system', 0)->get();
        $currenTmonth = Carbon::now()->month;
        $projects = Projects::all();
        $proOfThMonth = 0;
        foreach ($projects as $project) {
            $projecCurrentMonth = $project->created_at->format('m');
            if($projecCurrentMonth == $currenTmonth){
                ++$proOfThMonth;
            }
        }
        return response()->json([
            'pumpbrand'=>$pumpbrand, 'solarbrand'=>$solarbrand, 'invertorBrand'=>$invertorBrand, 'users'=>$users, 'pumpLists'=>$pumpLists, 'solarLists'=>$solarLists, 'invertorLists'=>$invertorLists, 'projects'=>$projects, 'proOfThMonth'=>$proOfThMonth
        ]);
    }
    public function index()
    {
        return User::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
       
        
        DB::beginTransaction();
        try {

            $photoname = 0;
            $id = $request['id'];
            if($request['userimage'] != 'oldImage'){
                $photoname = time().'.' . explode('/', explode(':', substr($request->userimage, 0, strpos($request->userimage, ';')))[1])[1];
                \Image::make($request->userimage)->save(public_path('user/img/').$photoname);
                $request->merge(['photo' => $photoname]);
            }
            if ($id!=='0') {
                $user = User::findOrFail($id);
                $user->name = $request['name'];
                $user->companyname = $request['companyname'];
                $user->email = $request['email'];
                $user->phone = $request['phone'];
                $user->expiration =$request['expiration'];
                $user->status = $request['status'];
                $user->website = $request['website'];
                $user->geolocation_id = $request['city'];
                if(!empty($request['new_password'])){
                    $user->password = Hash::make($request['new_password']);
                }
                if($request->userimage != 'oldImage'){
                    File::delete('user/img/'.$user->userimage);
                    $user->userimage = $photoname;
                }
                $user->save();
            }else{
                User::create([
                    'name' => $request['name'],
                    'system' => 0,
                    'companyname' => $request['companyname'],
                    'email' => $request['email'],
                    'phone' => $request['phone'],
                    'password' => Hash::make($request['password']),
                    'expiration' =>$request['expiration'],
                    'status' => $request['status'],
                    'website' => $request['website'],
                    'userimage' => $photoname,
                    'geolocation_id' => $request['city'],
                ]);
            }

        DB::commit();
        return ['msg' => 'User Success full Registerd'];
    } catch (Exception $e) {
        DB::rollback();
    }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
       
        $user = User::findOrFail($id);
        $user->delete();
        return ['message' => 'User Deleted'];
    }
}
