<?php

declare(strict_types=1);

namespace Leapt\SlugTypeBundle\Tests\Form;

use Leapt\SlugTypeBundle\Form\SlugType;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormFactoryInterface;
use Twig\Environment;

final class SlugTypeTest extends KernelTestCase
{
    private ContainerInterface $container;
    private FormFactoryInterface $formFactory;
    private Environment $twig;

    protected function setUp(): void
    {
        self::bootKernel();

        $container = self::getContainer()->get('test.service_container');
        \assert($container instanceof ContainerInterface);
        $this->container = $container;

        $formFactory = $this->container->get(FormFactoryInterface::class);
        \assert($formFactory instanceof FormFactoryInterface);
        $this->formFactory = $formFactory;

        $twig = $this->container->get(Environment::class);
        \assert($twig instanceof Environment);
        $this->twig = $twig;
    }

    public function testRenderForm(): void
    {
        $form = $this->formFactory->createBuilder()
            ->add('name', TextType::class)
            ->add('slug', SlugType::class, ['target' => 'name'])
            ->getForm();

        $rendered = $this->twig->render('form.html.twig', ['form' => $form->createView()]);

        self::assertSame(
            '<form name="form" method="post"><div id="form"><div><label for="form_name" class="required">Name</label><input type="text" id="form_name" name="form[name]" required="required" /></div><div><label for="form_slug" class="required">Slug</label><div
        class="input-group"
        data-controller="leapt-slug"
        data-leapt-slug-target-value="form_name"
        data-leapt-slug-alert-message-value="If you change the slug, you can break links on other pages."
   >
        <input type="text" id="form_slug" name="form[slug]" required="required" />
        <button class="btn btn-outline-secondary" type="button" data-leapt-slug-target="button">
            &#128274;
        </button>
    </div></div></div></form>
',
            str_replace(' >', '>', $rendered),
        );
    }
}
