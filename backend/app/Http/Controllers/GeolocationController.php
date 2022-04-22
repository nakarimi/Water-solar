<?php

namespace App\Http\Controllers;

use App\Models\Geolocation;
use Illuminate\Http\Request;
use DB;
use App\Models\Irradiation;
Use \Carbon\Carbon;

class GeolocationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Geolocation::all();
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
            $geolocation = Geolocation::create([
                'country' => $request['countryName'],
                'city' => $request['district'],
                'latitude' => $request['latitude'],
                'longtitude' => $request['longtitude'],
            ]);
            // $geolocation= new Geolocation;
            // $geoloaction->country = $request['countryName'];
            // $geoloaction->city = $request['district'];
            // $geoloaction->latitude = $request['latitude'];
            // $geoloaction->longtitude = $request['longtitude'];
            // $geoloaction->save();
            for ($i=0; $i < 12; $i++) { 
                Irradiation::create([
                    'geolocation_id' => $geolocation->id,
                    'month_id' => $i+1,
                    't6am' => $request['time6_7'],
                    't7am' => $request['time7_8'],
                    't8am' => $request['time8_9'],
                    't9am' => $request['time9_10'],
                    't10am' => $request['time10_11'],
                    't11am' => $request['time11_12'],
                    't12am' => $request['time12_1'],
                    't1pm' => $request['time1_2'],
                    't2pm' => $request['time2_3'],
                    't3pm' => $request['time3_4'],
                    't4pm' => $request['time4_5'],
                    't5pm' => $request['time5_6'],
                    't6pm' => $request['time6_7'],
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
     * @param  \App\Models\Geolocation  $geolocation
     * @return \Illuminate\Http\Response
     */
    public function show($geoId)
    {
        $date = Carbon::now();
        $currentTime = $date->format('H:i:s');
        $newdata = array();
        $locations = Geolocation::all();
        foreach ($locations as $location) {
            $insideData = [
                'id' => $location->id,
                'country' => $location->country,
                'city' => $location->city,
                'latitude' => $location->latitude,
                'longtitude' => $location->longtitude,
            ];

            $irradiation = Irradiation::where('month_id', $date->month)->where('geolocation_id', $location->id)->get();
            if('06:00:00' <= $currentTime &&  $currentTime < '07:00:00'){
                $insideData['currentIrr'] = $irradiation[0]->t6am;
            }
            elseif('07:00:00' <= $currentTime && $currentTime < '08:00:00'){
                $insideData['currentIrr'] =  $irradiation[0]->t7am;
            }
            elseif('08:00:00' <= $currentTime && $currentTime < '09:00:00'){
                $insideData['currentIrr'] =  $irradiation[0]->t8am;
            }
            elseif('09:00:00' <= $currentTime && $currentTime < '10:00:00'){
                $insideData['currentIrr'] =  $irradiation[0]->t9am;
            }
            elseif('10:00:00' <= $currentTime && $currentTime < '11:00:00'){
                $insideData['currentIrr'] =  $irradiation[0]->t10am;
            }
            elseif('11:00:00' <= $currentTime && $currentTime < '12:00:00'){
                $insideData['currentIrr'] =  $irradiation[0]->t11am;
            }
            elseif('12:00:00' <= $currentTime && $currentTime < '13:00:00'){
                $insideData['currentIrr'] =  $irradiation[0]->t12am;
            }
            elseif('13:00:00' <= $currentTime && $currentTime < '14:00:00'){
                $insideData['currentIrr'] =  $irradiation[0]->t1pm;
            }
            elseif('14:00:00' <= $currentTime && $currentTime < '15:00:00'){
                $insideData['currentIrr'] =  $irradiation[0]->t2pm;
            }
            elseif('15:00:00' <= $currentTime && $currentTime < '16:00:00'){
                $insideData['currentIrr'] =  $irradiation[0]->t3pm;
            }
            elseif('16:00:00' <= $currentTime && $currentTime < '17:00:00'){
                $insideData['currentIrr'] =  $irradiation[0]->t4pm;
            }
            elseif('17:00:00' <= $currentTime && $currentTime < '18:00:00'){
                $insideData['currentIrr'] =  $irradiation[0]->t5pm;
            }
            elseif('18:00:00' <= $currentTime && $currentTime < '19:00:00'){
                $insideData['currentIrr'] =  $irradiation[0]->t6pm;
            }
            elseif('19:00:00' <= $currentTime && $currentTime < '06:00:00'){
                $insideData['currentIrr'] =  '0.00';
            }
            // $insideData['currentIrr'] =  $currentTime;
            array_push($newdata, $insideData);
        }
        return $newdata;
       /*
            $irradiation = Irradiation::where('month_id', $date->month)->where('geolocation_id', $geoId)->get();
            $currentTime = $date->format('H:i:s');
            if('06:00:00' <= $currentTime &&  $currentTime < '07:00:00'){
                return $irradiation[0]->t6am;
            }
            elseif('07:00:00' <= $currentTime && $currentTime < '08:00:00'){
            return $irradiation[0]->t7am;
            }
            elseif('08:00:00' <= $currentTime && $currentTime < '09:00:00'){
                return $irradiation[0]->t8am;
            }
            elseif('09:00:00' <= $currentTime && $currentTime < '10:00:00'){
                return $irradiation[0]->t9am;
            }
            elseif('10:00:00' <= $currentTime && $currentTime < '11:00:00'){
                return $irradiation[0]->t10am;
            }
            elseif('11:00:00' <= $currentTime && $currentTime < '12:00:00'){
                return $irradiation[0]->t11am;
            }
            elseif('12:00:00' <= $currentTime && $currentTime < '13:00:00'){
                return $irradiation[0]->t12am;
            }
            elseif('13:00:00' <= $currentTime && $currentTime < '14:00:00'){
                return $irradiation[0]->t1pm;
            }
            elseif('14:00:00' <= $currentTime && $currentTime < '15:00:00'){
                return $irradiation[0]->t2pm;
            }
            elseif('15:00:00' <= $currentTime && $currentTime < '16:00:00'){
                return $irradiation[0]->t3pm;
            }
            elseif('16:00:00' <= $currentTime && $currentTime < '17:00:00'){
                return $irradiation[0]->t4pm;
            }
            elseif('17:00:00' <= $currentTime && $currentTime < '06:00:00'){
                return $irradiation[0]->t5pm;
            }
        */

        return '';
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Geolocation  $geolocation
     * @return \Illuminate\Http\Response
     */
    public function edit(Geolocation $geolocation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Geolocation  $geolocation
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Geolocation $geolocation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Geolocation  $geolocation
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $geoLocation = Geolocation::findOrFail($id);
        $geoLocation->delete();
        return ['message' => 'Geo Location Deleted'];
    }
}
