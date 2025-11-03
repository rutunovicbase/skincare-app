package com.skincarenb.app.services

import android.app.Service
import android.content.Intent
import android.os.IBinder
import io.wazo.callkeep.RNCallKeepModule

class CallKeepService : Service() {
    override fun onBind(intent: Intent?): IBinder? = null

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        return START_STICKY
    }

    override fun onTaskRemoved(rootIntent: Intent?) {
        super.onTaskRemoved(rootIntent)
        // Stop the service when the app is removed from recent apps
        stopSelf()
    }
}
