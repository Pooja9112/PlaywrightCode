const {test, expect} = require('@playwright/test');

test('Browser context Playwright test', async ({browser})=>
{
   const context = await browser.newContext();
   const page = await context.newPage();
   const usename = page.locator('#username');
   const signin = page.locator("#signInBtn");
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   console.log(await page.title());
   await usename.fill('rahulshetty');
   await page.locator("[type ='password']").fill('Learning@830$3mK2');
   await signin.click();
   console.log(await page.locator("[style*='block']").textContent());
   await expect(page.locator("[style*='block']")).toContainText('Incorrect');
   // wipe out incorrect username and enter correct username
   await usename.fill("");
   await usename.fill("rahulshettyacademy");
   await signin.click();
   const titleEle = page.locator('.card-body a');
   console.log(await titleEle.first().textContent());
//    console.log(await page.locator('.card-body a').nth(1).textContent());
//    console.log(await page.locator('.card-body a').last().textContent());
   console.log(await titleEle.allTextContents());
});

test('Page fixture playwright test',async ({page})=>
{
    await page.goto("https://www.google.com/");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
});

test("Dropdown and Radio", async ({page})=>
{
   const usename = page.locator('#username');
   const signin = page.locator("#signInBtn");
   const docLink = page.locator("[href*='documents-request']");
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   await page.locator("select.form-control").selectOption("consult");//dropdown
   await page.locator(".radiotextsty").last().click(); // radio button 
   await page.locator('#okayBtn').click(); //click ok on popup
   console.log(await page.locator(".radiotextsty").last().isChecked()); //method return true or false
   expect (await page.locator(".radiotextsty").last()).toBeChecked();//assertion if not check then test fail
   await page.locator('#terms').click(); 
   expect (await page.locator('#terms').isChecked());//method check the checkbox
   await page.locator('#terms').uncheck(); //uncheck checkbox
   expect (await page.locator('#terms').isChecked()).toBeFalsy();//assertion if checkbox not uncheck then fail 

   await expect(docLink).toHaveAttribute("class","blinkingText");
  // await page.pause(); //pause page to see result
});

test("Child window handling", async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const docLink = await page.locator("[href*='documents-request']");
    
    const [newpage] = await Promise.all(
    [ context.waitForEvent('page'),
      docLink.click(),]
    )
    const text = await newpage.locator(".red").textContent();//shows static data which are present on DOM 
    const arraydata = await text.split("@"); //split mentor@rahulshettyacademy.com with below by @ deliminator
    const email = await arraydata[1].split(" ")[0];//taken arraydata variables second part which are in array 1 index i.e rahulshettyacademy.com with and again spilt with white space and taken index 0 data i.e rahulshettyacademy.com
    //console.log(email);
    await page.locator('#username').fill(email);
    console.log(await page.locator('#username').inputValue()); //runtime dynamic input
    //await page.pause();
});