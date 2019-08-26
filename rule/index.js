window.onload = function() {
  const c = document.getElementById('canvas')
  const max = parseFloat(c.dataset.max)
  const ctx = c.getContext('2d')
  let number = 0
  const activeColor = '#6d8ff0'
  const noColor = '#ccc'

  c.style.width = window.screen.width - 60 + 'px'
  c.style.height = (728 / 678) * window.screen.width - 60 + 'px'

  const cWidth = c.width
  const cHeight = c.height

  const ruleImg = new Image()
  ruleImg.src = './rule.png'
  ruleImg.onload = function() {
    let num = 0
    const speed = 20
    const start = 63
    const step = 100 // 步进器
    ;(function draw() {
      ctx.save()
      ctx.clearRect(0, 0, cWidth, cHeight)

      num += speed
      // 因为居中刻度初始化是占 13个格子 所以要减去
      if (num >= max / step - 260) {
        num = max / step - 260
      }

      ctx.save()
      ctx.font = '700 50px SimHei, MicroSoft Yahei'
      ctx.fillStyle = 'gold'
      ctx.textAlign = 'center'
      if (number < max / step / 20) {
        ++number
      }
      let txt = number * 2000 + 10000
      if (txt >= max) {
        txt = max
      }

      ctx.fillText('￥' + txt, 340, 275)
      ctx.restore()

      for (let i = 0; i < max / step / 20 + 15; i++) {
        let nn = i * step * 20
        let color = ''
        if (nn >= txt + 100) color = noColor
        else color = activeColor
        ctx.strokeStyle = color
        ctx.beginPath()
        if (i % 5 === 0) {
          ctx.lineWidth = 4
          ctx.moveTo(start + (i + 1) * speed - num, 120)
          ctx.lineTo(start + (i + 1) * speed - num, 145)

          ctx.font = '700 20px MicroSoft Yahei'
          ctx.textAlign = 'center'
          ctx.fillStyle = color

          ctx.fillText(nn, start + (i + 1) * speed - num, 170)
        } else {
          ctx.lineWidth = 2
          ctx.moveTo(start + (i + 1) * speed - num, 125)
          ctx.lineTo(start + (i + 1) * speed - num, 140)
        }
        ctx.stroke()
      }
      ctx.restore()

      ctx.save()
      ctx.drawImage(ruleImg, 0, 0, 678, 728)
      ctx.restore()

      window.requestAnimationFrame(draw)

      ctx.restore()
    })()
  }
}
