const {expect}= require("@playwright/test")

class Addtocart {

    constructor(page) {
        this.page = page;
        this.addToCartOne="(//button[contains(text(),'Add to Cart')])[1]"
        this.addToCartTwo="(//button[contains(text(),'Add to Cart')])[2]"
        this.cart="//button[@class='cartBtn']"
        this.enroll="//button[normalize-space()='Enroll Now']"
        this.enrollbtn="//button[@class='action-btn']"
        this.totalPrice="//div[@class='container-child']//h3[1]"

    }

    async CartCourse(){
        await this.page.click(this.addToCartOne)
        await this.page.click(this.addToCartTwo)
        await this.page.click(this.cart)
        //await this.page.click(this.enroll)
        ///await this.page.click(this.enrollbtn)
       // await this.page.click((this.totalPrice))


    }

    async verifyTotalPrice(){
        await expect(this.page.locator(this.totalPrice)).toBeVisible()

    }



    }

module.exports=Addtocart