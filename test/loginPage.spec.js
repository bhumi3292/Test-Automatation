// loginPagetest.spec.js
import { test, expect } from "@playwright/test";
import { LoginPage } from "../Page/loginPage";

test("should login successfully using POM", async ({ page }) => {
    // 1. Create an Object (Instance) of the LoginPage class
    const loginPage = new LoginPage(page);

    // 2. Call the methods defined in the class
    await loginPage.goTo();
    await loginPage.login('Admin', 'admin123');

    // 3. Assertion (Verification)
    await expect(page).toHaveURL(/dashboard/);
});