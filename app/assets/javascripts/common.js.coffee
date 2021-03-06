$(document).on 'ready page:load', (event) ->
  result = []
  new AvatarCropper()
  $.ajax
    type: 'GET'
    url: '/all_users'
    dataType: 'json'
    success: (d) ->
      atWho d.response
      return
    error: (e) ->
      result = 'error'
  $(document).on 'click', '.retweet_link', ->
    $("#modal_#{this.id}").modal('toggle')
  $(document).on 'click', '.comment_link', ->
    $("#modal_#{this.id}").modal('toggle')
  $('.slider').bxSlider
    ticker: true
    speed: 45000
    minSlides: 1
    maxSlides: 20
    slideWidth: 250
    slideMargin: 0
    tickerHover: true
    # shrinkItems: true
    responsive: false

  $('.slider_knowledge_stream').bxSlider
    ticker: true
    speed: 35000
    minSlides: 1
    maxSlides: 20
    slideWidth: 100
    slideMargin: 0
    tickerHover: true
    # shrinkItems: true
    responsive: false

  $('.slider_funding_stream').bxSlider
    ticker: true
    speed: 85000
    minSlides: 1
    maxSlides: 10
    slideWidth: 250
    slideMargin: 0
    tickerHover: true
    # shrinkItems: true
    responsive: false

class AvatarCropper
  constructor: ->
    $('#cropbox').Jcrop
      aspectRatio: 1
      setSelect: [0, 0, 600, 600]
      onSelect: @update
      onChange: @update
      keySupport: false

  update: (coords) =>
    $('#user_crop_x').val(coords.x)
    $('#user_crop_y').val(coords.y)
    $('#user_crop_w').val(coords.w)
    $('#user_crop_h').val(coords.h)
    @updatePreview(coords)

  updatePreview: (coords) =>
    $('#preview').css
        width: Math.round(100/coords.w * $('#cropbox').width()) + 'px'
        height: Math.round(100/coords.h * $('#cropbox').height()) + 'px'
        marginLeft: '-' + Math.round(100/coords.w * coords.x) + 'px'
        marginTop: '-' + Math.round(100/coords.h * coords.y) + 'px'

atWho = (val) ->
  $('.retweet, #post_content, .home_page_search').atwho(
    at: '$'
    data: [
      'BTC'
      'ETH'
      'EOS'
      'BCH'
      'TRX'
      'LTC'
      'XRP'
      'ETC'
      'CTXC'
      'DASH'
      'ADA'
      'ONT'
      'IOT'
      'NEO'
      'XLM'
      'QTUM'
      'BNB'
      'HT'
      'XMR'
      'ZEC'
      'DGB'
    ]).atwho
    at: '@'
    data: val
