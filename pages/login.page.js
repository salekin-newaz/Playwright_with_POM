class LoginPage{
    constructor(page) {
        this.page = page;
        this.username = page.getByRole('textbox', {name: 'Enter Email'});
        this.password = page.locator('#password1');
        this.submitbtn = page.getByRole('button', {name: 'Sign in'});
        this.manage = page.getByText('Manage', { exact: true });

    }
    async loginToApplication(email, password){
        await this.username.fill(email);
        await this.password.fill(password);
        await this.submitbtn.click();
        await this.manage.waitFor({ state: 'visible' });
    }
}

module.exports= LoginPage;
