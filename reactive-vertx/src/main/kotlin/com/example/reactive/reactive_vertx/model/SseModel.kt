package com.example.reactive.reactive_vertx.model

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
