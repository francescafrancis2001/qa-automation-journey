import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly postalCode: Locator;
    readonly continueButton: Locator;
    readonly finishButton: Locator;
    readonly confirmationMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstName = page.locator('[data-test="firstName"]');
        this.lastName = page.locator('[data-test="lastName"]');
        this.postalCode = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.finishButton = page.locator('[data-test="finish"]');
        this.confirmationMessage = page.locator('[data-test="checkout-complete-container"]');
    }

    async fillInformation(first: string, last: string, zip: string) {
        await this.firstName.fill('first');
        await this.lastName.fill('last');
        await this.postalCode.fill('zip');
        await this.continueButton.click();
    }

    async finish() {
        await this.finishButton.click();
    }

}