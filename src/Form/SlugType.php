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
            ->setDefault('button_class', null)
            ->setAllowedTypes('button_class', ['null', 'string'])
            ->setDefault('locked_icon', '&#128274;')
            ->setAllowedTypes('locked_icon', ['string'])
            ->setDefault('unlocked_icon', '&#128275;')
            ->setAllowedTypes('unlocked_icon', ['string'])
        ;
    }

    public function buildView(FormView $view, FormInterface $form, array $options): void
    {
        $view->vars['target'] = $options['target'];
        $view->vars['button_class'] = $options['button_class'];
        $view->vars['locked_icon'] = $options['locked_icon'];
        $view->vars['unlocked_icon'] = $options['unlocked_icon'];
    }

    public function getParent(): string
    {
        return TextType::class;
    }
}
