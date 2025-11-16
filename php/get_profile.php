<?php
require_once 'db_connection.php';

header('Content-Type: application/json');

try {
    $database = new Database();
    
    // Get personal information
    $database->query('SELECT * FROM personal_info WHERE id = 1');
    $personal_info = $database->single();
    
    // Get education
    $database->query('SELECT * FROM education ORDER BY start_year DESC');
    $education = $database->resultSet();
    
    // Get skills
    $database->query('SELECT * FROM skills ORDER BY proficiency DESC');
    $skills = $database->resultSet();
    
    // Get experiences
    $database->query('SELECT * FROM experiences ORDER BY start_date DESC');
    $experiences = $database->resultSet();
    
    // Combine all data
    $profile_data = array(
        'personal_info' => $personal_info,
        'education' => $education,
        'skills' => $skills,
        'experiences' => $experiences
    );
    
    echo json_encode($profile_data);
    
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(array('error' => 'Database error: ' . $e->getMessage()));
}
?>