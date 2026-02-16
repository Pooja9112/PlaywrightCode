const {test, expect} = require('@playwright/test');

test("Some More unique Locator", async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Gender").selectOption("Female");// getbylable text
    await page.getByLabel("Employed").check();//can use click or check 
    await page.getByPlaceholder("Password").fill("abc123");// getbyplaceholder means its inside text
    await page.getByRole('button',{name:'Submit'}).click();//getbyrole its type n name 
    await page.getByText(" The Form has been submitted successfully!.").isVisible();
    await page.getByRole("link",{name: "Shop"}).click();
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();
});