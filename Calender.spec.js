const {test,expect} = require('@playwright/test')

test("Calendar validations",async({page})=>
{
 
    const monthNumber = "6";
    const date = "15";
    const year = "2027";
    const expectedList = [monthNumber,date,year];
    
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber)-1).click();//Number convert string to number
    await page.locator("//abbr[text()='"+date+"']").click();//date is pass as number
 
    const inputs =  page.locator('.react-date-picker__inputGroup__input')
 
    for(let i =0; i<expectedList.length;i++)
    {
        const value = await inputs.nth(i).inputValue();
        expect(value).toEqual(expectedList[i]);
 
    }
});

// test("Calender with css locator", async({page})=>
// {
//     const month= "2";
//     const day = "12";
//     const year = "2000";
//     const expectedDate = [month,day,year];
//     await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
//     await page.locator(".react-date-picker__calendar-button").click();
//     await page.locator(".react-calendar__navigation__label").click();
//     await page.locator(".react-calendar__navigation__label").click();
//     await page.locator(".react-calendar__navigation__prev-button").click();
//     await page.locator(".react-calendar__navigation__prev-button").click();
//     await page.locator(".react-calendar__navigation__prev-button").click();
//     await page.getByText(year).last().click();
//     await page.locator(".react-calendar__year-view__months__month").nth(Number(month)-1).click();//Number convert string to number
//     await page.locator("//abbr[text()='"+day+"']").click();//day is pass as number
    
//     const inputdate = page.locator(".react-date-picker__inputGroup input");

//     for(let i=0;i<expectedDate.length;i++)
//     {
//         const date = await inputdate.nth(i).inputValue();
//         expect(date).toEqual(expectedDate[i]);
//     }

// });