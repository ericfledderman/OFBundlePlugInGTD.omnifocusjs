/*{
  "type": "action",
  "targets": ["omnifocus"],
  "author": "Eric Fledderman",
  "identifier": "com.ericfledderman.of.gtd-preferences",
  "description": "Preferences Window for OmniFocus GTD PlugIn",
  "label": "Preferences",
  "shortLabel": "Preferences",
  "paletteLabel": "Preferences",
  "image": "gearshape"
}*/


/**
 * @file Preferences Window for OmniFocus GTD PlugIn
 * 
 * @author Eric Fledderman <ericfledderman@me.com>
 * @version 0.1
 */


(() => {
  const action = new PlugIn.Action(() => {
    try {
      const oaui = action.plugIn.library('OAUI')

      oaui.form_preferences(action.plugIn)
    } catch (error) { console.error(error) }
  })

  // Validate
  action.validate = () => true

  // Return
  return action
})()
