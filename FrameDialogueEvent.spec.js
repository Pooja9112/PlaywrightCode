const {test,expect} = require('@playwright/test')

test("Popup validation", async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("https://www.google.com/");
    // await page.goBack(); // will go back to rahulshetty practice url
    // await page.goForward(); // again go forward to google url
    
    //Hidden element on page
    await expect(page.locator("#displayed-text")).toBeVisible(); //checking textbox is visible
    await page.locator("#hide-textbox").click(); //click on hide textbox
    await expect(page.locator("#displayed-text")).toBeHidden(); //checking textbox is hidden
    //await page.pause(); //we can use debug mode in terminal but it will start from first so pause() method will useful to save time
    //Dialog box 
    page.on('dialog',dialog => dialog.accept());//its javascript popup so no locator is available. ready functions are available accept() to click ok and dismiss() to click on cancel
    await page.locator("#confirmbtn").click();
    //Mouse hover
    await page.locator("#mousehover").hover();//hover the mouse curser on that field
    //External Frame (child frame inside mainframe)
    const childFrame= page.frameLocator("#courses-iframe"); //frameLocator will point to child frame locator
    await childFrame.locator("li a[href*='lifetime-access']:visible").click();//visible check will check only visible element
    const subscriber = await childFrame.locator(".text h2").textContent();//textContent() will grab text
    console.log(subscriber.split(" ")[1]);//split will divide string into parts
});

test("Screenshot ",async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    //Hidden element on page
    await expect(page.locator("#displayed-text")).toBeVisible(); //checking textbox is visible
    await page.locator("#displayed-text").screenshot({path : 'partialScreenshot.png'});
    await page.locator("#hide-textbox").click(); //click on hide textbox
    page.screenshot({path : 'screenshot.png'});
    await expect(page.locator("#displayed-text")).toBeHidden();
});

//visual comparison means it will compare existing screenshot with new latest screenshot if both are matching then it will pass or test will fail
//it will check every pixel so alignment any timestamp is also checking
test("Visual comparison",async({page})=>
{
    await page.goto("https://playwright.dev/docs/locators");
    expect (await page.screenshot()).toMatchSnapshot('landing.png');//it will compare new taken screenshot with existing landing.png
})