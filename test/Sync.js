const doSync = (sth, time) => new Promise(resolve => {
  setTimeout(() => {
    console.log(`${sth}用了 ${time} 毫秒`)
    resolve()
  }, time)
})

const doAsync = (sth, time, cb) => {
  setTimeout(() => {
    console.log(`${sth}用了 ${time} 毫秒`)
    cb && cb()
  }, time);
}

const doElse = sth => console.log(sth)

const bangge = { doSync, doAsync }
const Meizi = { doSync, doAsync, doElse }

;(async () => {
  console.log('case1:')
  console.log('妹子来到门口')
  await bangge.doSync('BonLeung 刷牙', 1000)
  console.log('妹子啥也没干，一直等')
  await Meizi.doSync('妹子洗澡', 2000)
  Meizi.doElse('妹子去忙别的了')

  console.log('case3:')
  console.log('妹子来到门口，按下开关')
  await bangge.doAsync('BonLeung 刷牙', 1000, () => {
    console.log('通知妹子来洗澡')
    Meizi.doSync('妹子洗澡', 2000)
  })
  Meizi.doElse('妹子去忙别的了')
})()

