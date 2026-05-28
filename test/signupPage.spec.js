import { test, expect } from "@playwright/test";
import { RegisterPage } from "../Page/signupPage";
import { generateTestEmail, getRandomUsername } from "../Utils/registerPagetest";

test("User registration Page", async ({ page }) => {
    // Elevate timeout to 60 seconds to accommodate slow server response times
    test.setTimeout(60000);

    const registerPage = new RegisterPage(page);

    // Navigate to the base URL safely
    await registerPage.goTo();
    
    // Generate dynamic credentials
    const name = getRandomUsername();
    const email = generateTestEmail();
    
    // Execute the signup flow
    await registerPage.login(name, email);
});