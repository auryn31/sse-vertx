package com.example.reactive.reactive_vertx

import com.example.reactive.reactive_vertx.handler.SseCarResponseHandler
import com.example.reactive.reactive_vertx.handler.TimeHandler
import io.vertx.core.AbstractVerticle
import io.vertx.core.Future
import io.vertx.ext.web.Router
import io.vertx.ext.web.handler.StaticHandler

const val TIMEOUT = 1000L

class MainVerticle : AbstractVerticle() {

  override fun start(startFuture: Future<Void>) {

    val startTime = System.currentTimeMillis()

    val server = vertx.createHttpServer()

    val router = Router.router(vertx)

    router.route()
      .handler(StaticHandler.create())
      .failureHandler {
        println("fooo cannot find this shit\n")
        it.response().end("time error asynchron response\n")
      }

    router.route("/sse")
      .handler(SseCarResponseHandler())
      .failureHandler {
        println("car error asynchron response\n")
        it.response().end("car error asynchron response\n")
      }

    router.route("/time")
      .handler(TimeHandler())
      .failureHandler {
        println("time error asynchron response\n")
        it.response().end("time error asynchron response\n")
      }

    server.requestHandler(router).listen(8080) { http ->
      if (http.succeeded()) {
        startFuture.complete()
        val startTimeDone = System.currentTimeMillis() - startTime
        println("HTTP server started on port 8080 in $startTimeDone ms on event loop thread ${Thread.currentThread()}")
      } else {
        startFuture.fail(http.cause());
      }
    }
  }
}
