<?php

namespace App\Http\Controllers;

use App\Models\Pump_brands;
use Illuminate\Http\Request;
use DB;
use Illuminate\Support\Facades\File;

class PumpBrandsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Pump_brands::all();
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
            $id = $request['waterBrandID'];
            if($request['image'] != 'oldImage'){
                $photoname = time().'.' . explode('/', explode(':', substr($request->image, 0, strpos($request->image, ';')))[1])[1];
                \Image::make($request->image)->save(public_path('brand/pumpbrand/').$photoname);
                $request->merge(['photo' => $photoname]);
            }
            if ($id!=='0') {
                $pump_brands = Pump_brands::findOrFail($id);
                $pump_brands->name =  $request['brand'];
                $pump_brands->country = $request['country'];
                $pump_brands->discription = 'null';
                if($request->image != 'oldImage'){
                    File::delete('brand/pumpbrand/'.$pump_brands->image);
                    $pump_brands->image = $photoname;
                }
                $pump_brands->save();
            }else{
                Pump_brands::create([
                    'name' => $request['brand'], 
                    'country' => $request['country'], 
                    'discription' => "null", 
                    'image' => $photoname, 
                ]);
            }

        DB::commit();
        return ['msg' => 'Pump brand succefully inserted'];
        } catch (Exception $e) {
            DB::rollback();
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Pump_brands  $pump_brands
     * @return \Illuminate\Http\Response
     */
    public function show(Pump_brands $pump_brands)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Pump_brands  $pump_brands
     * @return \Illuminate\Http\Response
     */
    public function edit(Pump_brands $pump_brands)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Pump_brands  $pump_brands
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Pump_brands $pump_brands)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Pump_brands  $pump_brands
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $pump_brands = Pump_brands::findOrFail($id);
        File::delete('brand/pumpbrand/'.$pump_brands->image);
        $pump_brands->delete();
        return ['message' => 'Geo Location Deleted'];
    }
}
