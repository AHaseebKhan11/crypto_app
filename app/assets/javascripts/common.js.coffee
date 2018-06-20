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
#   $('#post_content').atwho
#     at: '$'
#     data: [ 'BTC'
#             'ETH'
#             'EOS'
#             'BCH'
#             'TRX'
#             'LTC'
#             'XRP'
#             'ETC'
#             'CTXC'
#             'DASH'
#             'ADA'
#             'ONT'
#             'IOT'
#             'NEO'
#             'XLM'
#             'QTUM'
#             'BNB'
#             'HT'
#             'XMR'
#             'ZEC']
