<?php

namespace App\Http\Controllers;

use App\Models\ProcessStage;
use Illuminate\Http\Request;

class ProcessController extends Controller
{
    function all_stages(Request $request)
    {
        $process_stages = ProcessStage::where('user_id', $request->user()->id)
            ->orderBy('order')
            ->get();

        return response(
            $process_stages,
            200
        );
    }

    function add_stage(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'color' => 'required',
            'order' => 'required',
        ]);
        try {
            $process_stage = new ProcessStage();
            $process_stage->user_id = $request->user()->id;
            $process_stage->name = $request->name;
            $process_stage->color = $request->color;
            $process_stage->order = $request->order;
            $process_stage->save();
        } catch (\Throwable $th) {
            return response([
                'message' => 'Something wrong, Train again later.'
            ], 422);
        }


        return response([
            'message' => 'Process stage added successfully!'
        ], 201);
    }

    function get_stage($id, Request $request)
    {
        $process_stage = ProcessStage::where('user_id', $request->user()->id)
            ->where('id', $id)
            ->first();

        return response(
            $process_stage,
            200
        );
    }

    function edit_stage(Request $request)
    {
        $request->validate([
            'id' => 'required',
            'order' => 'required',
        ]);
        try {
            $process_stage = ProcessStage::where('id', $request->id)
                ->where('user_id', $request->user()->id)
                ->first();
            $process_stage->name = $request->name;
            $process_stage->color = $request->color;
            $process_stage->order = $request->order;
            $process_stage->save();
        } catch (\Throwable $th) {
            return response([
                'message' => 'Something wrong, Train again later.'
            ], 422);
        }


        return response([
            'message' => 'Process stage updated successfully!'
        ], 200);
    }

    function delete_stage(Request $request)
    {
        $request->validate([
            'id' => 'required',
        ]);
        try {
            $process_stage = ProcessStage::where('id', $request->id)
                ->where('user_id', $request->user()->id)
                ->delete();
        } catch (\Throwable $th) {
            return response([
                'message' => 'Something wrong, Train again later.'
            ], 422);
        }


        return response([
            'message' => 'Process stage deleted successfully!'
        ], 200);
    }
}
