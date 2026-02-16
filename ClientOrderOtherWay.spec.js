const {test, expect} = require('@playwright/test');

test("Client login page with getby locator", async({page}) =>
{
    const productname = "ZARA COAT 3";
    const product = page.locator(".card-body")
    const email = 'pooja1@example.com';
    await page.goto("https://rahulshettyacademy.com/client");
    await page.getByPlaceholder("email@example.com").fill(email)
    await page.getByPlaceholder("enter your passsword").fill('Pooja@12');
    await page.getByRole("button",{name: "Login"}).click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    
    await page.locator(".card-body").filter({hasText: "ZARA COAT 3"}).getByRole("button",{name: " Add To Cart"}).click();
    
    await page.getByRole("listitem").getByRole("button",{name:"Cart"}).click();
    await page.locator("div li").first().waitFor();

    await expect(page.getByText("ZARA COAT 3")).toBeVisible();
    await page.getByRole("button",{name: "Checkout"}).click();

   // await page.getByTitle("Credit Card Number").fill("1234");

    await page.getByPlaceholder("Select Country").pressSequentially("ind",{delay:150});//pressSequentially will enter text one by one character and delay is use to allow time to enter some time
    await page.getByRole("button",{name: "India"}).nth(1).click();
    await page.getByText("PLACE ORDER").click();
    await expect(page.getByText("Thankyou for the order.")).toBeVisible();


    // const data = page.locator(".input[type ='text']");
    // await data.first().fill("1234");
    // await data.nth(1).fill("111");
    // await data.nth(2).fill("pooja");
    // await page.locator("[name= 'coupon']").pressSequentially("rahulshettyacademy");
    // await page.locator("[type = 'submit']").click();
    // await expect (page.locator(".mt-1.ng-star-inserted")).toHaveText("* Coupon Applied");
    // await expect(page.locator(".user__name [type=text]").first()).toHaveText(email);
    // await page.locator(".action__submit").click();
    // await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    // const orderid = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    // console.log(orderid);
    
    await page.getByRole("button",{name: "ORDERS"}).click();
    await page.locator("tbody").waitFor();
    await page.getByRole("rowheader",{name: "Order Id"}).getByText("6983264cc941646b7ad38c6a").getByRole("button",{name: "View"}).click();

    
    // const orderDetails = await page.locator(".col-text").textContent();
    // expect(orderid.includes(orderDetails)).toBeTruthy();
});