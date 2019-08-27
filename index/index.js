window.onload = function() {
  const c = document.getElementById('canvas')
  const box = document.getElementById('box')
  const score = parseFloat(c.dataset.score)
  const ctx = c.getContext('2d')

  c.style.width = window.screen.width + 'px'
  c.style.height = window.screen.width + 'px'

  const cWidth = c.width
  const cHeight = c.height

  // const scale = (window.screen.width / 1000).toFixed(3)
  // c.style.transform = `translate(-50%, -50%) scale(${scale})`

  const list = [
    { txt: 0, num: 0 },
    { txt: '5万', num: 50000 },
    { txt: '10万', num: 100000 },
    { txt: '15万', num: 150000 },
    { txt: '20万', num: 200000 }
  ]
  const radius = cWidth / 3
  const deg0 = Math.PI / 9
  let angle = 0
  const deg1 = (Math.PI * 11) / 36
  const max = 200000
  let initNum = 4000
  const step = 50000

  const dot = new Dot()
  const dotSpeed = 0.06
  const txtSpeed = Math.round((dotSpeed * step) / deg1)

  const arrowImg = new Image()
  arrowImg.src = './arrow.png'
  ;(function drawFrame() {
    ctx.save()
    ctx.clearRect(0, 0, cWidth, cHeight)
    ctx.translate(cWidth / 2, cHeight / 2)
    ctx.rotate(8 * deg0)

    dot.x = radius * Math.cos(angle)
    dot.y = radius * Math.sin(angle)
    dot.xL = (radius - 16) * Math.cos(angle)
    dot.yL = (radius - 16) * Math.sin(angle)

    const aim = (score * deg1) / step
    if (angle < aim) {
      angle += dotSpeed
    }

    // 画数字
    if (score - txtSpeed > initNum) {
      initNum += txtSpeed
    } else if (max >= score - txtSpeed && initNum < score) {
      initNum += 1000
    } else if (initNum > score) {
      initNum = score
    }
    Txt(initNum)

    // 画箭头
    ctx.save()
    ctx.rotate(angle + Math.PI / 2)
    ctx.textAlign = 'center'
    ctx.drawImage(arrowImg, 0, 0, 62, 299, -15.5, -330, 31, 500)

    ctx.restore()

    // 画最高借款额度文字
    ctx.save()
    ctx.rotate(-8 * deg0)
    ctx.fillStyle = 'rgba(154, 173, 255, 1)'
    ctx.font = '56px MicroSoft Yahei'
    ctx.textAlign = 'center'
    ctx.fillText('最高借款额度', 0, 370)
    ctx.restore()

    // 灰色轨道
    ctx.save()
    ctx.beginPath()
    ctx.lineWidth = 10
    ctx.strokeStyle = 'rgba(0, 0, 0, .05)'
    ctx.arc(0, 0, radius + 24, 0, deg0 * 11, false)
    ctx.stroke()
    ctx.restore()

    // 粉色轨道
    ctx.save()
    ctx.beginPath()
    ctx.lineWidth = 36
    ctx.strokeStyle = 'rgba(255, 0, 0, .3)'
    ctx.arc(0, 0, radius, 0, deg0 * 11, false)
    ctx.stroke()
    ctx.restore()

    // 画经过的弧线
    ctx.save()
    ctx.beginPath()
    ctx.lineWidth = 36
    ctx.strokeStyle = 'rgba(255, 0, 0, 1)'
    ctx.arc(0, 0, radius, 0, angle, false)
    ctx.stroke()
    ctx.restore()

    // 画滚动的点
    dot.draw(ctx)

    // 刻度线  文字
    ctx.save()
    for (let i = 0; i < list.length; i++) {
      ctx.beginPath()
      ctx.lineWidth = 6
      ctx.strokeStyle = 'rgba(255, 0, 0, 1)'
      ctx.moveTo(475, 0)
      ctx.lineTo(445, 0)
      ctx.stroke()
      ctx.rotate(deg1)

      ctx.save()
      ctx.rotate(-deg1)
      ctx.translate(495, 0)
      switch (i) {
        case 0:
          ctx.translate(10, 10)
          break
        case 1:
          ctx.translate(40, -30)
          ctx.rotate(Math.PI / 1.23)
          break
        case 2:
          ctx.translate(10, -34)
          ctx.rotate(Math.PI / 2)
          break
        case 3:
          ctx.translate(10, 0)
          ctx.rotate(Math.PI / 5.3)
          break
        case 4:
          ctx.translate(10, 10)
          ctx.rotate(-Math.PI / 9)
          break
      }
      // console.log(initNum, list[i].num)
      if (initNum >= list[i].num) {
        ctx.fillStyle = 'rgba(255, 0, 0, 1)'
      } else {
        ctx.fillStyle = 'rgba(0, 0, 0, .4)'
      }

      ctx.font = '36px MicroSoft Yahei'
      ctx.fillText(list[i].txt, 0, 0)
      ctx.restore()
    }
    ctx.restore()

    // 细分刻度线
    ctx.save()
    for (let i = 0; i < 40; i++) {
      if (i % 10 !== 0) {
        ctx.beginPath()
        ctx.lineWidth = 4
        ctx.strokeStyle = 'rgba(0, 0, 0, .3)'
        ctx.moveTo(465, 0)
        ctx.lineTo(445, 0)
        ctx.stroke()
      }
      ctx.rotate(deg1 / 10)
    }
    ctx.restore()

    // 信用分数
    // ctx.save()
    // ctx.rotate(Math.PI / 2)
    // for (let i = 0; i < list.length; i++) {
    //   ctx.fillStyle = 'rgba(255, 0, 0, 1)'
    //   ctx.font = '12px MicroSoft Yahei'
    //   ctx.fillText(list[i], -12, -160)
    //   ctx.rotate(deg1)
    // }
    // ctx.restore()

    // 画中心圆点
    ctx.save()
    ctx.beginPath()
    ctx.lineWidth = 8
    ctx.strokeStyle = 'rgb(255, 0, 0)'
    ctx.arc(0, 0, 50, 0, Math.PI * 2, false)
    ctx.stroke()
    ctx.restore()

    ctx.save()
    ctx.beginPath()
    ctx.fillStyle = 'rgb(255, 255, 255)'
    ctx.arc(0, 0, 48, 0, Math.PI * 2, false)
    ctx.fill()
    ctx.restore()

    ctx.save()
    ctx.beginPath()
    ctx.arc(0, 0, 22, 0, Math.PI * 2, false)
    ctx.fillStyle = 'rgb(255,0,0)'
    ctx.fill()
    ctx.restore()
    window.requestAnimationFrame(drawFrame)

    ctx.restore()
  })()

  // 滚动圆点生成
  function Dot() {
    this.x = 0
    this.y = 0
    this.xL = 0
    this.yL = 0
    this.draw = function(ctx) {
      // 画大圆
      ctx.save()
      ctx.beginPath()
      ctx.fillStyle = 'rgb(255, 0, 0)'
      ctx.arc(this.x, this.y, 18, Math.PI * 2, false)
      ctx.fill()
      ctx.restore()

      ctx.save()
      ctx.beginPath()
      ctx.fillStyle = '#fff'
      ctx.arc(this.x, this.y, 8, Math.PI * 2, false)
      ctx.fill()
      ctx.restore()
    }
  }

  // 数字生成
  function Txt(txt) {
    ctx.save()
    ctx.rotate(-8 * deg0)
    ctx.fillStyle = 'rgb(255,0,0)'
    ctx.font = '700 150px MicroSoft Yahei'
    ctx.textAlign = 'center'
    ctx.fillText(txt, 0, 300)
    ctx.restore()

    // 画 ￥
    ctx.save()
    ctx.rotate(-8 * deg0)
    ctx.fillStyle = 'rgba(255, 0, 0, .5)'
    ctx.font = '80px MicroSoft Yahei'
    ctx.fillText('￥', -320, 300)
    ctx.restore()
  }
}
