import React from 'react'

export default function redirect() {
  React.useEffect(() => {
    ;(function () {
      var app = {
        launchApp: function () {
          window.location.replace('zaychin://')
          this.timer = setTimeout(this.openWebApp, 1000)
        },

        openWebApp: function () {
          window.location.replace('http://google.com/')
        },
      }

      app.launchApp()
    })()
  }, [])

  return <div>Loading...</div>
}
