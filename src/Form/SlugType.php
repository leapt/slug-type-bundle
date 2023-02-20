<?php

declare(strict_types=1);

namespace Leapt\SlugTypeBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\Form\FormView;
use Symfony\Component\OptionsResolver\OptionsResolver;

final class SlugType extends AbstractType
{
    public function getBlockPrefix(): string
    {
        return 'leapt_slug';
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver
            ->setRequired(['target'])
            ->setAllowedTypes('target', ['string'])
        ;
    }

    public function buildView(FormView $view, FormInterface $form, array $options): void
    {
        $view->vars['target'] = $options['target'];
    }

    public function getParent(): string
    {
        return TextType::class;
    }
}
