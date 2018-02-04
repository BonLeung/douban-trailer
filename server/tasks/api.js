const rp = require('request-promise-native')

async function fetchMovie(item) {
  let url = `http://api.douban.com/v2/movie/subject/${item.doubanId}`

  const res = await rp(url)

  return res
}

;(async () => {
  let movies = [
    { doubanId: 25790761,
      title: '东方快车谋杀案',
      rate: 7,
      poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2502165084.jpg'
    },
    { doubanId: 1578714,
      title: '神奇女侠',
      rate: 7.1,
      poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2460006593.jpg'
    }
  ]

  movies.map(async movie => {
    let movieData = await fetchMovie(movie)

    try {
      movieData = JSON.parse(movieData)
      console.log(movieData)
    } catch(err) {
      console.log(err)
    }
  })
})()
