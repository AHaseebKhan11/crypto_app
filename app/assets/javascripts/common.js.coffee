$(document).on 'ready page:load', (event) ->
  $('.slider').bxSlider
    ticker: true
    speed: 45000
    minSlides: 5
    maxSlides: 20
    slideWidth: 250
    slideMargin: 0
    tickerHover: true
    shrinkItems: true
