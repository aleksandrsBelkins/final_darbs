<?php
header('Content-type: application/json');


use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../private/phpmailer/Exception.php';
require '../private/phpmailer/PHPMailer.php';
require '../private/phpmailer/SMTP.php';

$name = $_POST['name'];
$email = $_POST['email'];
$text = $_POST['text'];

$title = "MyPortfolio";
$body = "
    <h2>New Message</h2>
    <b>Name:</b>$name<br>
    <b>Email:</b>$email<br><br>
    <b>Message:</b><br>$text
    ";

$mail = new PHPMailer(true);

$mail->isSMTP();   
$mail->CharSet = "UTF-8";
$mail->SMTPAuth   = true;
//$mail->SMTPDebug = 2;
//$mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};


$mail->Host       = 'mail.inbox.lv'; 
$mail->Username   = 'myportfoliotest'; 
$mail->Password   = '1WdbfJY!9R'; 
$mail->SMTPSecure = 'ssl';
$mail->Port       = 465;
$mail->setFrom('myportfoliotest@inbox.lv', 'My portfolio'); 

$mail->addAddress('aleksandrs.belkins@gmail.com');  
    


$mail->isHTML(true);
$mail->Subject = $title;
$mail->Body = $body;    


if($mail->send()) {
    $message = 'Message has been sent';
} 
else {
    $message = 'Message could not be sent';
    echo 'Mailer Error: ' . $mail->ErrorInfo;
}

$response = ['message' => $message];
echo json_encode($response, JSON_PRETTY_PRINT);

?>

