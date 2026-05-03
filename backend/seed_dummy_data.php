<?php

/**
 * Script to seed dummy data for VLE system
 * Run: php seed_dummy_data.php
 */

require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(\Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Faculty;
use App\Models\Department;
use App\Models\Course;
use App\Models\Subject;
use App\Models\Teacher;
use App\Models\Student;
use App\Models\Exam;
use App\Models\StudentExam;
use App\Models\StudentExamMark;
use App\Models\StudentCourse;
use App\Models\StudentSubject;
use App\Models\TeacherCourse;
use App\Models\TeacherSubject;
use App\Models\SubjectCourse;
use App\Models\StudentAttendance;
use App\Models\StudenPayment;
use App\Models\StudentsGPA;
use App\Models\Book;
use App\Models\BookBorrow;
use App\Models\TimeTable;
use Illuminate\Support\Facades\DB;

echo "Starting to seed dummy data...\n\n";

// Clear existing data (in reverse order of dependencies)
echo "Clearing existing data...\n";
DB::statement('SET FOREIGN_KEY_CHECKS=0;');
BookBorrow::truncate();
Book::truncate();
StudentsGPA::truncate();
StudenPayment::truncate();
StudentAttendance::truncate();
StudentExamMark::truncate();
StudentExam::truncate();
Exam::truncate();
StudentSubject::truncate();
StudentCourse::truncate();
TeacherSubject::truncate();
TeacherCourse::truncate();
SubjectCourse::truncate();
Student::truncate();
Teacher::truncate();
Course::truncate();
Subject::truncate();
Department::truncate();
Faculty::truncate();
DB::statement('SET FOREIGN_KEY_CHECKS=1;');
echo "Cleared existing data.\n\n";

// Create Faculties
echo "Creating Faculties...\n";
$faculties = [];
$facultyData = [
    ['FAC001', 'Faculty of Applied Science', 'Faculty focused on applied sciences and research'],
    ['FAC002', 'Faculty of Arts and Culture', 'Faculty dedicated to arts, humanities and cultural studies'],
    ['FAC003', 'Faculty of Business and Management', 'Faculty for business administration and management studies'],
];
foreach ($facultyData as $data) {
    $faculties[] = Faculty::create([
        'faculties_Index' => $data[0],
        'faculties_name' => $data[1],
        'description' => $data[2],
    ]);
}
echo "Created " . count($faculties) . " faculties.\n";

// Create Departments
echo "Creating Departments...\n";
$departments = [];
$departmentData = [
    [$faculties[0]->faculties_id, 'DEP001', 'Department of Computer Science', 'Computer Science and IT'],
    [$faculties[0]->faculties_id, 'DEP002', 'Department of Physics', 'Physics and Applied Physics'],
    [$faculties[0]->faculties_id, 'DEP003', 'Department of Mathematics', 'Mathematics and Statistics'],
    [$faculties[1]->faculties_id, 'DEP004', 'Department of Languages', 'Languages and Linguistics'],
    [$faculties[1]->faculties_id, 'DEP005', 'Department of History', 'History and Archaeology'],
    [$faculties[2]->faculties_id, 'DEP006', 'Department of Management', 'Business Management'],
    [$faculties[2]->faculties_id, 'DEP007', 'Department of Finance', 'Finance and Banking'],
];
foreach ($departmentData as $data) {
    $departments[] = Department::create([
        'faculties_id' => $data[0],
        'department_Index' => $data[1],
        'department_name' => $data[2],
        'description' => $data[3],
    ]);
}
echo "Created " . count($departments) . " departments.\n";

// Create Courses
echo "Creating Courses...\n";
$courses = [];
$courseData = [
    [$departments[0]->department_id, $faculties[0]->faculties_id, 'CSE001', 'BSc in Computer Science', 'Undergraduate degree in Computer Science'],
    [$departments[0]->department_id, $faculties[0]->faculties_id, 'CSE002', 'BSc in Information Technology', 'Undergraduate degree in IT'],
    [$departments[1]->department_id, $faculties[0]->faculties_id, 'PHY001', 'BSc in Physics', 'Undergraduate degree in Physics'],
    [$departments[2]->department_id, $faculties[0]->faculties_id, 'MAT001', 'BSc in Mathematics', 'Undergraduate degree in Mathematics'],
    [$departments[3]->department_id, $faculties[1]->faculties_id, 'LAN001', 'BA in English', 'Undergraduate degree in English'],
    [$departments[4]->department_id, $faculties[1]->faculties_id, 'HIS001', 'BA in History', 'Undergraduate degree in History'],
    [$departments[5]->department_id, $faculties[2]->faculties_id, 'BUS001', 'BBA in Management', 'Bachelor of Business Administration'],
    [$departments[6]->department_id, $faculties[2]->faculties_id, 'FIN001', 'BBA in Finance', 'Bachelor of Business Administration in Finance'],
];
foreach ($courseData as $data) {
    $courses[] = Course::create([
        'department_id' => $data[0],
        'faculties_id' => $data[1],
        'course_Index' => $data[2],
        'course_name' => $data[3],
        'description' => $data[4],
    ]);
}
echo "Created " . count($courses) . " courses.\n";

// Create Subjects
echo "Creating Subjects...\n";
$subjects = [];
$subjectData = [
    ['SUB001', 'Programming Fundamentals', 3, 'Introduction to programming concepts'],
    ['SUB002', 'Data Structures and Algorithms', 3, 'Study of data structures and algorithms'],
    ['SUB003', 'Database Systems', 3, 'Database design and implementation'],
    ['SUB004', 'Web Development', 3, 'Web technologies and frameworks'],
    ['SUB005', 'Software Engineering', 3, 'Software development methodologies'],
    ['SUB006', 'Physics I', 4, 'Introduction to Physics'],
    ['SUB007', 'Calculus I', 3, 'Differential and Integral Calculus'],
    ['SUB008', 'English Literature', 3, 'Study of English Literature'],
    ['SUB009', 'World History', 3, 'History of world civilizations'],
    ['SUB010', 'Principles of Management', 3, 'Fundamentals of management'],
    ['SUB011', 'Financial Accounting', 3, 'Introduction to accounting principles'],
    ['SUB012', 'Computer Networks', 3, 'Network protocols and architecture'],
    ['SUB013', 'Operating Systems', 3, 'OS concepts and design'],
    ['SUB014', 'Linear Algebra', 3, 'Matrix theory and linear algebra'],
    ['SUB015', 'Microeconomics', 3, 'Introduction to microeconomics'],
];
foreach ($subjectData as $data) {
    $subjects[] = Subject::create([
        'subject_Index' => $data[0],
        'subject_name' => $data[1],
        'credite' => $data[2],
        'description' => $data[3],
    ]);
}
echo "Created " . count($subjects) . " subjects.\n";

// Create Teachers
echo "Creating Teachers...\n";
$teachers = [];
$teacherData = [
    ['TCH001', 'Ahmed', 'Hassan', '1975-05-15', 'ahmed.hassan@seu.ac.lk', '752345678v', 'Male', $faculties[0]->faculties_id, $departments[0]->department_id, 'Senior lecturer in Computer Science'],
    ['TCH002', 'Fatima', 'Zahra', '1980-08-22', 'fatima.zahra@seu.ac.lk', '802345678v', 'Female', $faculties[0]->faculties_id, $departments[1]->department_id, 'Professor of Physics'],
    ['TCH003', 'Mohamed', 'Rashid', '1978-12-10', 'mohamed.rashid@seu.ac.lk', '782345678v', 'Male', $faculties[0]->faculties_id, $departments[2]->department_id, 'Senior lecturer in Mathematics'],
    ['TCH004', 'Aisha', 'Khan', '1985-03-18', 'aisha.khan@seu.ac.lk', '852345678v', 'Female', $faculties[1]->faculties_id, $departments[3]->department_id, 'Lecturer in English'],
    ['TCH005', 'Ibrahim', 'Malik', '1972-07-25', 'ibrahim.malik@seu.ac.lk', '722345678v', 'Male', $faculties[1]->faculties_id, $departments[4]->department_id, 'Professor of History'],
    ['TCH006', 'Zainab', 'Ali', '1982-11-30', 'zainab.ali@seu.ac.lk', '822345678v', 'Female', $faculties[2]->faculties_id, $departments[5]->department_id, 'Senior lecturer in Management'],
    ['TCH007', 'Omar', 'Farooq', '1979-09-05', 'omar.farooq@seu.ac.lk', '792345678v', 'Male', $faculties[2]->faculties_id, $departments[6]->department_id, 'Professor of Finance'],
    ['TCH008', 'Khadija', 'Siddiq', '1988-01-12', 'khadija.siddiq@seu.ac.lk', '882345678v', 'Female', $faculties[0]->faculties_id, $departments[0]->department_id, 'Lecturer in Software Engineering'],
];
foreach ($teacherData as $data) {
    $teachers[] = Teacher::create([
        'teacher_Index' => $data[0],
        'teacher_fname' => $data[1],
        'teacher_lname' => $data[2],
        'teacher_birthday' => $data[3],
        'teacher_email' => $data[4],
        'teacher_nic' => $data[5],
        'teacher_gender' => $data[6],
        'faculties_id' => $data[7],
        'department_id' => $data[8],
        'description' => $data[9],
    ]);
}
echo "Created " . count($teachers) . " teachers.\n";

// Create Students
echo "Creating Students...\n";
$students = [];
$studentData = [
    ['STU001', 'Ali', 'Hassan', '2000-01-15', 'ali.hassan@student.seu.ac.lk', '002345678v', 'Male', $faculties[0]->faculties_id, $departments[0]->department_id],
    ['STU002', 'Bilal', 'Ahmed', '2001-03-22', 'bilal.ahmed@student.seu.ac.lk', '012345678v', 'Male', $faculties[0]->faculties_id, $departments[0]->department_id],
    ['STU003', 'Catherine', 'Fernando', '2000-07-10', 'catherine.f@student.seu.ac.lk', '022345678v', 'Female', $faculties[0]->faculties_id, $departments[0]->department_id],
    ['STU004', 'David', 'Silva', '2001-11-05', 'david.silva@student.seu.ac.lk', '032345678v', 'Male', $faculties[0]->faculties_id, $departments[1]->department_id],
    ['STU005', 'Emily', 'Perera', '2000-09-18', 'emily.perera@student.seu.ac.lk', '042345678v', 'Female', $faculties[0]->faculties_id, $departments[1]->department_id],
    ['STU006', 'Farhan', 'Khan', '2001-05-25', 'farhan.khan@student.seu.ac.lk', '052345678v', 'Male', $faculties[0]->faculties_id, $departments[2]->department_id],
    ['STU007', 'Gayani', 'Silva', '2000-12-30', 'gayani.silva@student.seu.ac.lk', '062345678v', 'Female', $faculties[0]->faculties_id, $departments[2]->department_id],
    ['STU008', 'Hassan', 'Mohamed', '2001-08-14', 'hassan.m@student.seu.ac.lk', '072345678v', 'Male', $faculties[1]->faculties_id, $departments[3]->department_id],
    ['STU009', 'Isra', 'Ahmad', '2000-04-20', 'isra.ahmad@student.seu.ac.lk', '082345678v', 'Female', $faculties[1]->faculties_id, $departments[3]->department_id],
    ['STU010', 'Jamil', 'Farooq', '2001-10-08', 'jamil.farooq@student.seu.ac.lk', '092345678v', 'Male', $faculties[1]->faculties_id, $departments[4]->department_id],
    ['STU011', 'Kavindi', 'Perera', '2000-06-15', 'kavindi.perera@student.seu.ac.lk', '102345678v', 'Female', $faculties[1]->faculties_id, $departments[4]->department_id],
    ['STU012', 'Lakshan', 'Fernando', '2001-02-28', 'lakshan.f@student.seu.ac.lk', '112345678v', 'Male', $faculties[2]->faculties_id, $departments[5]->department_id],
    ['STU013', 'Mariyam', 'Zahra', '2000-08-12', 'mariyam.zahra@student.seu.ac.lk', '122345678v', 'Female', $faculties[2]->faculties_id, $departments[5]->department_id],
    ['STU014', 'Naveed', 'Ahmed', '2001-04-05', 'naveed.ahmed@student.seu.ac.lk', '132345678v', 'Male', $faculties[2]->faculties_id, $departments[6]->department_id],
    ['STU015', 'Omaya', 'Khan', '2000-11-20', 'omaya.khan@student.seu.ac.lk', '142345678v', 'Female', $faculties[2]->faculties_id, $departments[6]->department_id],
    ['STU016', 'Pradeep', 'Silva', '2001-07-08', 'pradeep.silva@student.seu.ac.lk', '152345678v', 'Male', $faculties[0]->faculties_id, $departments[0]->department_id],
    ['STU017', 'Qasim', 'Mohamed', '2000-03-25', 'qasim.m@student.seu.ac.lk', '162345678v', 'Male', $faculties[0]->faculties_id, $departments[1]->department_id],
    ['STU018', 'Rashida', 'Ibrahim', '2001-09-15', 'rashida.ibrahim@student.seu.ac.lk', '172345678v', 'Female', $faculties[1]->faculties_id, $departments[3]->department_id],
    ['STU019', 'Saman', 'Perera', '2000-05-30', 'saman.perera@student.seu.ac.lk', '182345678v', 'Male', $faculties[2]->faculties_id, $departments[5]->department_id],
    ['STU020', 'Thilini', 'Fernando', '2001-01-10', 'thilini.f@student.seu.ac.lk', '192345678v', 'Female', $faculties[2]->faculties_id, $departments[6]->department_id],
];
foreach ($studentData as $data) {
    $students[] = Student::create([
        'student_Index' => $data[0],
        'student_fname' => $data[1],
        'student_lname' => $data[2],
        'student_birthday' => $data[3],
        'student_email' => $data[4],
        'student_nic' => $data[5],
        'student_gender' => $data[6],
        'faculties_id' => $data[7],
        'department_id' => $data[8],
    ]);
}
echo "Created " . count($students) . " students.\n";

// Assign Courses to Students
echo "Assigning courses to students...\n";
$assignments = 0;
foreach ($students as $student) {
    $deptCourses = array_filter($courses, function($c) use ($student) {
        return $c->department_id == $student->department_id;
    });
    foreach ($deptCourses as $course) {
        StudentCourse::create([
            'student_id' => $student->student_id,
            'course_id' => $course->course_id,
        ]);
        $assignments++;
    }
}
echo "Assigned $assignments course-student relationships.\n";

// Assign Subjects to Courses
echo "Assigning subjects to courses...\n";
$assignments = 0;
$subjectCourseMap = [
    $courses[0]->course_id => [0, 1, 2, 3, 4, 11, 12, 13],
    $courses[1]->course_id => [0, 2, 3, 4, 11, 12, 13],
    $courses[2]->course_id => [5, 6, 13],
    $courses[3]->course_id => [6, 13, 14],
    $courses[4]->course_id => [7, 8],
    $courses[5]->course_id => [8, 9],
    $courses[6]->course_id => [10, 14, 15],
    $courses[7]->course_id => [10, 11, 15],
];
foreach ($subjectCourseMap as $courseId => $subjectIndexes) {
    foreach ($subjectIndexes as $idx) {
        if (isset($subjects[$idx])) {
            SubjectCourse::create([
                'course_id' => $courseId,
                'subject_id' => $subjects[$idx]->subject_id,
            ]);
            $assignments++;
        }
    }
}
echo "Assigned $assignments subject-course relationships.\n";

// Assign Subjects to Students
echo "Assigning subjects to students...\n";
$assignments = 0;
foreach ($students as $student) {
    $studentCourses = StudentCourse::where('student_id', $student->student_id)->get();
    foreach ($studentCourses as $sc) {
        $courseSubjects = SubjectCourse::where('course_id', $sc->course_id)->get();
        foreach ($courseSubjects as $cs) {
            $exists = StudentSubject::where('student_id', $student->student_id)
                ->where('subject_id', $cs->subject_id)
                ->exists();
            if (!$exists) {
                StudentSubject::create([
                    'student_id' => $student->student_id,
                    'subject_id' => $cs->subject_id,
                ]);
                $assignments++;
            }
        }
    }
}
echo "Assigned $assignments subject-student relationships.\n";

// Assign Courses to Teachers
echo "Assigning courses to teachers...\n";
$assignments = 0;
$teacherCourseMap = [
    $teachers[0]->teacher_id => [$courses[0]->course_id, $courses[1]->course_id],
    $teachers[1]->teacher_id => [$courses[2]->course_id],
    $teachers[2]->teacher_id => [$courses[3]->course_id],
    $teachers[3]->teacher_id => [$courses[4]->course_id],
    $teachers[4]->teacher_id => [$courses[5]->course_id],
    $teachers[5]->teacher_id => [$courses[6]->course_id],
    $teachers[6]->teacher_id => [$courses[7]->course_id],
    $teachers[7]->teacher_id => [$courses[0]->course_id, $courses[1]->course_id],
];
foreach ($teacherCourseMap as $teacherId => $courseIds) {
    foreach ($courseIds as $courseId) {
        TeacherCourse::create([
            'teacher_id' => $teacherId,
            'course_id' => $courseId,
        ]);
        $assignments++;
    }
}
echo "Assigned $assignments course-teacher relationships.\n";

// Assign Subjects to Teachers
echo "Assigning subjects to teachers...\n";
$assignments = 0;
$teacherSubjectMap = [
    $teachers[0]->teacher_id => [$subjects[0]->subject_id, $subjects[1]->subject_id, $subjects[3]->subject_id],
    $teachers[1]->teacher_id => [$subjects[5]->subject_id],
    $teachers[2]->teacher_id => [$subjects[6]->subject_id, $subjects[13]->subject_id],
    $teachers[3]->teacher_id => [$subjects[7]->subject_id, $subjects[8]->subject_id],
    $teachers[4]->teacher_id => [$subjects[8]->subject_id, $subjects[9]->subject_id],
    $teachers[5]->teacher_id => [$subjects[10]->subject_id, $subjects[14]->subject_id],
    $teachers[6]->teacher_id => [$subjects[11]->subject_id, $subjects[15]->subject_id],
    $teachers[7]->teacher_id => [$subjects[2]->subject_id, $subjects[4]->subject_id, $subjects[12]->subject_id],
];
foreach ($teacherSubjectMap as $teacherId => $subjectIds) {
    foreach ($subjectIds as $subjectId) {
        TeacherSubject::create([
            'teacher_id' => $teacherId,
            'subject_id' => $subjectId,
        ]);
        $assignments++;
    }
}
echo "Assigned $assignments subject-teacher relationships.\n";

// Create Exams
echo "Creating Exams...\n";
$exams = [];
$examData = [
    ['EXM001', 'Midterm Examination 2025', '2025-06-01', '2025-06-15', $faculties[0]->faculties_id, $departments[0]->department_id],
    ['EXM002', 'Final Examination 2025', '2025-09-01', '2025-09-30', $faculties[0]->faculties_id, $departments[0]->department_id],
    ['EXM003', 'Midterm Examination 2025', '2025-06-01', '2025-06-15', $faculties[1]->faculties_id, $departments[3]->department_id],
    ['EXM004', 'Final Examination 2025', '2025-09-01', '2025-09-30', $faculties[2]->faculties_id, $departments[5]->department_id],
    ['EXM005', 'Special Examination 2025', '2025-11-01', '2025-11-15', $faculties[0]->faculties_id, $departments[1]->department_id],
];
foreach ($examData as $data) {
    $exams[] = Exam::create([
        'exam_Index' => $data[0],
        'exam_name' => $data[1],
        'exam_start_date' => $data[2],
        'exam_end_date' => $data[3],
        'faculties_id' => $data[4],
        'department_id' => $data[5],
    ]);
}
echo "Created " . count($exams) . " exams.\n";

// Create Student Exams
echo "Creating Student Exams...\n";
$studentExams = [];
$assignments = 0;
foreach ($exams as $exam) {
    $deptStudents = array_filter($students, function($s) use ($exam) {
        return $s->department_id == $exam->department_id;
    });
    foreach ($deptStudents as $student) {
        $se = StudentExam::create([
            'exam_id' => $exam->exam_id,
            'student_id' => $student->student_id,
        ]);
        $studentExams[] = $se;
        $assignments++;
    }
}
echo "Created $assignments student exam records.\n";

// Create Student Exam Marks
echo "Creating Student Exam Marks...\n";
$marksCreated = 0;
foreach ($students as $student) {
    $studentSubjects = StudentSubject::where('student_id', $student->student_id)->get();
    foreach ($studentSubjects as $ss) {
        $hasExam = StudentExam::where('student_id', $student->student_id)->exists();
        if ($hasExam && !StudentExamMark::where('student_id', $student->student_id)
            ->where('subject_id', $ss->subject_id)
            ->exists()) {
            $mark = rand(40, 95);
            $grade = $mark >= 75 ? 'A' : ($mark >= 65 ? 'B' : ($mark >= 55 ? 'C' : ($mark >= 45 ? 'D' : 'F')));
            StudentExamMark::create([
                'student_id' => $student->student_id,
                'subject_id' => $ss->subject_id,
                'mark' => $mark,
                'garde' => $grade,
            ]);
            $marksCreated++;
        }
    }
}
echo "Created $marksCreated exam mark records.\n";

// Create Student Attendance
echo "Creating Student Attendance records...\n";
$attendanceCreated = 0;
$startDate = new DateTime('2025-01-01');
for ($i = 0; $i < 60; $i++) {
    $date = clone $startDate;
    $date->add(new DateInterval('P' . $i . 'D'));
    $dayOfWeek = $date->format('N');
    if ($dayOfWeek > 5) continue;

    foreach ($students as $student) {
        $studentSubjects = StudentSubject::where('student_id', $student->student_id)->get();
        foreach ($studentSubjects as $ss) {
            $attended = rand(1, 100) <= 85;
            StudentAttendance::create([
                'student_id' => $student->student_id,
                'subject_id' => $ss->subject_id,
                'attendance' => $attended,
                'date' => $date->format('Y-m-d H:i:s'),
            ]);
            $attendanceCreated++;
        }
    }
}
echo "Created $attendanceCreated attendance records.\n";

// Create Student Payments
echo "Creating Student Payments...\n";
$paymentsCreated = 0;
$paymentReasons = ['Tuition Fee', 'Library Fee', 'Laboratory Fee', 'Sports Fee', 'Examination Fee'];
foreach ($students as $student) {
    $numPayments = rand(2, 4);
    for ($i = 0; $i < $numPayments; $i++) {
        StudenPayment::create([
            'student_id' => $student->student_id,
            'payment_Index' => 'PAY' . str_pad($paymentsCreated + 1, 4, '0', STR_PAD_LEFT),
            'payment_reson' => $paymentReasons[array_rand($paymentReasons)],
            'description' => 'Payment for academic year 2025',
        ]);
        $paymentsCreated++;
    }
}
echo "Created $paymentsCreated payment records.\n";

// Create Student GPAs
echo "Creating Student GPAs...\n";
$gpasCreated = 0;
foreach ($students as $student) {
    $marks = StudentExamMark::where('student_id', $student->student_id)->get();
    if ($marks->count() > 0) {
        $totalPoints = 0;
        $gradePoints = ['A' => 4.0, 'B' => 3.0, 'C' => 2.0, 'D' => 1.0, 'F' => 0.0];
        foreach ($marks as $mark) {
            $totalPoints += $gradePoints[$mark->garde] ?? 0;
        }
        $gpa = round($totalPoints / $marks->count(), 2);

        StudentsGPA::create([
            'student_id' => $student->student_id,
            'gpa' => $gpa,
        ]);
        $gpasCreated++;
    }
}
echo "Created $gpasCreated GPA records.\n";

// Create Books
echo "Creating Books...\n";
$books = [];
$bookData = [
    ['Introduction to Algorithms', 'Thomas H. Cormen', '9780262033848', 'MIT Press', 2022, 'Computer Science', 'Main Library - Floor 2', 'Comprehensive introduction to algorithms'],
    ['Database System Concepts', 'Abraham Silberschatz', '9780073523323', 'McGraw-Hill', 2021, 'Computer Science', 'Main Library - Floor 2', 'Database design and implementation'],
    ['Clean Code', 'Robert C. Martin', '9780132350884', 'Prentice Hall', 2020, 'Programming', 'Main Library - Floor 2', 'A handbook of agile software craftsmanship'],
    ['Physics for Scientists and Engineers', 'Serway & Jewett', '9781337553278', 'Cengage', 2023, 'Physics', 'Main Library - Floor 3', 'Comprehensive physics textbook'],
    ['Calculus: Early Transcendentals', 'James Stewart', '9781285741550', 'Cengage', 2022, 'Mathematics', 'Main Library - Floor 3', 'Calculus textbook'],
    ['Principles of Management', 'Richard Daft', '9780357033829', 'Cengage', 2021, 'Business', 'Main Library - Floor 1', 'Management principles and practices'],
    ['Financial Accounting', 'Jerry Weygandt', '9781119503703', 'Wiley', 2023, 'Finance', 'Main Library - Floor 1', 'Introduction to financial accounting'],
    ['English Literature: A Guide', 'John Smith', '9781234567890', 'Oxford Press', 2021, 'Literature', 'Main Library - Floor 1', 'Guide to English literature'],
    ['World History: Ancient to Modern', 'Jane Doe', '9780987654321', 'Cambridge', 2022, 'History', 'Main Library - Floor 1', 'Comprehensive world history'],
    ['Operating System Concepts', 'Abraham Silberschatz', '9781118063339', 'Wiley', 2020, 'Computer Science', 'Main Library - Floor 2', 'OS concepts and design'],
    ['Microeconomics', 'N. Gregory Mankiw', '9781319104786', 'Worth', 2023, 'Economics', 'Main Library - Floor 1', 'Principles of microeconomics'],
    ['Linear Algebra and Its Applications', 'Gilbert Strang', '9780030105678', 'Brooks Cole', 2021, 'Mathematics', 'Main Library - Floor 3', 'Linear algebra textbook'],
];
foreach ($bookData as $data) {
    $books[] = Book::create([
        'title' => $data[0],
        'author' => $data[1],
        'isbn' => $data[2],
        'publisher' => $data[3],
        'publication_year' => $data[4],
        'category' => $data[5],
        'shelf_location' => $data[6],
        'description' => $data[7],
        'total_copies' => rand(3, 10),
        'available_copies' => rand(1, 5),
    ]);
}
echo "Created " . count($books) . " books.\n";

// Create Time Tables
echo "Creating Time Tables...\n";
$timetables = [];
$timetableData = [
    ['TT001', '2025', '2024/2025', 'Semester 1', $faculties[0]->faculties_id, $departments[0]->department_id, 'Programming,Data Structures,Database', 'Physics,Math,English', 'Web Dev,Software Eng,Lab', 'Computer Networks,OS,Lab', 'Library,Sports,Free'],
    ['TT002', '2025', '2024/2025', 'Semester 1', $faculties[1]->faculties_id, $departments[3]->department_id, 'English,Literature,Language', 'History,Culture,Free', 'Research,Library,Sports', 'Literature,Free,Lab', 'Library,Sports,Free'],
    ['TT003', '2025', '2024/2025', 'Semester 1', $faculties[2]->faculties_id, $departments[5]->department_id, 'Management,Accounting,Economics', 'Finance,Marketing,Free', 'HRM,Library,Sports', 'Strategy,Research,Lab', 'Library,Sports,Free'],
];
foreach ($timetableData as $data) {
    $timetables[] = TimeTable::create([
        'timetable_Index' => $data[0],
        'year' => $data[1],
        'accedamic_year' => $data[2],
        'semester' => $data[3],
        'faculties_id' => $data[4],
        'department_id' => $data[5],
        'monday' => $data[6],
        'tuday' => $data[7],
        'wenday' => $data[8],
        'theday' => $data[9],
        'friday' => $data[10],
    ]);
}
echo "Created " . count($timetables) . " time tables.\n";

echo "\n==========================================\n";
echo "Dummy data seeding completed successfully!\n";
echo "==========================================\n\n";

echo "Summary:\n";
echo "- Faculties: " . Faculty::count() . "\n";
echo "- Departments: " . Department::count() . "\n";
echo "- Courses: " . Course::count() . "\n";
echo "- Subjects: " . Subject::count() . "\n";
echo "- Teachers: " . Teacher::count() . "\n";
echo "- Students: " . Student::count() . "\n";
echo "- Exams: " . Exam::count() . "\n";
echo "- Student Exams: " . StudentExam::count() . "\n";
echo "- Exam Marks: " . StudentExamMark::count() . "\n";
echo "- Student Courses: " . StudentCourse::count() . "\n";
echo "- Student Subjects: " . StudentSubject::count() . "\n";
echo "- Teacher Courses: " . TeacherCourse::count() . "\n";
echo "- Teacher Subjects: " . TeacherSubject::count() . "\n";
echo "- Subject Courses: " . SubjectCourse::count() . "\n";
echo "- Attendance Records: " . StudentAttendance::count() . "\n";
echo "- Payments: " . StudenPayment::count() . "\n";
echo "- Student GPAs: " . StudentsGPA::count() . "\n";
echo "- Books: " . Book::count() . "\n";
echo "- Time Tables: " . TimeTable::count() . "\n";
echo "\n";
