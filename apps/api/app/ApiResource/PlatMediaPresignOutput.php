<?php

namespace App\ApiResource;

class PlatMediaPresignOutput
{
    public int    $media_id;
    public string $presigned_url;
    public string $s3_key;
    public int    $expires_in = 900; // 15 minutes
}