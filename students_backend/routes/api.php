<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentsGPAController;
use App\Http\Controllers\StudentSubjectController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\SubjectCourseController;
use App\Http\Controllers\TeacherCourseController;
use App\Http\Controllers\TeacherSubjectController;
use App\Http\Controllers\TimeTableController;
use App\Http\Controllers\StudentExamMarksController;
use App\Http\Controllers\StudentExamController;
use App\Http\Controllers\StudentAttendanceController;
use App\Http\Controllers\StudenPaymentController;
use App\Http\Controllers\ExamController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\FacultyController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\StudentCourseController;

// API Routes


Route::get('/teacher/index-by-id/{id}', [TeacherController::class, 'getIndexById']);
Route::get('/subject/index-by-id/{id}', [SubjectController::class, 'getIndexById']);
Route::get('/student/index-by-id/{id}', [StudentController::class, 'getIndexById']);
Route::get('/faculty/index-by-id/{id}', [FacultyController::class, 'getIndexById']);
Route::get('/department/index-by-id/{id}', [DepartmentController::class, 'getIndexById']);
Route::get('/course/index-by-id/{id}', [CourseController::class, 'getIndexById']);
Route::get('/admin/index-by-id/{id}', [AdminController::class, 'getIndexById']);
Route::get('/timetables/index/{id}', [TimeTableController::class, 'getIndexById']);
Route::get('/admins/id-by-name/{fname}/{lname}', [AdminController::class, 'getAdminIdByName']);
Route::get('/admins/full-name-by-id/{id}', [AdminController::class, 'getAdminFullNameById']);
Route::get('/courses/id-by-name/{name}', [CourseController::class, 'getCourseIdByName']);
Route::get('/courses/name-by-id/{id}', [CourseController::class, 'getCourseNameById']);
Route::get('/subjects/id-by-name/{name}', [SubjectController::class, 'getSubjectIdByName']);
Route::get('/subjects/name-by-id/{id}', [SubjectController::class, 'getSubjectNameById']);
Route::get('/teachers/id-by-name/{name}', [TeacherController::class, 'getTeacherIdByName']);
Route::get('/teachers/name-by-id/{id}', [TeacherController::class, 'getTeacherNameById']);
Route::get('/departments/name/{id}', [DepartmentController::class, 'getDepartmentNameById']);
Route::get('/departments/id-by-name/{name}', [DepartmentController::class, 'getDepartmentIdByName']);
Route::get('/faculties/id-by-name/{name}', [FacultyController::class, 'getFacultyIdByName']);
Route::get('/faculties/name-by-id/{id}', [FacultyController::class, 'getFacultyNameById']);
Route::get('/faculties/id-index', [FacultyController::class, 'get_id']);
Route::get('/students/id-by-name/{name}', [StudentController::class, 'getStudentIdByName']);
Route::get('/students/name-by-id/{id}', [StudentController::class, 'getStudentNameById']);



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

//Other Controller Api Routes
Route::post('/lookup', [Controller::class, 'lookup']);
Route::get('/faculties/index', [FacultyController::class, 'get_id']);
Route::get('/department/index', [DepartmentController::class, 'get_id']);



Route::prefix('authController')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);
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



// Students GPA API Routes
Route::prefix('studentsGPA')->group(function () {
    Route::get('/', [StudentsGPAController::class, 'index']);
    Route::post('/', [StudentsGPAController::class, 'store']);
    Route::get('/{id}', [StudentsGPAController::class, 'show']);
    Route::put('/update/{id}', [StudentsGPAController::class, 'update']);
    Route::delete('/{id}', [StudentsGPAController::class, 'destroy']);
});



// Student Subject API Routes
Route::prefix('studentSubject')->group(function () {
    Route::get('/', [StudentSubjectController::class, 'index']);
    Route::post('/', [StudentSubjectController::class, 'store']);
    Route::get('/{id}', [StudentSubjectController::class, 'show']);
    Route::put('/update/{id}', [StudentSubjectController::class, 'update']);
    Route::delete('/{id}', [StudentSubjectController::class, 'destroy']);

});


// Subject API Routes
Route::prefix('subject')->group(function () {
    Route::get('/', [SubjectController::class, 'index']);
    Route::post('/', [SubjectController::class, 'store']);
    Route::get('/{id}', [SubjectController::class, 'show']);
    Route::put('/update/{id}', [SubjectController::class, 'update']);
    Route::delete('/{id}', [SubjectController::class, 'destroy']);

});


// Subject Course API Routes
Route::prefix('subjectCourse')->group(function () {
   Route::get('/', [SubjectCourseController::class, 'index']);
    Route::post('/', [SubjectCourseController::class, 'store']);
    Route::get('/{id}', [SubjectCourseController::class, 'show']);
    Route::put('/update/{id}', [SubjectCourseController::class, 'update']);
    Route::delete('/{id}', [SubjectCourseController::class, 'destroy']);


});



// Teacher Course API Routes
Route::prefix('teacherCourse')->group(function () {
    Route::get('/', [TeacherCourseController::class, 'index']);
    Route::post('/', [TeacherCourseController::class, 'store']);
    Route::get('/{id}', [TeacherCourseController::class, 'show']);
    Route::put('/update/{id}', [TeacherCourseController::class, 'update']);
    Route::delete('/{id}', [TeacherCourseController::class, 'destroy']);

});


// Teacher Subject API Routes
Route::prefix('teacherSubject')->group(function () {
    Route::get('/', [TeacherSubjectController::class, 'index']);
    Route::post('/', [TeacherSubjectController::class, 'store']);
    Route::get('/{id}', [TeacherSubjectController::class, 'show']);
    Route::put('/update/{id}', [TeacherSubjectController::class, 'update']);
    Route::delete('/{id}', [TeacherSubjectController::class, 'destroy']);
});

// Time Table API Routes
Route::prefix('timeTable')->group(function () {
    Route::get('/', [TimeTableController::class, 'index']);
    Route::post('/', [TimeTableController::class, 'store']);
    Route::get('/{id}', [TimeTableController::class, 'show']);
    Route::put('/update/{id}', [TimeTableController::class, 'update']);
    Route::delete('/{id}', [TimeTableController::class, 'destroy']);

});



//Student Exam Marks API Routes
Route::prefix('studentExamMarks')->group(function () {
    Route::get('/', [StudentExamMarksController::class, 'index']);
    Route::post('/', [StudentExamMarksController::class, 'store']);
    Route::get('/{id}', [StudentExamMarksController::class, 'show']);
    Route::put('/update/{id}', [StudentExamMarksController::class, 'update']);
    Route::delete('/{id}', [StudentExamMarksController::class, 'destroy']);
});

//Student Exam  API Routes
Route::prefix('studentExam')->group(function () {
    Route::get('/', [StudentExamController::class, 'index']);
    Route::post('/', [StudentExamController::class, 'store']);
    Route::get('/{id}', [StudentExamController::class, 'show']);
    Route::put('/update/{id}', [StudentExamController::class, 'update']);
    Route::delete('/{id}', [StudentExamController::class, 'destroy']);

});



//Student Attendance API Routes
Route::prefix('student/course')->group(function () {
    Route::get('/', [StudentCourseController::class, 'index']);
    Route::post('/', [StudentCourseController::class, 'store']);
    Route::get('/{id}', [StudentCourseController::class, 'show']);
    Route::put('/update/{id}', [StudentCourseController::class, 'update']);
    Route::delete('/{id}', [StudentCourseController::class, 'destroy']);

});

//Student Attendance API Routes
Route::prefix('attendance')->group(function () {
    Route::get('/', [StudentAttendanceController::class, 'index']);
    Route::post('/', [StudentAttendanceController::class, 'store']);
    Route::get('/{id}', [StudentAttendanceController::class, 'show']);
    Route::put('/update/{id}', [StudentAttendanceController::class, 'update']);
    Route::delete('/{id}', [StudentAttendanceController::class, 'destroy']);
});


//Studen Payment API Routes
Route::prefix('studenPayment')->group(function () {
    Route::get('/', [StudenPaymentController::class, 'index']);
    Route::post('/', [StudenPaymentController::class, 'store']);
    Route::get('/{id}', [StudenPaymentController::class, 'show']);
    Route::put('/update/{id}', [StudenPaymentController::class, 'update']);
    Route::delete('/{id}', [StudenPaymentController::class, 'destroy']);

});

// Exam  API Routes
Route::prefix('exam')->group(function () {
    Route::get('/', [ExamController::class, 'index']);
    Route::post('/', [ExamController::class, 'store']);
    Route::get('/{id}', [ExamController::class, 'show']);
    Route::put('/update/{id}', [ExamController::class, 'update']);
    Route::delete('/{id}', [ExamController::class, 'destroy']);

});

?>
