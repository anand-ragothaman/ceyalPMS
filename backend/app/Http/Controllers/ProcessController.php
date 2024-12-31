<?php

namespace App\Http\Controllers;

use App\Models\Process;
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

    function all_processes(Request $request)
    {

        $process_stages = ProcessStage::where('user_id', $request->user()->id)
            ->orderBy('order')
            ->get();

        $all_processes = [];

        // foreach ($process_stages as $key => $stage) {
        //     array_push($all_processes, ["stage$stage->id" => Process::where('user_id', $request->user()->id)
        //         ->where('process_stage_id', $stage->id)
        //         ->orderBy('id', 'DESC')
        //         ->get()]);
        // }

        foreach ($process_stages as $key => $stage) {
            $all_processes["stage$stage->id"] = Process::where('user_id', $request->user()->id)
                ->where('process_stage_id', $stage->id)
                ->orderBy('id', 'DESC')
                ->get();
        }

        // $processes = Process::where('user_id', $request->user()->id)
        //     ->orderBy('id', 'DESC')
        //     ->get();

        return response(
            $all_processes,
            200
        );
    }

    function add_process(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'stage' => 'required',
            'summary' => 'required',
        ]);
        try {
            $process = new Process();
            $process->user_id = $request->user()->id;
            $process->title = $request->title;
            $process->process_stage_id = $request->stage;
            $process->summary = $request->summary;
            $process->save();
        } catch (\Throwable $th) {
            return response([
                'message' => 'Something wrong, Train again later.'
            ], 422);
        }


        return response([
            'message' => 'Process added successfully!'
        ], 201);
    }

    function get_process($id, Request $request)
    {
        $process = Process::where('user_id', $request->user()->id)
            ->where('id', $id)
            ->first();

        return response(
            $process,
            200
        );
    }

    function edit_process(Request $request)
    {
        $request->validate([
            'id' => 'required',
        ]);
        try {
            $process = Process::where('id', $request->id)
                ->where('user_id', $request->user()->id)
                ->first();
            $process->title = $request->title;
            $process->process_stage_id = $request->process_stage_id;
            $process->summary = $request->summary;
            $process->save();
        } catch (\Throwable $th) {
            return response([
                'message' => 'Something wrong, Train again later.'
            ], 422);
        }


        return response([
            'message' => 'Process updated successfully!'
        ], 200);
    }

    function delete_process(Request $request)
    {
        $request->validate([
            'id' => 'required',
        ]);
        try {
            $process = Process::where('id', $request->id)
                ->where('user_id', $request->user()->id)
                ->delete();
        } catch (\Throwable $th) {
            return response([
                'message' => 'Something wrong, Train again later.'
            ], 422);
        }


        return response([
            'message' => 'Process deleted successfully!'
        ], 200);
    }
}
