package com.skincarenb.app

import android.app.Activity
import android.app.ActivityManager
import android.content.Context
import android.os.Process
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class AppTerminationModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "AppTermination"
    }

    @ReactMethod
    fun exitApp() {
        val activity = currentActivity
        if (activity != null) {
            // First, finish the activity
            activity.finishAndRemoveTask()
            
            // Then kill the process
            Process.killProcess(Process.myPid())
            System.exit(0)
        }
    }
}
