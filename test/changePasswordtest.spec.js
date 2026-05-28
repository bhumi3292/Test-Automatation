import { test, expect } from "@playwright/test";
import { ChangePassword } from "../Page/changePasswordtest";
import { LoginPage } from "../Page/loginPAge";
import { generateNewPassword, staticCredentials } from "../Utils/testData";


test.describe("Account Security Tests", () => {
    let loginPage;
    let changePassword;

    // This hook runs automatically before our test executes
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        changePassword = new ChangePassword(page);

        // 1. Navigate to the login page
        await loginPage.goTo();
        
        // 2. Perform login (redirects automatically to the dashboard)
        await loginPage.login(staticCredentials.defaultAdmin, staticCredentials.currentPassword);
    });

    test("User should be able to update password successfully", async ({ page }) => {
        const newPassword = generateNewPassword();

        // 3. Navigate through the UI panel to the password page
        await changePassword.changepasswordNavigation();

        // 4. Fill details and save
        await changePassword.updatePassword(staticCredentials.currentPassword, newPassword);
        
        // 5. Verification
        await expect(page.getByText('Successfully Saved')).toBeVisible();
    });
});