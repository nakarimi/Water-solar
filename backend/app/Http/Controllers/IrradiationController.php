<?php

namespace App\Http\Controllers;

use App\Models\Irradiation;
use Illuminate\Http\Request;
use DB;
class IrradiationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Irradiation::all();
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
            $irradiation = Irradiation::select()->where('geolocation_id', $request['geolocation_id'])->where('month_id', $request['month_id'])->first();
            if($irradiation){
                // return "it is inside if";
                
                $irradiation->t6am = $request['time6_7'];
                $irradiation->t7am = $request['time7_8'];
                $irradiation->t8am = $request['time8_9'];
                $irradiation->t9am = $request['time9_10'];
                $irradiation->t10am = $request['time10_11'];
                $irradiation->t11am = $request['time11_12'];
                $irradiation->t12am = $request['time12_1'];
                $irradiation->t1pm = $request['time1_2'];
                $irradiation->t2pm = $request['time2_3'];
                $irradiation->t3pm = $request['time3_4'];
                $irradiation->t4pm = $request['time4_5'];
                $irradiation->t5pm = $request['time5_6'];
                $irradiation->t6pm = $request['time6_7p'];
                $irradiation->update();

            }
            DB::commit();
        }catch (Exception $e) {
            DB::rollback();
        }
        
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Irradiation  $irradiation
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        // $irradiationJan = Irradiation::select()->where('geolocation_id', $id)->where('month_id', 1)->get();
        // $irradiationFeb = Irradiation::select()->where('geolocation_id', $id)->where('month_id', 2)->get();
        // $irradiationMar = Irradiation::select()->where('geolocation_id', $id)->where('month_id', 3)->get();
        // $irradiationApr = Irradiation::select()->where('geolocation_id', $id)->where('month_id', 4)->get();
        // $irradiationMay = Irradiation::select()->where('geolocation_id', $id)->where('month_id', 5)->get();
        // $irradiationJun = Irradiation::select()->where('geolocation_id', $id)->where('month_id', 6)->get();
        // $irradiationJul = Irradiation::select()->where('geolocation_id', $id)->where('month_id', 7)->get();
        // $irradiationAug = Irradiation::select()->where('geolocation_id', $id)->where('month_id', 8)->get();
        // $irradiationSep = Irradiation::select()->where('geolocation_id', $id)->where('month_id', 9)->get();
        // $irradiationOct = Irradiation::select()->where('geolocation_id', $id)->where('month_id', 10)->get();
        // $irradiationNov = Irradiation::select()->where('geolocation_id', $id)->where('month_id', 11)->get();
        // $irradiationDec = Irradiation::select()->where('geolocation_id', $id)->where('month_id', 12)->get();
        // return ['data' => ['irradiationJan' => $irradiationJan, 'irradiationFeb' => $irradiationFeb, 
        // 'irradiationMar' => $irradiationMar, 'irradiationApr' => $irradiationApr, 'irradiationMay' => $irradiationMay,
        //  'irradiationJun' => $irradiationJun, 'irradiationJul' => $irradiationJul, 'irradiationAug' => $irradiationAug, 
        //  'irradiationSep' => $irradiationSep, 'irradiationOct' => $irradiationOct, 'irradiationNov' => $irradiationNov, 'irradiationDec' => $irradiationDec]];
        $data = Irradiation::select()->where('geolocation_id', $id)->get();
        return $data;

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Irradiation  $irradiation
     * @return \Illuminate\Http\Response
     */
    public function edit(Irradiation $irradiation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Irradiation  $irradiation
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Irradiation $irradiation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Irradiation  $irradiation
     * @return \Illuminate\Http\Response
     */
    public function destroy(Irradiation $irradiation)
    {
        //
    }
}
