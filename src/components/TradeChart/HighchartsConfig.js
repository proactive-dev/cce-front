export const HighchartsConfig = (Highcharts) => {
  var f, render

  Highcharts.setOptions({
    global: {
      useUTC: false
    }
  })

  render = Highcharts.RangeSelector.prototype.render

  Highcharts.RangeSelector.prototype.render = function(min, max) {
    var button, leftPosition, space, topPosition, _i, _len, _ref, _results
    render.apply(this, [min, max])
    leftPosition = this.chart.plotLeft
    topPosition = this.chart.plotTop
    space = 10
    this.zoomText.attr({
      x: leftPosition + 2,
      y: topPosition + 15
      // text: gon.i18n.chart.zoom
    })
    leftPosition += this.zoomText.getBBox().width + 15
    _ref = this.buttons
    _results = []
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      button = _ref[_i]
      button.attr({
        x: leftPosition,
        y: topPosition
      })
      _results.push(leftPosition += button.width + space)
    }
    return _results
  }

  f = function(callback) {
  }

  Highcharts.wrap(Highcharts.Tooltip.prototype, 'hide', f)

}