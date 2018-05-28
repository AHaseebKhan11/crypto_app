# $(document).on 'ready page:load', (event) ->
#   if $('#graph_container')[0]
#     current_url = url = new URL(window.location.href)
#     $.ajax
#       type: "GET"
#       url: '/graphs'
#       data: { type: current_url.searchParams.get("type") }
#       dataType: 'json'
#       success: (d) ->
#         $('.loader').fadeOut(1000);
#         $('.loading_container').addClass('hide')
#         Highcharts.chart 'graph_container',
#           title: text: "#{d.coin} Chart"
#           subtitle: text: 'Monthly'
#           yAxis: title: text: "Dollars ($)"
#           xAxis:
#             type: 'datetime'
#             dateTimeLabelFormats: day: '%e of %b'
#           legend:
#             layout: 'vertical'
#             align: 'right'
#             verticalAlign: 'middle'
#           plotOptions: series:
#             label: connectorAllowed: false
#           series: [
#             {
#               name: "#{d.coin}"
#               data: d.response
#             }
#           ]
#           responsive: rules: [ {
#             chartOptions: legend:
#               layout: 'horizontal'
#               align: 'center'
#               verticalAlign: 'bottom'
#           } ]

#       error: (e) ->
#         console.log 'error'

