const puppeteer = require('puppeteer')
const process = require('process')

const url = 'https://movie.douban.com/explore#!type=movie&tag=%E7%83%AD%E9%97%A8&sort=rank&page_limit=20&page_start=0'

const sleep = time => new Promise(resolve => {
  setTimeout(resolve, time);
})

;(async () => {
  console.log('Start visit the target page')

  const browser = await puppeteer.launch({
    args: ['--no-snadbox'],
    dumpio: false
  })

  const page = await browser.newPage()

  for (let i = 0; i < movies.length; i++)

  await page.goto(url, {
    waitUntil: 'networkidle2'
  })

  await sleep(3000)

  await page.waitForSelector('.more')

  for (let i = 0; i < 3; i++) {
    await sleep(3000)
    await page.click('.list-wp .more')
  }

  const result = await page.evaluate(() => {
    var $ = window.$
    var items = $('.list-wp a.item')
    var links = []

    if (items.length > 0) {
      items.each((index, item) => {
        let it = $(item)
        let doubanId = it.find('div').data('id')
        let title = it.find('img').attr('alt')
        let rate = Number(it.find('strong').text())
        let poster = it.find('img').attr('src').replace('s_ratio', 'l_ratio')

        links.push({
          doubanId,
          title,
          rate,
          poster
        })
      })
    }

    return links
  })

  browser.close()

  process.send({result})
  process.exit(0)
})()
