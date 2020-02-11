/**
 * @name get list of links
 *
 * @desc Scrapes Hacker News for links on the home page and returns the top 10
 */
const puppeteer = require('puppeteer');

(async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.tracing.start({
		path: 'trace.json',
		categories: ['devtools.timeline'],
	});
	await page.goto('https://news.ycombinator.com/news');

	const result = await page.evaluate(x => {
		return Promise.resolve(8 * x);
	}, 7);
	console.log(result); // prints "56"

	const result1 = await page.waitForSelector('p');
	console.log(result1);

	// execute standard javascript in the context of the page.

	// console.log(await page.$$eval('a.storylink'));
	const stories = await page.$$eval('a.storylink', anchors => {
		return anchors.map(anchor => anchor.textContent).slice(0, 10);
	});
	console.log(stories);
	await page.tracing.stop();
	await browser.close();
})();
