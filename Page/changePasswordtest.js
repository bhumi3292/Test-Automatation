import { expect } from "@playwright/test";

export class ChangePassword {
    constructor(page) {
        this.page = page;
        this.dropdown = page.locator('.oxd-userdropdown-tab');        
        this.changePasswordLink = page.getByRole('menuitem', { name: 'Change Password' });
        
        //=====change Password Page Locators===========
        this.currentPasswordInput = page.locator('input[type="password"]').nth(0);
        this.newPasswordInput = page.locator('input[type="password"]').nth(1);
        this.confirmPasswordInput = page.locator('input[type="password"]').nth(2);
        this.saveButton = page.getByRole('button', { name: 'Save' });
    }

    //====change password Navigation
    async changepasswordNavigation() {
        // Safe-guard: Wait for the login redirect to settle completely
        await this.page.waitForURL('**/dashboard/index');
        
        // Click user profile dropdown menu
        await this.dropdown.waitFor({ state: 'visible' });
        await this.dropdown.click();

        // Click change password option
        await this.changePasswordLink.waitFor({ state: 'visible' });
        await this.changePasswordLink.click();
    }

    //===updatePassword
    async updatePassword(currentPass, newPass) {
        // Wait for inputs to render safely on screen before typing
        await this.currentPasswordInput.waitFor({ state: 'visible' });
        
        await this.currentPasswordInput.fill(currentPass);
        await this.newPasswordInput.fill(newPass);
        await this.confirmPasswordInput.fill(newPass);
        await this.saveButton.click();
    }
}