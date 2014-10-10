{WorkspaceView} = require 'atom'
DAOGenarater = require '../lib/d-a-o-genarater'

# Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
#
# To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
# or `fdescribe`). Remove the `f` to unfocus the block.

describe "DAOGenarater", ->
  activationPromise = null

  beforeEach ->
    atom.workspaceView = new WorkspaceView
    activationPromise = atom.packages.activatePackage('d-a-o-genarater')

  describe "when the d-a-o-genarater:toggle event is triggered", ->
    it "attaches and then detaches the view", ->
      expect(atom.workspaceView.find('.d-a-o-genarater')).not.toExist()

      # This is an activation event, triggering it will cause the package to be
      # activated.
      atom.workspaceView.trigger 'd-a-o-genarater:toggle'

      waitsForPromise ->
        activationPromise

      runs ->
        expect(atom.workspaceView.find('.d-a-o-genarater')).toExist()
        atom.workspaceView.trigger 'd-a-o-genarater:toggle'
        expect(atom.workspaceView.find('.d-a-o-genarater')).not.toExist()
