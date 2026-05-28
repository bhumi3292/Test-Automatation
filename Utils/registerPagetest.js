export function generateTestEmail() {
    const timestamp = Date.now().toString().slice(-6);
    return `test${timestamp}@example.com`;
}

export function getRandomUsername() {
    const usernames = ['Admin', 'Manager', 'Supervisor'];
    return usernames[Math.floor(Math.random() * usernames.length)];
}