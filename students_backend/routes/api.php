<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Controller;
use App\Http\Controllers\FacultyController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AssingmentController;
use App\Http\Controllers\AssingmentMarkController;
use App\Http\Controllers\ExamController;
use App\Http\Controllers\StudenPaymentController;
use App\Http\Controllers\StudentAttendanceController;
use App\Http\Controllers\StudentCourseController;
use App\Http\Controllers\StudentExamController;
use App\Http\Controllers\StudentExamMarksController;
use App\Http\Controllers\StudentsGPAController;
use App\Http\Controllers\StudentSubjectController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\SubjectCourseController;
use App\Http\Controllers\SubmitAssingmentController;
use App\Http\Controllers\TeacherCourseController;
use App\Http\Controllers\TeacherSubjectController;
use App\Http\Controllers\TimeTableController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Example API route
Route::get('/test', function (Request $request) {
    return response()->json(['message' => 'API working!']);
});


//Other Controller Api Routes
Route::post('/lookup', [Controller::class, 'lookup']);


// Students GPA API Routes
Route::get('/studentsGPA', [StudentsGPAController::class, 'index']);
Route::post('/studentsGPA', [StudentsGPAController::class, 'store']);
Route::get('/studentsGPA/{id}', [StudentsGPAController::class, 'show']);
Route::put('/studentsGPA/update/{id}', [StudentsGPAController::class, 'update']);
Route::delete('/studentsGPA/{id}', [StudentsGPAController::class, 'destroy']);

// Student Subject API Routes
Route::get('/studentSubject', [StudentSubjectController::class, 'index']);
Route::post('/studentSubject', [StudentSubjectController::class, 'store']);
Route::get('/studentSubject/{id}', [StudentSubjectController::class, 'show']);
Route::put('/studentSubject/update/{id}', [StudentSubjectController::class, 'update']);
Route::delete('/studentSubject/{id}', [StudentSubjectController::class, 'destroy']);

// Subject API Routes
Route::get('/subject', [SubjectController::class, 'index']);
Route::post('/subject', [SubjectController::class, 'store']);
Route::get('/subject/{id}', [SubjectController::class, 'show']);
Route::put('/subject/update/{id}', [SubjectController::class, 'update']);
Route::delete('/subject/{id}', [SubjectController::class, 'destroy']);

// Subject Course API Routes
Route::get('/subjectCourse', [SubjectCourseController::class, 'index']);
Route::post('/subjectCourse', [SubjectCourseController::class, 'store']);
Route::get('/subjectCourse/{id}', [SubjectCourseController::class, 'show']);
Route::put('/subjectCourse/update/{id}', [SubjectCourseController::class, 'update']);
Route::delete('/subjectCourse/{id}', [SubjectCourseController::class, 'destroy']);

// Submit Assignment API Routes
Route::get('/submitAssignment', [SubmitAssingmentController::class, 'index']);
Route::post('/submitAssignment', [SubmitAssingmentController::class, 'store']);
Route::get('/submitAssignment/{id}', [SubmitAssingmentController::class, 'show']);
Route::put('/submitAssignment/update/{id}', [SubmitAssingmentController::class, 'update']);
Route::delete('/submitAssignment/{id}', [SubmitAssingmentController::class, 'destroy']);

// Teacher Course API Routes
Route::get('/teacherCourse', [TeacherCourseController::class, 'index']);
Route::post('/teacherCourse', [TeacherCourseController::class, 'store']);
Route::get('/teacherCourse/{id}', [TeacherCourseController::class, 'show']);
Route::put('/teacherCourse/update/{id}', [TeacherCourseController::class, 'update']);
Route::delete('/teacherCourse/{id}', [TeacherCourseController::class, 'destroy']);

// Teacher Subject API Routes
Route::get('/teacherSubject', [TeacherSubjectController::class, 'index']);
Route::post('/teacherSubject', [TeacherSubjectController::class, 'store']);
Route::get('/teacherSubject/{id}', [TeacherSubjectController::class, 'show']);
Route::put('/teacherSubject/update/{id}', [TeacherSubjectController::class, 'update']);
Route::delete('/teacherSubject/{id}', [TeacherSubjectController::class, 'destroy']);

// Time Table API Routes
Route::get('/timeTable', [TimeTableController::class, 'index']);
Route::post('/timeTable', [TimeTableController::class, 'store']);
Route::get('/timeTable/{id}', [TimeTableController::class, 'show']);
Route::put('/timeTable/update/{id}', [TimeTableController::class, 'update']);
Route::delete('/timeTable/{id}', [TimeTableController::class, 'destroy']);

//Student Exam Marks Attendance API Routes
Route::get('/studentExamMarks', [StudentExamMarksController::class, 'index']);
Route::post('/studentExamMarks', [StudentExamMarksController::class, 'store']);
Route::get('/studentExamMarks/{id}', [StudentExamMarksController::class, 'show']);
Route::put('/studentExamMarks/update/{id}', [StudentExamMarksController::class, 'update']);
Route::delete('/studentExamMarks/{id}', [StudentExamMarksController::class, 'destroy']);

//Student Exam Attendance API Routes
Route::get('/studentExam', [StudentExamController::class, 'index']);
Route::post('/studentExam', [StudentExamController::class, 'store']);
Route::get('/studentExam/{id}', [StudentExamController::class, 'show']);
Route::put('/studentExam/update/{id}', [StudentExamController::class, 'update']);
Route::delete('/studentExam/{id}', [StudentExamController::class, 'destroy']);


//Student Attendance API Routes
Route::get('/attendance', [StudentCourseController::class, 'index']);
Route::post('/attendance', [StudentCourseController::class, 'store']);
Route::get('/attendance/{id}', [StudentCourseController::class, 'show']);
Route::put('/attendance/update/{id}', [StudentCourseController::class, 'update']);
Route::delete('/attendance/{id}', [StudentCourseController::class, 'destroy']);


//Student Attendance API Routes
Route::get('/attendance', [StudentAttendanceController::class, 'index']);
Route::post('/attendance', [StudentAttendanceController::class, 'store']);
Route::get('/attendance/{id}', [StudentAttendanceController::class, 'show']);
Route::put('/attendance/update/{id}', [StudentAttendanceController::class, 'update']);
Route::delete('/attendance/{id}', [StudentAttendanceController::class, 'destroy']);

//Studen Payment API Routes
Route::get('/studenPayment', [StudenPaymentController::class, 'index']);
Route::post('/studenPayment', [StudenPaymentController::class, 'store']);
Route::get('/studenPayment/{id}', [StudenPaymentController::class, 'show']);
Route::put('/studenPayment/update/{id}', [StudenPaymentController::class, 'update']);
Route::delete('/studenPayment/{id}', [StudenPaymentController::class, 'destroy']);

// Exam  API Routes
Route::get('/exam', [ExamController::class, 'index']);
Route::post('/exam', [ExamController::class, 'store']);
Route::get('/exam/{id}', [ExamController::class, 'show']);
Route::put('/exam/update/{id}', [ExamController::class, 'update']);
Route::delete('/exam/{id}', [ExamController::class, 'destroy']);

// Assingment Mark API Routes
Route::get('/assingmentMark', [AssingmentMarkController::class, 'index']);
Route::post('/assingmentMark', [AssingmentMarkController::class, 'store']);
Route::get('/assingmentMark/{id}', [AssingmentMarkController::class, 'show']);
Route::put('/assingmentMark/update/{id}', [AssingmentMarkController::class, 'update']);
Route::delete('/assingmentMark/{id}', [AssingmentMarkController::class, 'destroy']);



// Assingment API Routes
Route::get('/assingment', [AssingmentController::class, 'index']);
Route::post('/assingment', [AssingmentController::class, 'store']);
Route::get('/assingment/{id}', [AssingmentController::class, 'show']);
Route::put('/assingment/update/{id}', [AssingmentController::class, 'update']);
Route::delete('/assingment/{id}', [AssingmentController::class, 'destroy']);


// Admin API Routes
Route::get('/admin', [AdminController::class, 'index']);
Route::post('/admin', [AdminController::class, 'store']);
Route::get('/admin/{id}', [AdminController::class, 'show']);
Route::put('/admin/update/{id}', [AdminController::class, 'update']);
Route::delete('/admin/{id}', [AdminController::class, 'destroy']);


// Faculty API Routes
Route::get('/faculty', [FacultyController::class, 'index']);
Route::post('/faculty', [FacultyController::class, 'store']);
Route::get('/faculty/{id}', [FacultyController::class, 'show']);
Route::put('/faculty/update/{id}', [FacultyController::class, 'update']);
Route::delete('/faculty/{id}', [FacultyController::class, 'destroy']);

// Course API Routes
Route::get('/courses', [CourseController::class, 'index']);
Route::post('/courses', [CourseController::class, 'store']);
Route::get('/courses/{id}', [CourseController::class, 'show']);
Route::put('/courses/update/{id}', [CourseController::class, 'update']);
Route::delete('/courses/{id}', [CourseController::class, 'destroy']);

// Department API Routes
Route::get('/department', [DepartmentController::class, 'index']);
Route::post('/department', [DepartmentController::class, 'store']);
Route::get('/department/{id}', [DepartmentController::class, 'show']);
Route::put('/department/update/{id}', [DepartmentController::class, 'update']);
Route::delete('/department/{id}', [DepartmentController::class, 'destroy']);

// Students API Routes
Route::get('/student', [StudentController::class, 'index']);
Route::post('/student', [StudentController::class, 'store']);
Route::get('/student/{id}', [StudentController::class, 'show']);
Route::put('/student/update/{id}', [StudentController::class, 'update']);
Route::delete('/student/{id}', [StudentController::class, 'destroy']);

// Teacher API Routes
Route::get('/teacher', [TeacherController::class, 'index']);
Route::post('/teacher', [TeacherController::class, 'store']);
Route::get('/teacher/{id}', [TeacherController::class, 'show']);
Route::put('/teacher/update/{id}', [TeacherController::class, 'update']);
Route::delete('/teacher/{id}', [TeacherController::class, 'destroy']);
