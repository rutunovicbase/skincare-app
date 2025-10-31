package com.skincarenb.app

import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import android.app.PictureInPictureParams
import android.util.Rational
import android.content.res.Configuration

class MainActivity : ReactActivity() {

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(null)
  }

  override fun getMainComponentName(): String = "MyProject"

  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

  override fun onUserLeaveHint() {
    // Only enter PiP mode if user is in a video call
    if (PipModule.isInVideoCall) {
      val params = PictureInPictureParams.Builder()
          .setAspectRatio(Rational(9, 16))
          .build()
      enterPictureInPictureMode(params)
    }
  }

  override fun onPictureInPictureModeChanged(isInPictureInPictureMode: Boolean, newConfig: Configuration) {
    super.onPictureInPictureModeChanged(isInPictureInPictureMode, newConfig)
    // Notify React Native about PIP mode change
    PipModule.pipModuleInstance?.sendPipModeChanged(isInPictureInPictureMode)
  }
}
