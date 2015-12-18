AtomFireplaceView = require './atom-fireplace-view'
{CompositeDisposable} = require 'atom'

module.exports = AtomFireplace =
  atomFireplaceView: null
  modalPanel: null
  subscriptions: null

  activate: (state) ->
    @atomFireplaceView = new AtomFireplaceView(state.atomFireplaceViewState)
    @modalPanel = atom.workspace.addModalPanel(item: @atomFireplaceView.getElement(), visible: false)

    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable

    # Register command that toggles this view
    @subscriptions.add atom.commands.add 'atom-workspace', 'atom-fireplace:toggle': => @toggle()

  deactivate: ->
    @modalPanel.destroy()
    @subscriptions.dispose()
    @atomFireplaceView.destroy()

  serialize: ->
    atomFireplaceViewState: @atomFireplaceView.serialize()

  toggle: ->
    console.log 'AtomFireplace was toggled!'

    if @modalPanel.isVisible()
      @modalPanel.hide()
    else
      @modalPanel.show()
