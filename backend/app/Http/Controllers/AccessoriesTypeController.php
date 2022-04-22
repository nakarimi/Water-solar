<?php

namespace App\Http\Controllers;

use App\Models\Accessories_type;
use Illuminate\Http\Request;

class AccessoriesTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Accessories_type::all();
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
        return Accessories_type::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Accessories_type  $accessories_type
     * @return \Illuminate\Http\Response
     */
    public function show(Accessories_type $accessories_type)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Accessories_type  $accessories_type
     * @return \Illuminate\Http\Response
     */
    public function edit(Accessories_type $accessories_type)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Accessories_type  $accessories_type
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Accessories_type $accessories_type)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Accessories_type  $accessories_type
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $accessories = Accessories_type::findOrFail($id);
        $accessories->delete();
        return ['message' => 'Cable type Deleted'];
    }
}
