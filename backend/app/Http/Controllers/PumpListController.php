<?php

namespace App\Http\Controllers;

use App\Models\Pump_list;
use Illuminate\Http\Request;
use DB;
use Illuminate\Support\Facades\File;
class PumpListController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Pump_list::all();
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

            // return $request;
            $photoname = null;
            $dataSheetName = null;
            $graphName = null;
             
            if($request['imageFile']){
                $photoname = time().'1.' . explode('/', explode(':', substr($request->imageFile, 0, strpos($request->imageFile, ';')))[1])[1];
                \Image::make($request->imageFile)->save(public_path('brand/pumpbrand/pump_list/').$photoname);
                $request->merge(['photo' => $photoname]);
            }
            if($request['dataSheetFile']){
                
                $file = $request->get('dataSheetFile');
                if (strpos($file, ',') !== false) {
                    @list($encode, $file) = explode(',', $file);
                }
                $fileName = base64_decode($file, true);  
                $dataSheetName = time().'ds.pdf';
                $destinationPath = public_path('brand/pumpbrand/pump_list/data_sheet/').$dataSheetName;            
                file_put_contents($destinationPath, $fileName);
                
            }
            if($request['graphFile']){
                $graphName = time().'3.' . explode('/', explode(':', substr($request->graphFile, 0, strpos($request->graphFile, ';')))[1])[1];
                \Image::make($request->graphFile)->save(public_path('brand/pumpbrand/pump_list/graph/').$graphName);
                $request->merge(['graph' => $graphName]);
            }
            // return $photoname;
            if (!empty($request['waterListID'])) {
                $pump_list = Pump_list::findOrFail($request['waterListID']);
                $pump_list->pump_brand_id =  $request['brand'];
                $pump_list->model = $request['name'];
                $pump_list->outlet = $request['outlet'];
                $pump_list->ampeier = $request['current'];
                $pump_list->diameter = $request['diameter'];
                $pump_list->power = $request['powerKW'];
                $pump_list->hp = $request['powerHP'];
                $pump_list->weight = $request['weight'];
                $pump_list->voltage= $request['voltage'];
                $pump_list->phase= $request['phase'];
                if($request['imageFile']){
                    File::delete('brand/pumpbrand/pump_list/'.$pump_list->image);
                    $pump_list->image = $photoname;
                }
                if($request['dataSheetFile']){
                    File::delete('brand/pumpbrand/pump_list/data_sheet/'.$pump_list->data_sheet);
                    $pump_list->data_sheet = $dataSheetName;
                }
                if($request['graphFile']){
                    File::delete('brand/pumpbrand/pump_list/graph/'.$pump_list->graph);
                    $pump_list->graph = $graphName;
                }
                $pump_list->discription = 'null';
                $pump_list->save();
            }else{
                // return $request;
                Pump_list::create([
                    'serial_no' => 12, 
                    'pump_brand_id' => $request['brand'], 
                    'model' => $request['name'], 
                    'outlet' => $request['outlet'], 
                    'diameter' => $request['diameter'], 
                    'ampeier' => $request['current'], 
                    'power' => $request['powerKW'], 
                    'voltage' => $request['voltage'], 
                    'phase' => $request['phase'], 
                    'hp' => $request['powerHP'], 
                    'weight' => $request['weight'], 
                    'image' => $photoname, 
                    'data_sheet' => $dataSheetName, 
                    'graph' => $graphName, 
                    'discription' => 'null', 
                ]);
            }
        DB::commit();
        return ['msg' => 'Water Pumps brand successfully inserted'];
        } catch (Exception $e) {
            DB::rollback();
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Pump_list  $pump_list
     * @return \Illuminate\Http\Response
     */
    public function show(Pump_list $pump_list)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Pump_list  $pump_list
     * @return \Illuminate\Http\Response
     */
    public function edit(Pump_list $pump_list)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Pump_list  $pump_list
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Pump_list $pump_list)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Pump_list  $pump_list
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $pump_list = Pump_list::findOrFail($id);
        File::delete('brand/pumpbrand/pump_list/'.$pump_list->image);
        File::delete('brand/pumpbrand/pump_list/data_sheet/'.$pump_list->data_sheet);
        File::delete('brand/pumpbrand/pump_list/graph/'.$pump_list->graph);
        $pump_list->delete();
        return ['message' => 'Selected Solar list has been Deleted'];
    }
}
