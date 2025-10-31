package com.skincarenb.app

import android.app.Activity
import android.app.PictureInPictureParams
import android.util.Rational
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.DeviceEventManagerModule

class PipModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    companion object {
        var isInVideoCall: Boolean = false
        var pipModuleInstance: PipModule? = null
    }

    init {
        pipModuleInstance = this
    }

    override fun getName(): String {
        return "PipModule"
    }

    fun sendPipModeChanged(isInPipMode: Boolean) {
        reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit("onPipModeChanged", isInPipMode)
    }

    @ReactMethod
    fun enterPipMode() {
        val activity: Activity? = currentActivity
        activity?.let {
            val params = PictureInPictureParams.Builder()
                .setAspectRatio(Rational(9, 16))
                .build()
            it.enterPictureInPictureMode(params)
        }
    }

    @ReactMethod
    fun enablePip() {
        isInVideoCall = true
    }

    @ReactMethod
    fun disablePip() {
        isInVideoCall = false
    }
}
