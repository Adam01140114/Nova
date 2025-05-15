<?php
// Check if form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $serviceName = isset($_POST['service-name']) ? htmlspecialchars($_POST['service-name']) : 'Not specified';
    $fullName = isset($_POST['full-name']) ? htmlspecialchars($_POST['full-name']) : 'Not specified';
    $email = isset($_POST['email']) ? htmlspecialchars($_POST['email']) : 'Not specified';
    $requestDetails = isset($_POST['request-details']) ? htmlspecialchars($_POST['request-details']) : 'Not specified';
    
    // Email subject
    $subject = "Nova Studio Service Inquiry: $serviceName";
    
    // Email recipient
    $to = "adamchaabane1234@gmail.com";
    
    // Email headers
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    
    // Email body
    $message = "
    <html>
    <head>
        <title>Nova Studio Service Inquiry</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                border: 1px solid #ddd;
                border-radius: 5px;
            }
            h2 {
                color: #0066cc;
                border-bottom: 1px solid #eee;
                padding-bottom: 10px;
            }
            .info {
                margin-bottom: 20px;
            }
            .label {
                font-weight: bold;
            }
        </style>
    </head>
    <body>
        <div class='container'>
            <h2>New Service Inquiry</h2>
            <div class='info'>
                <p><span class='label'>Service:</span> $serviceName</p>
                <p><span class='label'>Name:</span> $fullName</p>
                <p><span class='label'>Email:</span> $email</p>
                <p><span class='label'>Request Details:</span></p>
                <p>" . nl2br($requestDetails) . "</p>
            </div>
        </div>
    </body>
    </html>
    ";
    
    // Send email
    if (mail($to, $subject, $message, $headers)) {
        echo json_encode(['success' => true, 'message' => 'Thank you for your request. We will get back to you soon.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to send the email. Please try again later.']);
    }
    
    exit;
} else {
    // If not a POST request, redirect to homepage
    header('Location: index.html');
    exit;
}
?> 