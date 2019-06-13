<?php
/* QUESTION TYPE */
/* 
    1 - Informacao
    2 - Feedback
    3 - Eventos
*/
if(isset($_POST) && !empty($_POST)){
// if( 1 == 2){
    // var_dump($_POST);
    $email = '';
    $subject = '';
    $name = $_POST['form-name'];
    $receiverEmail = $_POST['form-email'];
    switch ($_POST['form-select']) {
        case '1':
            $email = 'info@bomaoquadrado.pt';
            $subject = 'Pedido de Informaçâo de: '.$name.' ('.$receiverEmail.')';
            break;
        case '2':
            $email = 'feedback@bomaoquadrado.pt';
            $subject = 'Feedback de: '.$name.' ('.$receiverEmail.')';
            break;
        case '3':
            $email = 'events@bomaoquadrado.pt';
            $subject = 'Pedido de Evento de: '.$name.' ('.$receiverEmail.')';
            break;
        default:
            return false;
            break;
    }
    /**
     * This example shows sending a message using PHP's mail() function.
     */
    //Import the PHPMailer class into the global namespace
        require('../functions/PHPMailer.php');
        require('../functions/SMTP.php');
        require('../functions/Exception.php');
        //Create a new PHPMailer instance
        $mail = new PHPMailer\PHPMailer\PHPMailer();
        $mail->IsSMTP(); // enable SMTP
        $mail->CharSet = 'UTF-8';
        // $mail->SMTPDebug = 2; // debugging: 1 = errors and messages, 2 = messages only
        $mail->SMTPAuth = true; // authentication enabled
        $mail->SMTPSecure = 'ssl'; // secure transfer enabled REQUIRED for Gmail
        $mail->Host = 'hosting17.serverhs.org';
        $mail->Port = 465; // or 587
        $mail->IsHTML(true);
        $mail->Username = 'info@bomaoquadrado.pt';
        $mail->Password = 'i0&qtpK_EOS2';
        $mail->AddReplyTo($receiverEmail, $name);
        $mail->SetFrom($email);
        $mail->Subject = $subject;
        $mail->Body = $_POST['form-message'];
        $mail->AddAddress($email);

        if(!$mail->Send()) {
            return false;
    }
}
?>