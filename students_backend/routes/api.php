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
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\StudentCourseController;


Route::prefix('authController')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);
});

//Other Controller Api Routes
Route::post('/lookup', [Controller::class, 'lookup']);
Route::get('/faculties/index', [FacultyController::class, 'get_id']);
Route::get('/department/index', [DepartmentController::class, 'get_id']);

// Count Routes (keep one valid route per endpoint)
Route::get('/admin/count', [AdminController::class, 'count']);
Route::get('/student/count', [StudentController::class, 'count']);
Route::get('/courses/count', [CourseController::class, 'count']);
Route::get('/department/count', [DepartmentController::class, 'count']);
Route::get('/exam/count', [ExamController::class, 'count']);
Route::get('/faculty/count', [FacultyController::class, 'count']);
Route::get('/teacher/count', [TeacherController::class, 'count']);
Route::get('/timeTable/count', [TimeTableController::class, 'count']);
Route::get('/subject/count', [SubjectController::class, 'count']);

// Students GPA API Routes
Route::prefix('studentsGPA')->group(function () {
    Route::get('/', [StudentsGPAController::class, 'index']);
    Route::post('/', [StudentsGPAController::class, 'store']);
    Route::get('/{id}', [StudentsGPAController::class, 'show']);
    Route::put('/update/{id}', [StudentsGPAController::class, 'update']);
    Route::delete('/{id}', [StudentsGPAController::class, 'destroy']);
});



// Student Subject API Routes
Route::get('/studentSubject', [StudentSubjectController::class, 'index']);
Route::post('/studentSubject', [StudentSubjectController::class, 'store']);
Route::get('/studentSubject/{id}', [StudentSubjectController::class, 'show']);
Route::put('/studentSubject/update/{id}', [StudentSubjectController::class, 'update']);
Route::delete('/studentSubject/{id}', [StudentSubjectController::class, 'destroy']);

// Subject API Routes
Route::prefix('subject')->group(function () {
    Route::get('/', [SubjectController::class, 'index']);
    Route::post('/', [SubjectController::class, 'store']);
    Route::get('/{id}', [SubjectController::class, 'show']);
    Route::put('/update/{id}', [SubjectController::class, 'update']);
    Route::delete('/{id}', [SubjectController::class, 'destroy']);

});


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
Route::prefix('timeTable')->group(function () {
    Route::get('/', [TimeTableController::class, 'index']);
    Route::post('/', [TimeTableController::class, 'store']);
    Route::get('/{id}', [TimeTableController::class, 'show']);
    Route::put('/update/{id}', [TimeTableController::class, 'update']);
    Route::delete('/{id}', [TimeTableController::class, 'destroy']);

});



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
Route::prefix('exam')->group(function () {
    Route::get('/', [ExamController::class, 'index']);
    Route::post('/', [ExamController::class, 'store']);
    Route::get('/{id}', [ExamController::class, 'show']);
    Route::put('/update/{id}', [ExamController::class, 'update']);
    Route::delete('/{id}', [ExamController::class, 'destroy']);

});


// Assingment Mark API Routes
Route::prefix('assingmentMark')->group(function () {
    Route::get('/', [AssingmentMarkController::class, 'index']);
    Route::post('/', [AssingmentMarkController::class, 'store']);
    Route::get('/{id}', [AssingmentMarkController::class, 'show']);
    Route::put('/update/{id}', [AssingmentMarkController::class, 'update']);
    Route::delete('/{id}', [AssingmentMarkController::class, 'destroy']);
});




// Assingment API Routes
Route::prefix('assingment')->group(function () {
    Route::get('/', [AssingmentController::class, 'index']);
    Route::post('/', [AssingmentController::class, 'store']);
    Route::get('/{id}', [AssingmentController::class, 'show']);
    Route::put('/update/{id}', [AssingmentController::class, 'update']);
    Route::delete('/{id}', [AssingmentController::class, 'destroy']);

});


// Admin API Routes
Route::prefix('admin')->group(function () {
    Route::get('/', [AdminController::class, 'index']);
    Route::post('/', [AdminController::class, 'store']);
    Route::get('/{id}', [AdminController::class, 'show']);
    Route::put('/update/{id}', [AdminController::class, 'update']);
    Route::delete('/{id}', [AdminController::class, 'destroy']);

    // Additional routes
    Route::get('/names', [AdminController::class, 'names']);
    Route::get('/emails', [AdminController::class, 'emails']);
    Route::get('/attribute/{id}/{attribute}', [AdminController::class, 'getAttributeById']);
});




// Faculty API Routes
Route::prefix('faculty')->group(function () {
    Route::get('/', [FacultyController::class, 'index']);
    Route::post('/', [FacultyController::class, 'store']);
    Route::get('/{id}', [FacultyController::class, 'show']);
    Route::put('/update/{id}', [FacultyController::class, 'update']);
    Route::delete('/{id}', [FacultyController::class, 'destroy']);

});




// Course API Routes
Route::prefix('courses')->group(function () {
    Route::get('/', [CourseController::class, 'index']);
    Route::post('/', [CourseController::class, 'store']);
    Route::get('/{id}', [CourseController::class, 'show']);
    Route::put('/update/{id}', [CourseController::class, 'update']);
    Route::delete('/{id}', [CourseController::class, 'destroy']);
    Route::get('/count', [CourseController::class, 'count']);
});

// Department API Routes
Route::prefix('department')->group(function () {
    Route::get('/', [DepartmentController::class, 'index']);
    Route::post('/', [DepartmentController::class, 'store']);
    Route::get('/{id}', [DepartmentController::class, 'show']);
    Route::put('/update/{id}', [DepartmentController::class, 'update']);
    Route::delete('/{id}', [DepartmentController::class, 'destroy']);
    Route::get('/count', [DepartmentController::class, 'count']);
});


// Students API Routes
Route::prefix('student')->group(function () {
    Route::get('/', [StudentController::class, 'index']);
    Route::post('/', [StudentController::class, 'store']);
    Route::get('/{id}', [StudentController::class, 'show']);
    Route::put('/update/{id}', [StudentController::class, 'update']);
    Route::delete('/{id}', [StudentController::class, 'destroy']);
    Route::get('/count', [StudentController::class, 'count']);
});

// Teacher API Routes
Route::prefix('teacher')->group(function () {
    Route::get('/', [TeacherController::class, 'index']);
    Route::post('/', [TeacherController::class, 'store']);
    Route::get('/{id}', [TeacherController::class, 'show']);
    Route::put('/update/{id}', [TeacherController::class, 'update']);
    Route::delete('/{id}', [TeacherController::class, 'destroy']);
    Route::get('/count', [TeacherController::class, 'count']);
});

