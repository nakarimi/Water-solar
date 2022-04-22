<?php

namespace App\Http\Controllers;

use App\Models\Config_solar;
use Illuminate\Http\Request;
use DB;
use Illuminate\Support\Facades\File;

class ConfigSolarController extends Controller
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
                $datas = $request->all();
                for($i=0; $i<count($datas); $i++){
                    
                    if($request[$i]['mId']){
                        $solarConfig = Config_solar::findOrFail($request[$i]['id']);
                        if(!empty($solarConfig)){
                            if($request[$i]['imageRaw']){

                                $photoname = time().'202'.rand(1,1000). explode('/', explode(':', substr($request[$i]['imageRaw'], 0, strpos($request[$i]['imageRaw'], ';')))[1])[1];
                                \Image::make($request[$i]['imageRaw'])->save(public_path('brand/solar/solar_list/config/').$photoname);
                                
                                if($solarConfig->image){
                                    File::delete('brand/solar/solar_list/config/'.$solarConfig->image);
                                }
                                $solarConfig->image = $photoname;
                                // return $photoname." inside if of image";
                            }
                            $solarConfig->power = $request[$i]['power'];
                            $solarConfig->base = $request[$i]['base'];
                            $solarConfig->solar_quantity = $request[$i]['quantity'];
                            $solarConfig->panal_quantity = $request[$i]['panal'];
                            // return $photoname." out side on";
                            $solarConfig->save();
                        }
                    }
                    else{
                        if($request[$i]['imageRaw']){
                            $photonameNew = time().'202'.rand(1,1000). explode('/', explode(':', substr($request[$i]['imageRaw'], 0, strpos($request[$i]['imageRaw'], ';')))[1])[1];
                            \Image::make($request[$i]['imageRaw'])->save(public_path('brand/solar/solar_list/config/').$photonameNew);

                            $config_solar = Config_solar::create([
                                'power' => $request[$i]['power'],
                                'base' => $request[$i]['base'],
                                'solar_quantity' => $request[$i]['quantity'],
                                'panal_quantity' => $request[$i]['panal'],
                                'image' => $photonameNew,
                                'solar_list_id' => $request[$i]['solar_list_id'],
                            ]); 
                        }else{
                            $config_solar = Config_solar::create([
                                'power' => $request[$i]['power'],
                                'base' => $request[$i]['base'],
                                'solar_quantity' => $request[$i]['quantity'],
                                'panal_quantity' => $request[$i]['panal'],
                                'solar_list_id' => $request[$i]['solar_list_id'],
                            ]); 
                        }
                    }
                }
                

                // $solarConfigs = Config_solar::where('solar_list_id', $data[0]['solar_list_id'])->get();
                // foreac($solarConfigs as $solarConfig){
                //     if($solarConfig->image){
                //         File::delete('brand/solar/solar_list/config/'.$solarConfig->image);
                //     }
                //     $solarConfig->delete();
                // }
                // foreach($data as $value){
                //     $photoname = 0;
                //     if($value['imageRaw']){
                //         $photoname = time().'sc.' .rand(1,1000). explode('/', explode(':', substr($value['imageRaw'], 0, strpos($value['imageRaw'], ';')))[1])[1];
                //         \Image::make($value['imageRaw'])->save(public_path('brand/solar/solar_list/config/').$photoname);
                //         $value->merge(['photo' => $photoname]);
                //     }
                //     $config_solar = Config_solar::create([
                //         'power' => $value['power'],
                //         'base' => $value['base'],
                //         'solar_quantity' => $value['quantity'],
                //         'panal_quantity' => $value['panal'],
                //         'image' => $photoname,
                //         'solar_list_id' => $value['solar_list_id'],
                //     ]);     
                // }
            DB::commit();
        }catch (Exception $e) {
            DB::rollback();
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Config_solar  $config_solar
     * @return \Illuminate\Http\Response
     */
    public function show($config_solar_id)
    {
        return Config_solar::select()->where('solar_list_id', $config_solar_id)->get();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Config_solar  $config_solar
     * @return \Illuminate\Http\Response
     */
    public function edit(Config_solar $config_solar)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Config_solar  $config_solar
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Config_solar $config_solar)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Config_solar  $config_solar
     * @return \Illuminate\Http\Response
     */
    public function destroy(Config_solar $config_solar)
    {
        //
    }
}
