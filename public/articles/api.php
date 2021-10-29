<?php
header('Content-type: application/json');

include_once(__DIR__ . '/../private/config.php');
include_once(PRIVATE_DIR . "/classes/DB.php");

$comments_db = new DB('comments');

$unixTime = time();
$timeZone = new \DateTimeZone('Europe/Riga');
$time = new \DateTime();
$time->setTimestamp($unixTime)->setTimezone($timeZone);
$formattedTime = $time->format('Y-m-d H:i:s');

$output = [
    'status' => false
];

if (isset($_GET['comments']) && is_string($_GET['comments'])) {
    if ($_GET['comments'] == "get-all") {
        $output = $comments_db->getAll();
    }
    elseif ($_GET['comments'] === "add") {
        $result = $comments_db->add([
            'name' => $_POST['name'],
            'comment' => $_POST['comment'],
            'created_at' => $formattedTime
        ]);

        if($result['status']) {
            $output['status'] = true;
            $output['data'] = [
                'id' => $result['entity']['id'],
                'name' => $result['entity']['name'],
                'comment' => $result['entity']['comment'],
                'created_at' => $result['entity']['created_at']
            ];
        } 
        else {
            $output['message'] = $result['message'];
        }
    }
}




echo json_encode($output, JSON_PRETTY_PRINT);