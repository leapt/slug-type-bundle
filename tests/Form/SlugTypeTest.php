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
        data-leapt-slug-modal-id-value="leapt-slug-modal-form_slug"
   >
        <input type="text" id="form_slug" name="form[slug]" required="required" />
        <button class="btn btn-outline-secondary" type="button">
            <i class="fas fa-lock fa-fw"></i>
        </button>
    </div>

    <div class="modal fade" tabindex="-1" id="leapt-slug-modal-form_slug">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">slug_type.modal.title</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>slug_type.modal.message</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        <i class="fas fa-ban fa-fw"></i>
                        slug_type.modal.cancel
                    </button>
                    <button type="button" class="btn btn-primary" data-accept="modal">
                        <i class="fas fa-check fa-fw"></i>
                        slug_type.modal.ok
                    </button>
                </div>
            </div>
        </div>
    </div></div></div></form>
',
            str_replace(' >', '>', $rendered),
        );
    }
}
