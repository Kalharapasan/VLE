<?php

/**
 * Setup script to create the database and add admin user
 * Run: php setup_admin.php
 */

$host = '127.0.0.1';
$port = 3306;
$user = 'root';
$pass = '';
$dbname = 'vle';

// Create database connection without selecting DB
$conn = new mysqli($host, $user, $pass, '', $port);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error . "\n");
}

// Create database
$sql = "CREATE DATABASE IF NOT EXISTS `$dbname` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci";
if ($conn->query($sql) === TRUE) {
    echo "Database '$dbname' created or already exists.\n";
} else {
    die("Error creating database: " . $conn->error . "\n");
}

$conn->close();

echo "\nNow run these commands:\n";
echo "1. php artisan migrate\n";
echo "2. php artisan db:seed (if you have seeders)\n\n";

echo "Then create admin via Tinker:\n";
echo "php artisan tinker\n";
echo ">>> \\App\\Models\\Admin::create(['admin_Index' => 'ADM001', 'admin_fname' => 'System', 'admin_lname' => 'Administrator', 'admin_email' => 'admin@mail.com', 'admin_nic' => '123456789V', 'admin_birthday' => '1990-01-01', 'admin_gender' => 'male']);\n";
echo ">>> \\App\\Models\\User::create(['index_number' => 'ADM001', 'role' => 'admin', 'email' => 'admin@mail.com', 'password' => bcrypt('admin')]);\n";
echo ">>> exit\n";
echo "\nOr run: php artisan serve and use the registration page at /register\n";
