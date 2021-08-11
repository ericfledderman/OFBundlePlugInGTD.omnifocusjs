/*{
  "type": "library",
  "targets": ["omnigraffle", "omnifocus", "omniplan", "omnioutliner"],
  "identifier": "com.ericfledderman.all.oaui",
  "author": "Eric Fledderman",
  "version": "0.1",
  "description": "A collection of commonly used functions for managing UI with Omni-Automation Scripts"
}*/


/**
 * @file A collection of commonly used functions for managing UI with Omni-Automation Scripts'
 * 
 * @author Eric Fledderman <ericfledderman@me.com>
 * @version 0.1
 */


 (() => {
  const prefs = new Preferences()

  const lib = new PlugIn.Library(new Version('0.1'))

  /**
   * Displays the plugin bundles About Window
   * 
   * @param {object} plugIn - Instance of the PlugIn Bundle
   */
  lib.alert_about = plugIn => {
    try {
      const message = () => {
        let msg = plugIn.description
  
        msg += `\n\nVersion ${ plugIn.version.versionString }`
        msg += `\n${ plugIn.identifier }`
        msg += `\n\nAUTHOR`
        msg += `\n${ plugIn.author }`
        msg += `\n\nLIBRARIES`
  
        plugIn.libraries.forEach(library => {
          msg += `\n${ library.name } v${ library.version.versionString }`
        })
  
        return msg
      }
  
      const config = {
        title   : `About | PlugIn [${ plugIn.displayName }]`,
        message : message()
      }

      lib.alert_show(config)
    } catch (error) { console.error(error) }
  }


  /**
   * Displays Alert Window based on the supplied config object
   * 
   * @param {object} config - Alert window configurations 
   * 
   * @returns {number} User selection index
   */
  lib.alert_show = config => {
    try {
      const { action, message, options = [ 'OK' ] , plugIn } = config
  
      const title = `${ action } | PlugIn [${ plugIn.displayName }]`

      const alert = new Alert(title, message)

      options.forEach((option, index) => {
        if (index > 2) alert.addOption(option)
      })

      const promise = alert.show().then(selection => selection)

      return promise
    } catch (error) { console.error(error) }
  }


  /**
   * Logs the PlugIn Bundle meta-data to the console
   */
  lib.console_info = () => {
    try {
      const props = Object.getOwnPropertyNames(lib)

      props.forEach((prop, index) => {
        if (index !==0) console.log(' ')
  
        console.log('•', prop)
  
        const item = lib[prop]
  
        switch (typeof item) {
          case 'string' :
            console.log(item)
            break
  
          case 'function' :
            console.log(item.toString())
            break
  
          case 'object' :
            switch (true) {
              case (item instanceof Version) :
                console.log(item.versionString)
                break
  
              case (item instanceof PlugIn) :
                console.log(item.identifier)
                break
  
              default :
                console.error('Unknown object type of library info object')
            }
            break
  
          default :
            console.error('Unknownobject type of library info object')
        }
      })
    } catch (error) { console.error(error) }
  }


  /**
   * Displays the plugin bundles Preferences Window
   * 
   * @param {object} plugIn - Instance of the PlugIn Bundle
   * 
   * @returns
   */
  lib.form_preferences = plugIn => {
    try {
      const mainMenu = () => {
        const config = {
          title : `Preferences | PlugIn [${ plugIn.displayName }]
          \nSelect the preference panes to view:
          `,
          button  : 'Continue',
          fields  : [
            { id : 'checkbox_whatsNext', label : 'What\'s Next?', value : false }
          ]
        }

        return lib.form_show(config)
      }

      letmainMenu()
    } catch (error) { console.error(error) }
  }


  /**
   * 
   * 
   * @param {object} config 
   * 
   * @returns 
   */
  lib.form_show = config => {
    try {
      const { button = 'Save', fields = [], title } = config

      const form  = new Form()

      fields.forEach(field => {
        const { id, label, value = null, values = [] } = field

        indexes = []
        options = []

        values.forEach((val, index) => {
          indexes.push(index)
          options.push(val)
        })

        switch (id.split('_')[0]) {
          case 'checkbox' :
            form.addField(new Form.Field.Checkbox(id, label, value))
            break

          case 'date' :
            form.addField(new Form.Field.Date(id, label, value))
            break

          case 'radio' :
            form.addField(new Form.Field.Option(id, label, indexes, options, value))
            break

          case 'select' :
            form.addField(new Form.Field.MultipleOptions(id, label, indexes, options, value))
            break

          case 'string' : 
          default :
            form.addField(new Form.Field.String(id, label, value))
        }
      })

      const promise = form.show(title, button)

      form.validate = input => {

      }

      promise.catch(error => console.error(error))
      
      const response = promise.then(result => result)

      return response
    } catch (error) { console.error(error) }
  }


  return lib
})()
