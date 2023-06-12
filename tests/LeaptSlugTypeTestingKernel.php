<?php

declare(strict_types=1);

namespace Leapt\SlugTypeBundle\Tests;

use Leapt\SlugTypeBundle\LeaptSlugTypeBundle;
use Symfony\Bundle\FrameworkBundle\FrameworkBundle;
use Symfony\Bundle\FrameworkBundle\Kernel\MicroKernelTrait;
use Symfony\Bundle\TwigBundle\TwigBundle;
use Symfony\Component\Config\Loader\LoaderInterface;
use Symfony\Component\DependencyInjection\Alias;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\Form\FormFactoryInterface;
use Symfony\Component\HttpKernel\Kernel;
use Symfony\UX\StimulusBundle\StimulusBundle;

final class LeaptSlugTypeTestingKernel extends Kernel
{
    use MicroKernelTrait;

    public function registerBundles(): iterable
    {
        yield new FrameworkBundle();
        yield new TwigBundle();
        yield new StimulusBundle();
        yield new LeaptSlugTypeBundle();
    }

    public function registerContainerConfiguration(LoaderInterface $loader): void
    {
        $loader->load(function (ContainerBuilder $container) {
            $container->loadFromExtension('framework', [
                'secret'         => 'S3CRET',
                'test'           => true,
                'default_locale' => 'en',
                'translator'     => [
                    'default_path' => __DIR__ . '/../translations',
                ],
            ]);

            $container->loadFromExtension('twig', [
                'default_path'     => __DIR__ . '/templates',
                'strict_variables' => true,
            ]);

            $container->setAlias('public_form_factory', new Alias(FormFactoryInterface::class, true));
        });
    }
}
