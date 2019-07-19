# Server Sent Events with vert.x

In [dem](https://medium.com/@aengel/server-sent-events-vs-json-stream-3a9f472120a4) Beitrag verglich ich Server-Sent Events (SSE) mit Json-Stream. Nun will ich dir zeigen, wie du ganz einfach mit Boardmitteln von vert.x, einen SSE-Endpunkt entwickelst.

Im ersten Schritt erstellen wir uns ein Model, welches die Struktur von SSE hat und die Daten später bereitstellt.

Die `toString` Methode überschreiben wir, um später die Struktur eines SSE zu bekommen.

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

Um Daten an den Client zu senden, erstellen wir uns einen Producer. Hier werden wir ein Shared-Observable erstellen, was einfach jede Sekunde einen Timestamp an alle registierten Observables sendet.

```kotlin
class TimeProducer {

  companion object {
    val instance = TimeProducer()
  }

  val obs = Observable.interval(1, TimeUnit.SECONDS)
    .map { LocalDateTime.now() }.share()
}
```

Im dritten Schritt erstellen wir uns einen Response-Handler, welcher sich auf das Observable registriert und die Daten an den Client sendet.

```kotlin
class TimeHandler : Handler<RoutingContext> {

  override fun handle(rtx: RoutingContext) {
    val response = rtx.response()
    response.setChunked(true)

    response.headers().add("Content-Type", "text/event-stream;charset=UTF-8")
    response.headers().add("Connection", "keep-alive")
    response.headers().add("Cache-Control", "no-cache")
    response.headers().add("Access-Control-Allow-Origin", "*")

    val flow = TimeProducer.instance.obs

    val disposal = flow.subscribe({
      response.write(SseModel(data = "the current time is $it", event = "time").toString())
    }, ::println, {
      response.end()
    })

    response.closeHandler{
      disposal.dispose()
    }

  }
}
```

Im letzten Schritt gegistrieren wir noch eine Route und können dann den SSE Endpunkt verwenden.

```kotlin
router.route("/time")
    .handler(TimeHandler())
    .failureHandler {
        println("car error asynchron response\n")
        it.response().end("time error asynchron response\n")
    }
```

Nun können wir auch schon den Endpunkt ansprechen und bekommen einen unendlichen SSE response mit dem Zeitstempel des Servers.

`curl localhost:8080/time`

Die Antwort sieht dann folgendermaßen aus:

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

Vielen Dank fürs lesen des Artikels, ich hoffe du kannst damit schnell und einfach SSE-Endpunkte mit `vert.x` und `Kotlin` erstellen. Hat dir der Artikel gefallen, lass mir gern Applaus da.
