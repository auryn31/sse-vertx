package com.example.reactive.reactive_vertx.service

import io.reactivex.Observable
import java.time.LocalDateTime
import java.util.concurrent.TimeUnit

class TimeProducer {

  companion object {
    val instance = TimeProducer()
  }

  val obs = Observable.interval(1, TimeUnit.SECONDS)
    .map { LocalDateTime.now() }.share()

}
