<?php
$dir = 'img/slrin/';
$allowed_extensions = array('jpg', 'jpeg', 'png', 'gif');

$files = array_diff(scandir($dir), array('..', '.'));
$image_files = array();

foreach ($files as $file) {
    $ext = pathinfo($file, PATHINFO_EXTENSION);
    if (in_array(strtolower($ext), $allowed_extensions)) {
        $image_files[] = $file;
    }
}

echo json_encode($image_files);
?>
