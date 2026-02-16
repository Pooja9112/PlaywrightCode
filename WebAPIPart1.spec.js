const {test,expect,request} =require ("@playwright/test")
const loginPayload = {userEmail:"pooja1@example.com",userPassword:"Pooja@12"};//id and pw for login
const orderPayload = {orders:[{country:"India",productOrderedId:"6960eac0c941646b7a8b3e68"}]};
let token;
let orderid;
test.beforeAll(async()=>
{  
    //login API
    const apiContext= await request.newContext(); //creating api context
    const loginResponse = await apiContext.post("https://www.rahulshettyacademy.com/api/ecom/auth/login",
    {
        data : loginPayload, //payload id n pw pass to url
        ignoreHTTPSErrors: true
    })
    //url along with payload id n pw pass to apicontext
    expect(loginResponse.ok()).toBeTruthy(); //ok means status code 200,201,202 etc
    const loginResponseJson = await loginResponse.json();//getting json response body 
    token = loginResponseJson.token;//getting token form json
    console.log(token);

    //order placing API
    const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
        data : orderPayload,
        ignoreHTTPSErrors: true,
        headers : {
            'authorization': token,
            'content-type': 'application/json',
        }
        
    })
    const orderResponseJson = await orderResponse.json();
    console.log(orderResponseJson);
    orderid = orderResponseJson.orders[0];

});
//beforeAll will execute before test1,test2,test3
//beforeEach will execute before test1, before test2, before test3
test.beforeEach(()=>
{

})

//create order success
test("Place the order", async({page}) =>
{
    await page.addInitScript(value=>
        {
            window.localStorage.setItem('token',value)
        }, token);

    await page.goto("https://rahulshettyacademy.com/client");   
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