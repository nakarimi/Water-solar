<?php

namespace App\Http\Controllers;

use App\Models\InvertorList;
use Illuminate\Http\Request;
use DB;
use Illuminate\Support\Facades\File;

class InvertorListController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return InvertorList::all();
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
            
            $photoname = null;
            $dataSheetName = null;
            $diameterName = null;
            if($request['imageFile']){
                $photoname = time().'.' . explode('/', explode(':', substr($request->imageFile, 0, strpos($request->imageFile, ';')))[1])[1];
                \Image::make($request->imageFile)->save(public_path('brand/invertor/invertor_list/').$photoname);
                $request->merge(['photo' => $photoname]);
            }
            if($request['diameterFile']){
                $diameterName = time().'.' . explode('/', explode(':', substr($request->diameterFile, 0, strpos($request->diameterFile, ';')))[1])[1];
                \Image::make($request->diameterFile)->save(public_path('brand/invertor/invertor_list/diameter/').$diameterName);
                $request->merge(['photo' => $diameterName]);
            }
            if($request['dataSheetFile']){
                $file = $request->get('dataSheetFile');
                if (strpos($file, ',') !== false) {
                    @list($encode, $file) = explode(',', $file);
                }
                $fileName = base64_decode($file, true);  
                $dataSheetName = time().'ds.pdf';
                $destinationPath = public_path('brand/invertor/invertor_list/data_sheet/').$dataSheetName;            
                file_put_contents($destinationPath, $fileName);
            }
            if (!empty($request['invertorListID'])) {
                $invertorList = InvertorList::findOrFail($request['invertorListID']);
                $invertorList->invertor_brand_id =  $request['brand'];
                $invertorList->model = $request['model'];
                $invertorList->power = $request['powerKW'];
                $invertorList->voltage = $request['voltage'];
                $invertorList->current = $request['current'];
                $invertorList->voltage_dc_min = $request['voltageDC'][0];
                $invertorList->voltage_dc_max = $request['voltageDC'][1];
                $invertorList->voltage_ac_min = $request['voltageAC'][0];
                $invertorList->voltage_ac_max = $request['voltageAC'][1];
                if($request['imageFile']){
                    File::delete('brand/invertor/invertor_list/'.$invertorList->image);
                    $invertorList->image = $photoname;
                }
                if($request['diameterFile']){
                    File::delete('brand/invertor/invertor_list/diameter/'.$invertorList->diameter);
                    $invertorList->diameter = $diameterName;
                }
                if($request['dataSheetFile']){
                    File::delete('brand/invertor/invertor_list/data_sheet/'.$invertorList->data_sheet);
                    $invertorList->data_sheet = $dataSheetName;
                }
                $invertorList->discription = $request['description'];
                $invertorList->save();
            }else{
                InvertorList::create([
                    'invertor_brand_id' => $request['brand'], 
                    'model' => $request['model'], 
                    'power' => $request['powerKW'], 
                    'voltage' => $request['voltage'], 
                    'current' => $request['current'], 
                    'voltage_dc_min' => $request['voltageDC'][0], 
                    'voltage_dc_max' => $request['voltageDC'][1], 
                    'voltage_ac_min' => $request['voltageAC'][0], 
                    'voltage_ac_max' => $request['voltageAC'][1], 
                    'discription' => $request['description'], 
                    'image' => $photoname, 
                    'data_sheet' => $dataSheetName,  
                    'diameter' => $diameterName,  
                ]);
            }
            // return $request;
           

            DB::commit();
            return ['msg' => 'Invertor List succefully inserted'];
        } catch (Exception $e) {
            DB::rollback();
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\InvertorList  $invertorList
     * @return \Illuminate\Http\Response
     */
    public function show(InvertorList $invertorList)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\InvertorList  $invertorList
     * @return \Illuminate\Http\Response
     */
    public function edit(InvertorList $invertorList)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\InvertorList  $invertorList
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, InvertorList $invertorList)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\InvertorList  $invertorList
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $invertorList = InvertorList::findOrFail($id);
        File::delete('brand/invertor/invertor_list/'.$invertorList->image);
        File::delete('brand/invertor/invertor_list/data_sheet/'.$invertorList->data_sheet);
        File::delete('brand/invertor/invertor_list/diameter/'.$invertorList->diameter);
        $invertorList->delete();
        return ['message' => 'Selected Invertor list has been Deleted'];
    }
}
