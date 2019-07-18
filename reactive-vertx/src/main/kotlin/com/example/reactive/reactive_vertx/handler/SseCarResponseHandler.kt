package com.example.reactive.reactive_vertx.handler

import com.beust.klaxon.Klaxon
import com.example.reactive.reactive_vertx.TIMEOUT
import com.example.reactive.reactive_vertx.model.SseModel
import com.example.reactive.service.DataService
import io.reactivex.BackpressureStrategy
import io.reactivex.Flowable
import io.vertx.core.Handler
import io.vertx.ext.web.RoutingContext

class SseCarResponseHandler : Handler<RoutingContext> {

  override fun handle(rtx: RoutingContext) {
    val response = rtx.response()
    response.setChunked(true)

    response.headers().add("Content-Type", "text/event-stream;charset=UTF-8")
    response.headers().add("Connection", "keep-alive")
    response.headers().add("Cache-Control", "no-cache")
    response.headers().add("Access-Control-Allow-Origin", "*")


    val flow: Flowable<String> = DataService.getDataStream(TIMEOUT).map { Klaxon().toJsonString(it) }.toFlowable(BackpressureStrategy.BUFFER)

    val disposal = flow.subscribe({
      response.write(SseModel(data = it, event = "newCar").toString())

    }, ::println, {
      response.write(SseModel(event = "done").toString())
      response.end()
    })

    response.closeHandler{
      disposal.dispose()
    }

  }

}
