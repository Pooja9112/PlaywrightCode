class APIUtils
{
    constructor(apiContext,loginPayload)
    {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }
    async getToken()
    {
        const loginResponse = await this.apiContext.post("https://www.rahulshettyacademy.com/api/ecom/auth/login",
    {
        data : await this.loginPayload, //payload id n pw pass to url
        ignoreHTTPSErrors: true
    })
    //url along with payload id n pw pass to apicontext
    const loginResponseJson = await loginResponse.json();//getting json response body 
    const token = loginResponseJson.token;//getting token form json
    console.log(token);
    return token;
    }
    async createOrder(orderPayload)
    {
        let response = {}; //dynamic variable
        response.token = await this.getToken();

        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
        data : orderPayload,
        ignoreHTTPSErrors: true,
        headers : {
            'authorization': response.token,
            'content-type': 'application/json',
        }
        
    })
    const orderResponseJson = await orderResponse.json();
    console.log(orderResponseJson);
    const orderid = orderResponseJson.orders[0];
    response.orderid = orderid;
    return response;
    }
}
module.exports = {APIUtils};