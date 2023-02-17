<?php

declare(strict_types=1);

namespace Leapt\SlugTypeBundle;

use Symfony\Component\HttpKernel\Bundle\Bundle;

class LeaptSlugTypeBundle extends Bundle
{
    public function getPath(): string
    {
        return \dirname(__DIR__);
    }
}
