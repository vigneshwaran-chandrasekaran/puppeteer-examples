const puppeteer = require('puppeteer');
const iPhone = puppeteer.devices['iPhone 6'];

const url = 'https://economictimes.indiatimes.com/';
const screenshot = `screenshots/${Date.now()}_economictimes.png`;

(async () => {
	try {
		const browser = await puppeteer.launch({ headless: false });
		const page = await browser.newPage();
		// await page.emulate(iPhone);
		await page.goto(url, { waitUntil: 'domcontentloaded' });
		// console.log(await page.content());
		page.once('load', () => console.log('Page loaded!'));

		const pageTitle = await page.title();

		console.log(' page.title: ' + pageTitle);
		await page.screenshot({
			fullPage: true, // then will take entire page screenshot
			path: screenshot,
		});

		console.log('See screenshot: ' + screenshot);

		await browser.close();
	} catch (e) {
		console.log('error', e);
	}
})();
