class LoginPage{
    constructor(page) {
        this.page=page
        this.username="#email1"
        this.password= "//input[@id='password1']"
        this.LoginButton= "//button[text()='Sign in']"
    }

    async loginToApplication(){
        await this.page.fill(this.username, "admin@email.com")
        await this.page.fill(this.password, "admin@123")
        await this.page.click(this.LoginButton)
        //await this.page.pause()
    }
}

module.exports=LoginPage;


