/*{
  "type": "library",
  "targets": ["omnigraffle", "omnifocus", "omniplan", "omnioutliner"],
  "identifier": "Eric Fledderman",
  "version": "0.1",
  "description": "A collection of commonly used functions for use with Omni-Automation Scripts"
}*/


/**
 * @file A collection of commonly used functions for use with Omni-Automation Scripts
 * 
 * @author Eric Fledderman <ericfledderman@me.com>
 * @version 0.1
 */


 (() => {
  const prefs = new Preferences()

  const lib = new PlugIn.Library(new Version('0.1'))


  /**
   * Returns the value of a specified action preference 
   * 
   * @param {string} action - Name of the action with the desired preference
   * @param {string} pref - Name of the action's desired preference
   *  
   * @returns {boolean|date|number|string} Value of the specified action preference
   */
  lib.all_pref_get = (action, pref) => prefs.read(`${ action }_${ pref }`)


  /**
   * Returns a tag, creating it if it doesn't already exist
   * 
   * @param {object[]} breadcrumbs - Hierarchy for new tag
   * 
   * @returns {object} Instance of tag
   */
  lib.of_tag_getOrCreate = breadcrumbs => {
    let tag = flattenedTags.byName(breadcrumbs[0]) || new Tag(breadcrumbs[0])

    if (breadcrumbs.length > 1) {
      breadcrumbs.forEach((breadcrumb, index) => {
        if (index > 0) {
          tag = tag.flattenedTags.byName(breadcrumb) || new Tag(breadcrumb, tag.ending)
        }
      })
    }

    return tag
  }


  return lib
})()
