<?php

namespace App\Http\Controllers;

use App\Models\Accessories_list;
use Illuminate\Http\Request;
use DB;
use Illuminate\Support\Facades\File;

class AccessoriesListController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Accessories_list::all();
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
            $photoname = null;
            $dataSheetName = null;
            $id = $request['accessoryID'];
            if($request['imageFile']){
                $photoname = time().'.' . explode('/', explode(':', substr($request->imageFile, 0, strpos($request->imageFile, ';')))[1])[1];
                \Image::make($request->imageFile)->save(public_path('accessories/').$photoname);
                $request->merge(['photo' => $photoname]);
            }
            if($request['dataSheetFile']){
                $file = $request->get('dataSheetFile');
                if (strpos($file, ',') !== false) {
                    @list($encode, $file) = explode(',', $file);
                }
                $fileName = base64_decode($file, true);  
                $dataSheetName = time().'ds.pdf';
                $destinationPath = public_path('accessories/data_sheet/').$dataSheetName;            
                file_put_contents($destinationPath, $fileName);
            }
            if (!empty($request['accessoryID'])) {
                // return "it inside if ". $id;
                $accessories_list = Accessories_list::findOrFail($request['accessoryID']);
                $accessories_list->name = $request['name'];
                $accessories_list->model = $request['model'];
                $accessories_list->uom_id = $request['uom'];
                $accessories_list->uom_name = $request['uom_name'];
                $accessories_list->min_quantity = $request['min_quantity'];
                $accessories_list->max_quantity = $request['max_quantity'];
                if($request['imageFile']){
                    File::delete('accessories/'.$accessories_list->image);
                    $accessories_list->image = $photoname;
                }
                if($request['dataSheetFile']){
                    File::delete('accessories/data_sheet/'.$accessories_list->data_sheet);
                    $accessories_list->data_sheet = $dataSheetName;
                }
                $accessories_list->discription = '';
                $accessories_list->save();
               
            }else{
                // return "inside elase: ".$request;
                Accessories_list::create([
                    'accessories_type_id' => $request['type'],
                    'name' => $request['name'],
                    'model' => $request['model'],
                    'uom_id' => $request['uom'],
                    'uom_name' => $request['uom_name'],
                    'min_quantity' =>$request['min_quantity'],
                    'max_quantity' =>$request['max_quantity'],
                    'discription' => 'null',
                    'image' => $photoname,
                    'data_sheet' => $dataSheetName,
                ]);
            }
            
            DB::commit();
        return ['msg' => 'Accessories Success full inserted'];
    } catch (Exception $e) {
        DB::rollback();
    }
}

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Accessories_list  $accessories_list
     * @return \Illuminate\Http\Response
     */
    public function show(Accessories_list $accessories_list)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Accessories_list  $accessories_list
     * @return \Illuminate\Http\Response
     */
    public function edit(Accessories_list $accessories_list)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Accessories_list  $accessories_list
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Accessories_list $accessories_list)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Accessories_list  $accessories_list
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $accessories_list = Accessories_list::findOrFail($id);
        File::delete('accessories/'.$accessories_list->image);
        File::delete('accessories/data_sheet/'.$accessories_list->data_sheet);
        $accessories_list->delete();
        return ['message' => 'Geo Location Deleted'];
    }
}
