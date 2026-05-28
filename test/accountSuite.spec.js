import { test, expect } from "@playwright/test";
import { LoginPage } from "../Page/loginPage";
import { ChangePassword } from "../Page/changePasswordtest";
import { generateNewPassword, staticCredentials } from "../Utils/testData";

// test.describe creates a logical grouping (groupism) for related test scenarios
test.describe("OrangeHRM - User Account Management Suite", () => {
    let loginPage;
    let changePassword;

    // This runs before EVERY test inside this group
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        changePassword = new ChangePassword(page);

        // All tests in this suite start by navigating to the base login page
        await loginPage.goTo();
    });

    // Test Case 1: Simple Verification of Core Login Functionality
    test("User should be able to login successfully with valid credentials", async ({ page }) => {
        await loginPage.login(staticCredentials.defaultAdmin, staticCredentials.currentPassword);
        
        // Assert that login was successful by checking the URL settles on the dashboard
        await page.waitForURL('**/dashboard/index');
        await expect(page).toHaveURL(/.*dashboard/);
    });

    // Test Case 2: Verification of the Password Update Functionality
    test("User should be able to navigate to profile and update password successfully", async ({ page }) => {
        // Log in first to access account features
        await loginPage.login(staticCredentials.defaultAdmin, staticCredentials.currentPassword);

        // Generate a dynamic new password
        const newPassword = generateNewPassword();

        // Navigate to the Change Password screen via the dropdown panel
        await changePassword.changepasswordNavigation();

        // Perform password update actions
        await changePassword.updatePassword(staticCredentials.currentPassword, newPassword);
        
        // Assert success toast/banner notification appears
        await expect(page.getByText('Successfully Saved')).toBeVisible();
    });
});