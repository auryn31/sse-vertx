package com.example.reactive.reactive_vertx.handler

import com.example.reactive.reactive_vertx.model.SseModel
import com.example.reactive.reactive_vertx.service.TimeProducer
import io.reactivex.Scheduler
import io.vertx.core.Handler
import io.vertx.ext.web.RoutingContext

class TimeHandler : Handler<RoutingContext> {

  override fun handle(rtx: RoutingContext) {
    val response = rtx.response()
    response.setChunked(true)

    response.headers().add("Content-Type", "text/event-stream;charset=UTF-8")
    response.headers().add("Connection", "keep-alive")
    response.headers().add("Cache-Control", "no-cache")
    response.headers().add("Access-Control-Allow-Origin", "*")


    val flow = TimeProducer.instance.obs

    flow.subscribe({
      println("the current time is $it called from ${rtx.request().remoteAddress()}")
      response.write(SseModel(data = "the current time is $it", event = "time").toString())
    }, ::println, {
      response.end()
    })


  }

}
