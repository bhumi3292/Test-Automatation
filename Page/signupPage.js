export class RegisterPage {
    constructor(page) {
        this.page = page;
        this.signupLink = page.getByRole('link', { name: 'Signup / Login' });
        
        // Simplified locator structure to ensure it doesn't get lost in a slow DOM tree
        this.usernameInput = page.locator('form[action="/signup"] input[placeholder="Name"]');
        this.userEmailInput = page.locator('form[action="/signup"] input[placeholder="Email Address"]');
        this.loginButton = page.locator('form[action="/signup"] button[type="submit"]');
    }

    async goTo() {
        // 1. Force block multimedia, tracking, and heavy ads to save precious time
        await this.page.route('**/*.{png,jpg,jpeg,gif,webp,svg,mp4,css}', route => route.abort()); 
        await this.page.route('**/google*/**', route => route.abort());
        await this.page.route('**/*analytics*', route => route.abort());
        await this.page.route('**/*adsbygoogle*', route => route.abort());

        // 2. Commit quickly as soon as server responds
        await this.page.goto("https://automationexercise.com/", { waitUntil: 'commit' });
        
        // 3. Make sure the primary button is ready
        await this.signupLink.waitFor({ state: 'visible', timeout: 15000 });
    }

    async login(user, email) {
        await this.signupLink.click();
        
        // Wait specifically for the URL to change to the login page
        await this.page.waitForURL('**/login', { timeout: 15000 });
        
        // Wait for the specific signup form elements to render
        await this.usernameInput.waitFor({ state: 'visible', timeout: 15000 });
        
        await this.usernameInput.fill(user);
        await this.userEmailInput.fill(email);
        await this.loginButton.click();
    }
}