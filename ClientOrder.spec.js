const {test, expect} = require('@playwright/test');

test("Assignment login page", async({page}) =>
{
    const productname = "ZARA COAT 3";
    const product = page.locator(".card-body")
    const email = 'pooja1@example.com';
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator('#userEmail').fill(email)
    await page.locator('#userPassword').fill('Pooja@12');
    await page.locator('#login').click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    const titlelist = await page.locator(".card-body b").allTextContents();
   // console.log(await titlelist.first().textContent());
    console.log(titlelist);
    const count = await product.count();
    for(let i=0; i<count; i++)
    {
        if(await product.nth(i).locator("b").textContent() === productname)
        {
            await product.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();
   // await page.locator("button[type = button]").last().click(); //parent child class iterator through click on checkout
    await page.locator("text= Checkout").click(); //click on checkout with text locator
    await page.locator("[placeholder*=Country]").pressSequentially("ind",{delay:150});//pressSequentially will enter text one by one character and delay is use to allow time to enter some time
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const countitem = await dropdown.locator("button").count();
    for(let i=0; i<countitem ; i++)
    {
       const text = await dropdown.locator("button").nth(i).textContent();  
       if (text === " India")
       {
        await dropdown.locator("button").nth(i).click();
        break;
       } 
    }
    const data = page.locator(".input[type ='text']");
    await data.first().fill("1234");
    await data.nth(1).fill("111");
    await data.nth(2).fill("pooja");
    await page.locator("[name= 'coupon']").pressSequentially("rahulshettyacademy");
    await page.locator("[type = 'submit']").click();
    await expect (page.locator(".mt-1.ng-star-inserted")).toHaveText("* Coupon Applied");
    await expect(page.locator(".user__name [type=text]").first()).toHaveText(email);
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderid = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderid);
    
    await page.locator("[routerlink*='myorders']").first().click();
    await page.locator("tbody").waitFor();
    const row = page.locator("tbody tr");
    const ordercount = await row.count();
    for(let i =0 ; i<ordercount ;i++)
    {
        const roworder= await row.nth(i).locator("th").textContent();//row.nth(i).locator is chaining locator
        if(orderid.includes(roworder)) //assertion include check the orderid avoid space and deliminator
        {
            await row.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderDetails = await page.locator(".col-text").textContent();
    expect(orderid.includes(orderDetails)).toBeTruthy();
});