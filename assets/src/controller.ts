'use strict';

import { Controller } from '@hotwired/stimulus';
import slugify from 'slugify';
slugify.extend({
    "$": "",
    "%": "",
    "&": "",
    "<": "",
    ">": "",
    "|": "",
    "¢": "",
    "£": "",
    "¤": "",
    "¥": "",
    "₠": "",
    "₢": "",
    "₣": "",
    "₤": "",
    "₥": "",
    "₦": "",
    "₧": "",
    "₨": "",
    "₩": "",
    "₪": "",
    "₫": "",
    "€": "",
    "₭": "",
    "₮": "",
    "₯": "",
    "₰": "",
    "₱": "",
    "₲": "",
    "₳": "",
    "₴": "",
    "₵": "",
    "₸": "",
    "₹": "",
    "₽": "",
    "₿": "",
    "∂": "",
    "∆": "",
    "∑": "",
    "∞": "",
    "♥": "",
    "元": "",
    "円": "",
    "﷼": "",
});

export default class extends Controller<HTMLDivElement> {
    static values = {
        target: String,
        alertMessage: String,
        lockedIcon: String,
        unlockedIcon: String,
    };
    declare readonly targetValue: string;
    declare readonly alertMessageValue: string;
    declare readonly lockedIconValue: string;
    declare readonly unlockedIconValue: string;

    static targets = ['button'];
    declare readonly buttonTarget: HTMLButtonElement;

    locked: boolean = true;
    field: HTMLInputElement;
    target: HTMLInputElement;
    currentSlug: string;

    connect() {
        this.field = this.element.querySelector('input');
        this.field.setAttribute('readonly', 'readonly');
        this.setTargetElement();

        if ('' === this.field.value) {
            this.currentSlug = '';
            this.updateValue();
            this.listenTarget();
        } else {
            this.currentSlug = this.field.value;
        }

        this.appendLockButton();
    }

    updateValue(): void {
        this.field.value = slugify(this.target.value, {
            remove: /[^A-Za-z0-9\s-]/g,
            lower: true,
            strict: true,
        });
    }

    listenTarget(): void {
        this.target.addEventListener('keyup', (): void => {
            if ('readonly' === this.field.getAttribute('readonly')) {
                this.updateValue();
            }
        });
    }

    setTargetElement(): void {
        this.target = document.getElementById(this.targetValue) as HTMLInputElement;
        if (null === this.target) {
            throw `Wrong target specified for slug widget ("${this.field.dataset.target}").`;
        }
    }

    /**
     * Append a "lock" button to control slug behaviour (auto or manual)
     */
    appendLockButton(): void {
        this.buttonTarget.addEventListener('click', (): void => {
            if (this.locked) {
                if (confirm(this.alertMessageValue)) {
                    this.unlock();
                }
            } else {
                this.lock();
            }
        });
    }

    /**
     * Unlock the widget input (manual mode)
     */
    unlock(): void {
        this.locked = false;
        this.buttonTarget.innerHTML = this.unlockedIconValue;
        this.field.removeAttribute('readonly');
    }

    /**
     * Lock the widget input (auto mode)
     */
    lock(): void {
        this.locked = true;
        this.buttonTarget.innerHTML = this.lockedIconValue;

        // Locking it back changes the value either to default value, or recomputes it
        if ('' !== this.currentSlug) {
            this.field.value = this.currentSlug;
        } else {
            this.updateValue();
        }

        this.field.setAttribute('readonly', 'readonly');
    }
}
