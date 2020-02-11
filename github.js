const puppeteer = require('puppeteer');
const screenshot = `${Math.random()}_github.png`;
(async () => {
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();
	await page.goto('https://github.com/login', {
		waitUntil: 'domcontentloaded',
	});
	await page.type('#login_field', 'testname');
	await page.type('#password', 'testname');
	await page.click('[name="commit"]');
	await page.waitForNavigation();
	await page.screenshot({ path: screenshot, fullPage: true });
	browser.close();
	console.log('See screenshot: ' + screenshot);
})();
