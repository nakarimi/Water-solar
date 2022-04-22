<?php

namespace App\Http\Controllers;

use App\Models\Config_Invertor;
use Illuminate\Http\Request;
use DB;

class ConfigInvertorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
            $data = $request->all();
            Config_Invertor::where('invertor_list_id', $data[0]['invertor_list_id'])->delete();
                foreach($data as $value){
                    $config_invertor = Config_Invertor::create([
                        'power' => $value['power'],
                        'invertor_list_id' => $value['invertor_list_id'],
                    ]);     
                }
            DB::commit();
        }catch (Exception $e) {
            DB::rollback();
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Config_Invertor  $config_Invertor
     * @return \Illuminate\Http\Response
     */
    public function show($config_invertor_id)
    {
        return Config_Invertor::select()->where('invertor_list_id', $config_invertor_id)->get();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Config_Invertor  $config_Invertor
     * @return \Illuminate\Http\Response
     */
    public function edit(Config_Invertor $config_Invertor)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Config_Invertor  $config_Invertor
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Config_Invertor $config_Invertor)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Config_Invertor  $config_Invertor
     * @return \Illuminate\Http\Response
     */
    public function destroy(Config_Invertor $config_Invertor)
    {
        //
    }
}
