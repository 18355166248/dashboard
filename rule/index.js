window.onload = function() {
  const c = document.getElementById('canvas')
  const score = parseFloat(c.dataset.score)
  const ctx = c.getContext('2d')

  const cWidth = c.width
  const cHeight = c.height

  c.style.width = window.screen.width + 'px'
  c.style.height = (728 / 678) * window.screen.width + 'px'

  const ruleImg = new Image()
  ruleImg.src = './rule.png'
  ruleImg.onload = function() {
    let num = 0
    const speed = 10
    const max = 100000
    ;(function draw() {
      ctx.save()
      ctx.clearRect(0, 0, cWidth, cHeight)

      num += speed
      if (num >= (max / 100)) {
        num = max / 100
      }
      for (let i = 0; i < 200; i++) {
        ctx.strokeStyle = '#6d8ff0'
        ctx.beginPath()
        if (i % 5 === 0) {
          ctx.lineWidth = 8
          ctx.moveTo(77 + (i + 1) * 20 - num, 120)
          ctx.lineTo(77 + (i + 1) * 20 - num, 145)
          ctx.font = '700 20px MicroSoft Yahei'
          ctx.textAlign = 'center'
          ctx.fillStyle = '#6d8ff0'
          ctx.fillText(i * 100, 77 + (i + 1) * 20 - num, 170)
        } else {
          ctx.lineWidth = 2
          ctx.moveTo(77 + (i + 1) * 20 - num, 125)
          ctx.lineTo(77 + (i + 1) * 20 - num, 140)
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
