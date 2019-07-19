# Server Sent Events with vert.x

In [the](https://medium.com/@aengel/server-sent-events-vs-json-stream-3a9f472120a4) article I compared Server-Sent Events (SSE) with Json-Stream. Now I want to show you how to easily develop an SSE endpoint with board resources from `vert.x`.

In the first step we create a model, which has the structure of SSE and provides the data later.

We overwrite the `toString` method to get the structure of an SSE.

```kotlin
data class SseModel(val event: String? = null, val data: String = "", val id: String? = null, val retry: Number? = null) {

  override fun toString(): String {
    val sseStrings = arrayListOf<String>()

    if(event != null) sseStrings.add("event: $event")
    sseStrings.add("data: $data")
    if(id != null) sseStrings.add("id: $id")
    if(retry != null) sseStrings.add("retry: $retry")
    sseStrings.add("\n")

    return sseStrings.joinToString(separator = "\n")
  }
}
```

To send data to the client, we create a producer. Here we will create a shared observable, which simply sends a timestamp to all registered observables every second.

```kotlin
class TimeProducer {

  // create singleton
  companion object {
    val instance = TimeProducer()
  }

  // create public observable
  val obs = Observable.interval(1, TimeUnit.SECONDS)
    .map { LocalDateTime.now() }.share()
}
```

In the third step we create a response handler, which registers itself on the observable and sends the data to the client.

```kotlin
class TimeHandler : Handler<RoutingContext> {

  override fun handle(rtx: RoutingContext) {
    val response = rtx.response()
    response.setChunked(true)

    // set headers
    response.headers().add("Content-Type", "text/event-stream;charset=UTF-8")
    response.headers().add("Connection", "keep-alive")
    response.headers().add("Cache-Control", "no-cache")
    response.headers().add("Access-Control-Allow-Origin", "*")

    val flow = TimeProducer.instance.obs

    // subscribe to the public timer observable
    val disposal = flow.subscribe({
      response.write(SseModel(data = "the current time is $it", event = "time").toString())
    }, ::println, {
      response.end()
    })

    // stop observing it the pipe is broken
    response.closeHandler{
      disposal.dispose()
    }

  }
}
```

In the last step we register another route and can then use the SSE endpoint.

```kotlin
router.route("/time")
    .handler(TimeHandler())
    .failureHandler {
        it.response().end("time error asynchron response\n")
    }
```

Now we can address the endpoint and get an infinite SSE response with the time stamp of the server.

`curl localhost:8080/time`

The response is as follows:

```bash
event: time
data: the current time is 2019-07-19T11:15:34.307425

event: time
data: the current time is 2019-07-19T11:15:35.307430

event: time
data: the current time is 2019-07-19T11:15:36.307562

event: time
data: the current time is 2019-07-19T11:15:37.310418

event: time
data: the current time is 2019-07-19T11:15:38.311260
```

Thanks for reading the article, I hope you can create SSE endpoints with `vert.x` and `Kotlin` quickly and easily. If you liked the article, leave me some applause.

Link to [medium](https://medium.com/@aengel/howto-server-sent-events-with-vert-x-76750575a142).
