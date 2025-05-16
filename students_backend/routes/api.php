<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\StudentsGPAController;
use App\Http\Controllers\StudentSubjectController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\SubjectCourseController;
use App\Http\Controllers\SubmitAssingmentController;
use App\Http\Controllers\TeacherCourseController;
use App\Http\Controllers\TeacherSubjectController;
use App\Http\Controllers\TimeTableController;
use App\Http\Controllers\StudentExamMarksController;
use App\Http\Controllers\StudentExamController;
use App\Http\Controllers\StudentAttendanceController;
use App\Http\Controllers\StudenPaymentController;
use App\Http\Controllers\ExamController;
use App\Http\Controllers\AssingmentMarkController;
use App\Http\Controllers\AssingmentController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\FacultyController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TeacherController;


Route::middleware('auth:sanctum')->prefix('studentsGPA')->group(function () {
    Route::get('/', [StudentsGPAController::class, 'index']);
    Route::post('/', [StudentsGPAController::class, 'store']);
    Route::get('/{id}', [StudentsGPAController::class, 'show']);
    Route::put('/update/{id}', [StudentsGPAController::class, 'update']);
    Route::delete('/{id}', [StudentsGPAController::class, 'destroy']);
});

Route::middleware('auth:sanctum')->prefix('studentSubject')->group(function () {
    Route::get('/', [StudentSubjectController::class, 'index']);
    Route::post('/', [StudentSubjectController::class, 'store']);
    Route::get('/{id}', [StudentSubjectController::class, 'show']);
    Route::put('/update/{id}', [StudentSubjectController::class, 'update']);
    Route::delete('/{id}', [StudentSubjectController::class, 'destroy']);
});

Route::middleware('auth:sanctum')->prefix('subject')->group(function () {
    Route::get('/', [SubjectController::class, 'index']);
    Route::post('/', [SubjectController::class, 'store']);
    Route::get('/{id}', [SubjectController::class, 'show']);
    Route::put('/update/{id}', [SubjectController::class, 'update']);
    Route::delete('/{id}', [SubjectController::class, 'destroy']);
});

Route::middleware('auth:sanctum')->prefix('subjectCourse')->group(function () {
    Route::get('/', [SubjectCourseController::class, 'index']);
    Route::post('/', [SubjectCourseController::class, 'store']);
    Route::get('/{id}', [SubjectCourseController::class, 'show']);
    Route::put('/update/{id}', [SubjectCourseController::class, 'update']);
    Route::delete('/{id}', [SubjectCourseController::class, 'destroy']);
});

Route::middleware('auth:sanctum')->prefix('submitAssignment')->group(function () {
    Route::get('/', [SubmitAssingmentController::class, 'index']);
    Route::post('/', [SubmitAssingmentController::class, 'store']);
    Route::get('/{id}', [SubmitAssingmentController::class, 'show']);
    Route::put('/update/{id}', [SubmitAssingmentController::class, 'update']);
    Route::delete('/{id}', [SubmitAssingmentController::class, 'destroy']);
});

Route::middleware('auth:sanctum')->prefix('teacherCourse')->group(function () {
    Route::get('/', [TeacherCourseController::class, 'index']);
    Route::post('/', [TeacherCourseController::class, 'store']);
    Route::get('/{id}', [TeacherCourseController::class, 'show']);
    Route::put('/update/{id}', [TeacherCourseController::class, 'update']);
    Route::delete('/{id}', [TeacherCourseController::class, 'destroy']);
});

Route::middleware('auth:sanctum')->prefix('teacherSubject')->group(function () {
    Route::get('/', [TeacherSubjectController::class, 'index']);
    Route::post('/', [TeacherSubjectController::class, 'store']);
    Route::get('/{id}', [TeacherSubjectController::class, 'show']);
    Route::put('/update/{id}', [TeacherSubjectController::class, 'update']);
    Route::delete('/{id}', [TeacherSubjectController::class, 'destroy']);
});

Route::middleware('auth:sanctum')->prefix('timeTable')->group(function () {
    Route::get('/', [TimeTableController::class, 'index']);
    Route::post('/', [TimeTableController::class, 'store']);
    Route::get('/{id}', [TimeTableController::class, 'show']);
    Route::put('/update/{id}', [TimeTableController::class, 'update']);
    Route::delete('/{id}', [TimeTableController::class, 'destroy']);
});

Route::middleware('auth:sanctum')->prefix('studentExamMarks')->group(function () {
    Route::get('/', [StudentExamMarksController::class, 'index']);
    Route::post('/', [StudentExamMarksController::class, 'store']);
    Route::get('/{id}', [StudentExamMarksController::class, 'show']);
    Route::put('/update/{id}', [StudentExamMarksController::class, 'update']);
    Route::delete('/{id}', [StudentExamMarksController::class, 'destroy']);
});

Route::middleware('auth:sanctum')->prefix('studentExam')->group(function () {
    Route::get('/', [StudentExamController::class, 'index']);
    Route::post('/', [StudentExamController::class, 'store']);
    Route::get('/{id}', [StudentExamController::class, 'show']);
    Route::put('/update/{id}', [StudentExamController::class, 'update']);
    Route::delete('/{id}', [StudentExamController::class, 'destroy']);
});

Route::middleware('auth:sanctum')->prefix('attendance')->group(function () {
    Route::get('/', [StudentAttendanceController::class, 'index']);
    Route::post('/', [StudentAttendanceController::class, 'store']);
    Route::get('/{id}', [StudentAttendanceController::class, 'show']);
    Route::put('/update/{id}', [StudentAttendanceController::class, 'update']);
    Route::delete('/{id}', [StudentAttendanceController::class, 'destroy']);
});

Route::middleware('auth:sanctum')->prefix('studenPayment')->group(function () {
    Route::get('/', [StudenPaymentController::class, 'index']);
    Route::post('/', [StudenPaymentController::class, 'store']);
    Route::get('/{id}', [StudenPaymentController::class, 'show']);
    Route::put('/update/{id}', [StudenPaymentController::class, 'update']);
    Route::delete('/{id}', [StudenPaymentController::class, 'destroy']);
});

Route::middleware('auth:sanctum')->prefix('exam')->group(function () {
    Route::get('/', [ExamController::class, 'index']);
    Route::post('/', [ExamController::class, 'store']);
    Route::get('/{id}', [ExamController::class, 'show']);
    Route::put('/update/{id}', [ExamController::class, 'update']);
    Route::delete('/{id}', [ExamController::class, 'destroy']);
});

Route::middleware('auth:sanctum')->prefix('assingmentMark')->group(function () {
    Route::get('/', [AssingmentMarkController::class, 'index']);
    Route::post('/', [AssingmentMarkController::class, 'store']);
    Route::get('/{id}', [AssingmentMarkController::class, 'show']);
    Route::put('/update/{id}', [AssingmentMarkController::class, 'update']);
    Route::delete('/{id}', [AssingmentMarkController::class, 'destroy']);
});

Route::middleware('auth:sanctum')->prefix('assingment')->group(function () {
    Route::get('/', [AssingmentController::class, 'index']);
    Route::post('/', [AssingmentController::class, 'store']);
    Route::get('/{id}', [AssingmentController::class, 'show']);
    Route::put('/update/{id}', [AssingmentController::class, 'update']);
    Route::delete('/{id}', [AssingmentController::class, 'destroy']);
});



Route::prefix('admins')->group(function () {
    Route::get('/admin', [AdminController::class, 'index']);
    Route::post('/admin', [AdminController::class, 'store']);
    Route::get('/admin/{id}', [AdminController::class, 'show']);
    Route::put('/admin/update/{id}', [AdminController::class, 'update']);
    Route::delete('/admin/{id}', [AdminController::class, 'destroy']);
});


Route::middleware('auth:sanctum')->prefix('faculty')->group(function () {
    Route::get('/', [FacultyController::class, 'index']);
    Route::post('/', [FacultyController::class, 'store']);
    Route::get('/{id}', [FacultyController::class, 'show']);
    Route::put('/update/{id}', [FacultyController::class, 'update']);
    Route::delete('/{id}', [FacultyController::class, 'destroy']);
});

Route::middleware('auth:sanctum')->prefix('courses')->group(function () {
    Route::get('/', [CourseController::class, 'index']);
    Route::post('/', [CourseController::class, 'store']);
    Route::get('/{id}', [CourseController::class, 'show']);
    Route::put('/update/{id}', [CourseController::class, 'update']);
    Route::delete('/{id}', [CourseController::class, 'destroy']);
});

Route::middleware('auth:sanctum')->prefix('department')->group(function () {
    Route::get('/', [DepartmentController::class, 'index']);
    Route::post('/', [DepartmentController::class, 'store']);
    Route::get('/{id}', [DepartmentController::class, 'show']);
    Route::put('/update/{id}', [DepartmentController::class, 'update']);
    Route::delete('/{id}', [DepartmentController::class, 'destroy']);
});

// routes/api.php
Route::middleware('auth:sanctum')->prefix('student')->group(function () {
    Route::get('/student', [StudentController::class, 'index']);
    Route::post('/student', [StudentController::class, 'store']);
    Route::get('/student/{id}', [StudentController::class, 'show']);
    Route::put('/student/update/{id}', [StudentController::class, 'update']);
    Route::delete('/student/{id}', [StudentController::class, 'destroy']);
});


Route::middleware('auth:sanctum')->prefix('teacher')->group(function () {
    Route::get('/', [TeacherController::class, 'index']);
    Route::post('/', [TeacherController::class, 'store']);
    Route::get('/{id}', [TeacherController::class, 'show']);
    Route::put('/update/{id}', [TeacherController::class, 'update']);
    Route::delete('/{id}', [TeacherController::class, 'destroy']);
});
