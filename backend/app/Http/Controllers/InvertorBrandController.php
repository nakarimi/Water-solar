<?php

namespace App\Http\Controllers;

use App\Models\InvertorBrand;
use Illuminate\Http\Request;
use DB;
use Illuminate\Support\Facades\File;

class InvertorBrandController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return InvertorBrand::all();
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
        // return $request;
        DB::beginTransaction();
        try {

            $photoname = 0;
            $id = $request['invertorBrandID'];
            if($request['image'] != 'oldImage'){
                $photoname = time().'.' . explode('/', explode(':', substr($request->image, 0, strpos($request->image, ';')))[1])[1];
                \Image::make($request->image)->save(public_path('brand/invertor/').$photoname);
                $request->merge(['photo' => $photoname]);
            }
            
            if ($id !== '0') {
                // return "inside if: ".$id;
                $invertorBrand = InvertorBrand::findOrFail($id);
                $invertorBrand->name =  $request['brand'];
                $invertorBrand->country = $request['country'];
                $invertorBrand->discription = 'null';
                if($request->image != 'oldImage'){
                    File::delete('brand/invertor/'.$invertorBrand->image);
                    $invertorBrand->image = $photoname;
                }
                $invertorBrand->save();
            }else{
                // return "inside else:".$id;
                InvertorBrand::create([
                    'name' => $request['brand'], 
                    'country' => $request['country'], 
                    'discription' => 'null', 
                    'image' => $photoname, 
                ]);
            }
            DB::commit();
            return ['msg' => 'Solar brand succefully inserted'];
        } catch (Exception $e) {
            DB::rollback();
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\InvertorBrand  $invertorBrand
     * @return \Illuminate\Http\Response
     */
    public function show(InvertorBrand $invertorBrand)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\InvertorBrand  $invertorBrand
     * @return \Illuminate\Http\Response
     */
    public function edit(InvertorBrand $invertorBrand)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\InvertorBrand  $invertorBrand
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, InvertorBrand $invertorBrand)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\InvertorBrand  $invertorBrand
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $invertorBrand = InvertorBrand::findOrFail($id);
        File::delete('brand/invertor/'.$invertorBrand->image);
        $invertorBrand->delete();
        return ['message' => 'Selected Solar list has been Deleted'];
    }
}
