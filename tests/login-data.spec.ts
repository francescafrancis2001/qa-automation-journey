import { test, expect } from '@playwright/test';


// READ THE DATA FROM A JSON FILE 

import * as fs from 'fs';
import * as path from 'path';    //fs.readFileSync reads the file as text, and JSON.parse turns it into an array of objects. __dirname is the folder of the current test file, so the path works from anywhere. Anyone can then add test data without touching test code, which is useful for teammates who don’t write TypeScript.


interface LoginCase {   //Now TypeScript warns you if a case is missing a field or has a typo like pasword
    name: string;
    username: string;
    password: string;
    error: string;
}

const loginCases: LoginCase[] = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'data', 'login-cases.json'), 'utf-8')       // if the json file is added in test folder insitead of data folder in test folder, so i want to write --> path.join(__dirname, 'login-cases.json')
);


// WRITE THE DATA INSIDE THIS FILE

// const loginCases: LoginCase[] = [

//     //const loginCases = [ //javascipt: const loginCases = [....]   typescript:  const loginCases: LoginCase[] = [....]
//     { name: 'empty username', username: '', password: 'secret_sauce', error: 'Username is required' },
//     { name: 'empty password', username: 'standard_user', password: '', error: 'Password is required' },
//     { name: 'wrong password', username: 'standard_user', password: 'wrong', error: 'do not match' },
//     { name: 'locked out user', username: 'locked_out_user', password: 'secret_sauce', error: 'Sorry, this user has been locked out' },
// ];


for (const c of loginCases) {
    test(`login fails: ${c.name}`, async ({ page }) => {
        await page.goto('/');
        await page.locator('[data-test="username"]').fill(c.username);
        await page.locator('[data-test="password"]').fill(c.password);
        await page.locator('[data-test="login-button"]').click();

        await expect(page.locator('[data-test="error"]')).toContainText(c.error);   //this text contain inside the retruning sentence, ex: "do not match" is contain inside "Epic sadface: Username and password do not match any user in this service"
        await expect(page).toHaveURL('/');
    });
}


