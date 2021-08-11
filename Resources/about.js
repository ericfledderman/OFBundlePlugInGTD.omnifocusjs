/*{
  "type": "action",
  "targets": ["omnifocus"],
  "author": "Eric Fledderman",
  "identifier": "com.ericfledderman.of.gtd-about",
  "description": "About Window for OmniFocus GTD PlugIn",
  "label": "About",
  "shortLabel": "About",
  "paletteLabel": "About",
  "image": "questionmark.circle"
}*/


/**
 * @file About Window for OmniFocus GTD PlugIn
 * 
 * @author Eric Fledderman <ericfledderman@me.com>
 * @version 0.1
 */


(() => {
  const action = new PlugIn.Action(() => {
    try {
      const oaui = action.plugIn.library('OAUI')

      oaui.alert_about(action.plugIn)
    } catch (error) { console.error(error) }
  })

  // Validate
  action.validate = () => true

  // Return
  return action
})()
