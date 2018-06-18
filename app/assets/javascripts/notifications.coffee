# # Place all the behaviors and hooks related to the matching controller here.
# # All this logic will automatically be available in application.js.
# # You can use CoffeeScript in this file: http://coffeescript.org/

$(document).on 'ready page:load', (event) ->
  class Notifications
    if $('#nav-user')[0]
      $.ajax(
          url: '/notifications.json'
          dataType: 'JSON'
          method: 'GET'
          success: (data) ->
            items = $.map data, (notification) ->
              notification.template
            if items.length > 0
              $("[data-behavior='unread-count']").text(items.length)
              $("[data-behavior='notification-items']").append(items)
        )
    # notifications = $("[data-behavior='notifications']")
    # if notifications.length > 0
