<?php
session_start();

require_once 'config/config.json';

function connect_db() {
    global $db_config;
    $conn = new mysqli($db_config['host'], $db_config['user'], $db_config['password'], $db_config['database']);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    return $conn;
}

$config = json_decode(file_get_contents('config/config.json'), true);
$discord_config = $config['discord'];

if (isset($_GET['code'])) {
    $code = $_GET['code'];
    $clientId = $discord_config['clientId'];
    $clientSecret = $discord_config['clientSecret'];
    $redirectUri = $discord_config['redirectUri'];

    $token_url = "https://discord.com/api/oauth2/token";
    $data = array(
        'client_id' => $clientId,
        'client_secret' => $clientSecret,
        'grant_type' => 'authorization_code',
        'code' => $code,
        'redirect_uri' => $redirectUri
    );

    $options = array(
        'http' => array(
            'header'  => "Content-Type: application/x-www-form-urlencoded\r\n",
            'method'  => 'POST',
            'content' => http_build_query($data)
        )
    );

    $context  = stream_context_create($options);
    $result = file_get_contents($token_url, false, $context);
    $token_info = json_decode($result, true);
    $access_token = $token_info['access_token'];

    $user_url = "https://discord.com/api/users/@me";
    $opts = array(
        'http' => array(
            'header' => "Authorization: Bearer $access_token"
        )
    );

    $context = stream_context_create($opts);
    $user_info = file_get_contents($user_url, false, $context);
    $user = json_decode($user_info, true);

    $discordId = $user['id'];
    $discordName = $user['username'];
    $avatar = $user['avatar'];

    $conn = connect_db();

    $stmt = $conn->prepare("SELECT id FROM users WHERE discord_id = ?");
    $stmt->bind_param("s", $discordId);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->close();
        $stmt = $conn->prepare("UPDATE users SET discord_name = ?, avatar = ? WHERE discord_id = ?");
        $stmt->bind_param("sss", $discordName, $avatar, $discordId);
        $stmt->execute();
    } else {
        $stmt->close();
        $stmt = $conn->prepare("INSERT INTO users (discord_id, discord_name, avatar) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $discordId, $discordName, $avatar);
        $stmt->execute();
    }

    $response = array(
        'discordId' => $discordId,
        'discordName' => $discordName,
        'avatar' => $avatar,
        'minecraftName' => '',
        'balance' => 0
    );

    header('Content-Type: application/json');
    echo json_encode($response);
    exit();
} else {
    echo "No code provided.";
}
?>
