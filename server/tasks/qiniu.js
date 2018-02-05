const qiniu = require('qiniu')
const nanoid = require('nanoid')
const config = require('../config')

const bucket = config.qiniu.bucket
const mac = new qiniu.auth.digest.Mac(config.qiniu.AK, config.qiniu.SK)
const cfg = new qiniu.conf.Config()
const client = new qiniu.rs.BucketManager(mac, cfg)

const uploadToQiniu = async (url, key) => {
  return new Promise((resolve, reject) => {
    client.fetch(url, bucket, key, (err, ret, info) => {
      if (err) {
        reject(err)
      } else {
        if (info.statusCode === 200) {
          resolve({ key })
        } else {
          reject(info)
        }
      }
    })
  })
}

;(async () => {
  let movies = [{
    video: 'http://vt1.doubanio.com/201802051437/2725f63c6d62fcad627275cd406f8cd5/view/movie/M/302260740.mp4',
    doubanId: '26389152',
    poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2461791740.jpg',
    cover: 'https://img3.doubanio.com/img/trailer/medium/2511862702.jpg?1517194625'
  }]

  movies.map(async movie => {
    if (movie.video && !movie.key) {
      try {
        console.log('开始上传 video')
        let videoData = await uploadToQiniu(movie.video, nanoid() + '.mp4')
        console.log('开始上传 poster')
        let posterData = await uploadToQiniu(movie.poster, nanoid() + '.png')
        console.log('开始上传 cover')
        let coverData = await uploadToQiniu(movie.cover, nanoid() + '.png')

        if (videoData.key) {
          movie.videoKey = videoData.key
        }
        if (posterData.key) {
          movie.posterKey = posterData.key
        }
        if (coverData.key) {
          movie.coverKey = coverData.key
        }

        // { video: 'http://vt1.doubanio.com/201802051437/2725f63c6d62fcad627275cd406f8cd5/view/movie/M/302260740.mp4',
        //   doubanId: '26389152',
        //   poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2461791740.jpg',
        //   cover: 'https://img3.doubanio.com/img/trailer/medium/2511862702.jpg?1517194625',
        //   videoKey: 'qwBy9pC4DumjPIbBSnDph.mp4',
        //   posterKey: 'RMa8FqhPuLTiLCMIanSC1.png',
        //   coverKey: 'XYPem0JSvBnGIYTEt6xW7.png'
        // }
        console.log(movie)
      } catch(err) {
        console.log(err)
      }
    }
  })
})()
