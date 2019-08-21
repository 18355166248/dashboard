window.onload = function() {
  const c = document.getElementById('canvas')
  c.width = window.innerWidth
  c.height = window.innerWidth
  const score = parseFloat(c.dataset.score)
  const ctx = c.getContext('2d')
  const cWidth = c.width
  const cHeight = c.height
  const list = ['0', '4万', '8万', '12万', '16万', '20万']
  const radius = cWidth / 3
  const deg0 = Math.PI / 9
  let angle = 0
  const deg1 = (Math.PI * 11) / 45
  const max = 200000
  let initNum = 4000

  const dot = new Dot()
  const dotSpeed = 0.06
  const txtSpeed = Math.round((dotSpeed * 40000) / deg1)

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

    const aim = (score * deg1) / 40000
    if (angle < aim) {
      angle += dotSpeed
    }
    // console.log(angle / max * 140)
    // console.log(angle)
    // 画滚动的点
    dot.draw(ctx)

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
    ctx.drawImage(arrowImg, 0, 0, 62, 299, -31, -100, 62, 800)

    ctx.restore()

    // 画最高借款额度文字
    // ctx.save()
    // ctx.rotate(-8 * deg0)
    // ctx.fillStyle = 'rgba(0, 0, 0, 1)'
    // ctx.font = '16px MicroSoft Yahei'
    // ctx.textAlign = 'center'
    // ctx.fillText('最高借款额度', 0, -30)
    // ctx.restore()

    ctx.save()
    ctx.beginPath()
    ctx.lineWidth = 3
    ctx.strokeStyle = 'rgba(255, 255, 255, .5)'
    ctx.arc(0, 0, radius, 0, angle, false)
    ctx.stroke()
    ctx.restore()

    // 最外层轨道
    ctx.save()
    ctx.beginPath()
    ctx.lineWidth = 3
    ctx.strokeStyle = 'rgba(255, 255, 255, .2)'
    ctx.arc(0, 0, radius, 0, deg0 * 11, false)
    ctx.stroke()
    ctx.restore()

    // 内层轨道
    ctx.save()
    ctx.beginPath()
    ctx.lineWidth = 11
    ctx.strokeStyle = 'rgba(255, 255, 255, .2)'
    ctx.arc(0, 0, radius - 16, 0, deg0 * 11, false)
    ctx.shadowColor = 'RGBA(0, 0, 0, 1)'
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 10
    ctx.shadowBlur = 30
    ctx.stroke()
    ctx.restore()

    ctx.save()
    ctx.beginPath()
    ctx.lineWidth = 11
    ctx.strokeStyle = 'red'
    ctx.arc(0, 0, 16, 0, Math.PI * 2, false)
    ctx.stroke()
    ctx.restore()

    // 刻度线
    ctx.save()
    for (let i = 0; i < list.length; i++) {
      ctx.beginPath()
      ctx.lineWidth = 2
      ctx.strokeStyle = 'rgba(255, 255, 255, .4)'
      ctx.moveTo(114, 0)
      ctx.lineTo(104, 0)
      ctx.stroke()
      ctx.rotate(deg1)
    }
    ctx.restore()

    // 细分刻度线
    ctx.save()
    for (let i = 0; i < 64; i++) {
      if (i % 5 !== 0) {
        ctx.beginPath()
        ctx.lineWidth = 2
        ctx.strokeStyle = 'rgba(255, 255, 255, .3)'
        ctx.moveTo(114, 0)
        ctx.lineTo(108, 0)
        ctx.stroke()
        ctx.rotate(deg1 / 10)
      }
    }
    ctx.restore()

    // 信用分数
    ctx.save()
    ctx.rotate(Math.PI / 2)
    for (let i = 0; i < list.length; i++) {
      ctx.fillStyle = 'rgba(255, 255, 255)'
      ctx.font = '10px MicroSoft Yahei'
      ctx.fillText(list[i], -10, -135)
      ctx.rotate(deg1)
    }
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
      ctx.save()
      ctx.beginPath()
      // ctx.fillStyle = 'rgba(255, 255, 255, .7)'
      ctx.fillStyle = 'yellow'
      ctx.arc(this.x, this.y, 6, Math.PI * 2, false)
      ctx.fill()
      ctx.restore()
    }
  }

  // 数字生成
  function Txt(txt) {
    ctx.save()
    ctx.rotate(-8 * deg0)
    ctx.fillStyle = 'yellow'
    ctx.font = '700 45px MicroSoft Yahei'
    ctx.textAlign = 'center'
    ctx.fillText(txt, 0, 90)
    ctx.restore()
  }
}
