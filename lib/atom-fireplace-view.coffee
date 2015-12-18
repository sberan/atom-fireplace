flame = require('./flame.js');

module.exports =
class AtomFireplaceView
  constructor: (serializedState) ->
    # Create root element
    @element = document.createElement('div')
    @element.classList.add('fireplace-container')

    # Create message element
    canvas = document.createElement('canvas')
    canvas.id = 'fireplace-panel';
    canvas.width =370
    canvas.height=175

    @element.appendChild(canvas)

    flame()

  # Returns an object that can be retrieved when package is activated
  serialize: ->

  # Tear down any state and detach
  destroy: ->
    @element.remove()

  getElement: ->
    @element
