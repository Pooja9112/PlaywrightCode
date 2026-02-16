const {test,expect,request} =require ("@playwright/test")
const {APIUtils}= require("./utils/APIUtils"); //imported apiutil class
const loginPayload = {userEmail:"pooja1@example.com",userPassword:"Pooja@12"};//id and pw for login
const orderPayload = {orders:[{country:"India",productOrderedId:"6960eac0c941646b7a8b3e68"}]};
let response;
test.beforeAll(async()=>
{  
    //login API
    const apiContext= await request.newContext(); //creating api context
    const apiUtilsObj =new APIUtils(apiContext,loginPayload);//login 
    response = await apiUtilsObj.createOrder(orderPayload)//order place 
    //order placing API

});

//create order success
test("Place the order", async({page}) =>
{
    await page.addInitScript(value=>
        {
            window.localStorage.setItem('token',value)
        }, response.token);

    await page.goto("https://rahulshettyacademy.com/client");   
    await page.locator("[routerlink*='myorders']").first().click();
    await page.locator("tbody").waitFor();
    const row = page.locator("tbody tr");
    const ordercount = await row.count();
    for(let i =0 ; i<ordercount ;i++)
    {
        const roworder= await row.nth(i).locator("th").textContent();//row.nth(i).locator is chaining locator
        if(response.orderid.includes(roworder)) //assertion include check the orderid avoid space and deliminator
        {
            await row.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderDetails = await page.locator(".col-text").textContent();
    expect(response.orderid.includes(orderDetails)).toBeTruthy();
});