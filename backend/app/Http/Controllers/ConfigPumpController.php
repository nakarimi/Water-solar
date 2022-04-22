<?php

namespace App\Http\Controllers;

use App\Models\Config_pump;
use Illuminate\Http\Request;
use DB;

class ConfigPumpController extends Controller
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
            Config_pump::where('pump_list_id', $data[0]['pumpListId'])->delete();
                foreach($data as $value){
                    $config_pump = Config_pump::create([
                        'min_head' => $value['head'][0],
                        'max_head' => $value['head'][1],
                        'min_discharge' => $value['discharge'][0],
                        'max_discharge' => $value['discharge'][1],
                        'min_cable_length' => $value['cableLength'][0],
                        'max_cable_length' => $value['cableLength'][1],
                        'pump_list_id' => $value['pumpListId'],
                        'cable_type_id' => $value['cableType'],
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
     * @param  \App\Models\Config_pump  $config_pump
     * @return \Illuminate\Http\Response
     */
    public function show($pumpListId)
    {
        return Config_pump::select()->where('pump_list_id', $pumpListId)->get();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Config_pump  $config_pump
     * @return \Illuminate\Http\Response
     */
    public function edit(Config_pump $config_pump)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Config_pump  $config_pump
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Config_pump $config_pump)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Config_pump  $config_pump
     * @return \Illuminate\Http\Response
     */
    public function destroy(Config_pump $config_pump)
    {
        //
    }
}
