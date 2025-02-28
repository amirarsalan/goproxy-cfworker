export const Authenticate = (authHeader, auth) => {
    // Basic Auth:
    if (authHeader.startsWith('Basic ')) {
        const encodedCredentials = authHeader.substring(6);
        const decodedCredentials = atob(encodedCredentials); // Decode base64
        const [username, password] = decodedCredentials.split(':');

        // **IMPORTANT:** Replace with your actual authentication logic!
        // This is a placeholder – DO NOT use hardcoded credentials in production.
        return username === auth['user'] && password === auth['pass'];
    }
    return false;
}