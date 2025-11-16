<?php
require_once 'db_connection.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(array('error' => 'Method not allowed'));
    exit;
}

// Get the raw POST data
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(array('error' => 'Invalid input data'));
    exit;
}

try {
    $database = new Database();
    
    // Update personal information
    if (isset($input['personal_info'])) {
        $personal = $input['personal_info'];
        $database->query('
            UPDATE personal_info SET 
            name = :name, 
            birth_place = :birth_place, 
            birth_date = :birth_date,
            address = :address,
            phone = :phone,
            gender = :gender,
            religion = :religion,
            citizenship = :citizenship,
            email = :email,
            status = :status,
            updated_at = NOW()
            WHERE id = 1
        ');
        
        $database->bind(':name', $personal['name']);
        $database->bind(':birth_place', $personal['birth_place']);
        $database->bind(':birth_date', $personal['birth_date']);
        $database->bind(':address', $personal['address']);
        $database->bind(':phone', $personal['phone']);
        $database->bind(':gender', $personal['gender']);
        $database->bind(':religion', $personal['religion']);
        $database->bind(':citizenship', $personal['citizenship']);
        $database->bind(':email', $personal['email']);
        $database->bind(':status', $personal['status']);
        
        $database->execute();
    }
    
    echo json_encode(array('success' => 'Profile updated successfully'));
    
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(array('error' => 'Database error: ' . $e->getMessage()));
}
?>