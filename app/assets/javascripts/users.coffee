# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/
$(document).on 'ready page:load', (event) ->
  $('#user_role').bootstrapToggle
      on:   'Yes'
      off:  'No'
      size: 'small'
  $(document).on 'click', '.mod-check', ->
    console.log 'asd'
    console.log $('#user_role').val()
    if $('#user_role').val() == 'user'
      $('#user_role').val('moderator')
      $('.moderator_fields').removeClass('hide')
      $('.actions').addClass('padding-top-20')
      $("#why_moderator").prop('required',true)
      $("#user_resume").prop('required',true)
    else
      $('#user_role').val('user')
      $('.moderator_fields').addClass('hide')
      $('.actions').removeClass('padding-top-20')
      $("#why_moderator").prop('required',false)
      $("#user_resume").prop('required',false)
