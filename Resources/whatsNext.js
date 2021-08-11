/*{
  "type": "action",
  "targets": ["omnifocus"],
  "author": "Eric Fledderman",
  "identifier": "com.ericfledderman.of.gtd-whatsNext",
  "description": "'What's Next' Action for OmniFocus GTD PLugIn",
  "label": "What's Next?",
  "shortLabel": "What's Next?",
  "paletteLabel": "What's Next?",
  "image": "calendar.circle"
}*/


/**
 * @file "What's Next" Action for OmniFocus GTD PlugIn
 * 
 * @author Eric Fledderman <ericfledderman@me.com>
 * @version 0.1
 */


(() => {
  const prefs = new Preferences()

  const action = new PlugIn.Action(() => {
    try {
      const oaui    = action.plugIn.library('OAUI')
      const oautils = action.plugIn.library('OAUtils')

      const labels = {
        group : oautils.all_pref_get('whatsNext', 'tagGroupLevel') || 'What\'s Next?',
        q1    : oautils.all_pref_get('whatsNext', 'tagQ1Label')    || 'Due First',
        q2    : oautils.all_pref_get('whatsNext', 'tagQ2Label')    || 'Schedule',
        q3    : oautils.all_pref_get('whatsNext', 'tagQ3Label')    || 'Delegate',
        q4    : oautils.all_pref_get('whatsNext', 'tagQ4Label')    || 'Evaluate'
      }

      const tags = {
        group : oautils.of_tag_getOrCreate([ labels.group ]),
        q1    : oautils.of_tag_getOrCreate([ labels.group, labels.q1 ]),
        q2    : oautils.of_tag_getOrCreate([ labels.group, labels.q2 ]),
        q3    : oautils.of_tag_getOrCreate([ labels.group, labels.q3 ]),
        q4    : oautils.of_tag_getOrCreate([ labels.group, labels.q4 ])
      }

      flattenedTasks.forEach(task => {
        task.removeTags([ tags.q1, tags.q2, tags.q3, tags.q4 ])
      })

      flattenedTasks.forEach(task => {
        switch (true) {
          case (task.flagged && task.taskStatus === (Task.Status.DueSoon || Task.Status.Overdue)) :
            task.addTag(tags.q1)
            break

          case (task.taskStatus === (Task.Status.DueSoon || Task.Status.Overdue)) :
            task.addTag(tags.q2)
            break

          case (task.flagged) :
            task.addTag(tags.q3)
            break

          default :
            task.addTag(tags.q4)
        }
      })

      oaui.alert_show({
        action  : 'What\'s Next?',
        plugIn  : action.plugIn,
        message : 'DONE'
      })
    } catch (error) { console.error(error) }
  })

  // Validate
  action.validate = () => true

  // Return
  return action
})()
