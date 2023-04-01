export default class Timer {
  _context = {
    target: 0,
    elapsed: 0,
    status: "UNINITIALISED",
  }

  _tickEventsList = []
  _onStopEventList = []

  _intervalRef = null

  constructor(target) {
    this._context.target = target
    this._context.status = "READY"
  }

  _tick() {
    this._context.elapsed++
    Promise.all(this._tickEventsList.map((fn) => fn(this.getContext())))

    if (this._context.elapsed >= this._context.target) {
      this.stop()
    }
  }

  start() {
    this._context.status = "RUNNING"
    this._intervalRef = setInterval(() => this._tick(), 1000)
  }

  pause() {
    this._context.status = "PAUSED"
    clearInterval(this._intervalRef)
  }

  stop() {
    this._context.status = "FINISHED"
    clearInterval(this._intervalRef)
    Promise.all(this._onStopEventList.map((fn) => fn(this.getContext())))
  }

  reset() {
    this._context.elapsed = 0
  }

  getContext() {
    return { ...this._context }
  }

  addTickEvent(e) {
    this._tickEventsList.push(e)
  }

  addOnStopEvent(e) {
    this._onStopEventList.push(e)
  }
}

/*
function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time))
}

async function doDelay() {
  console.log("start timer")
  await delay(3000)
  console.log("after 1 second")
}

console.log("hi")

const timer = new Timer(5)

timer.addTickEvent(async function (ctx) {
  console.log("D S")
  doDelay()
  console.log("D END")
})

timer.addTickEvent(async function (ctx) {
  console.log(ctx.elapsed + " / " + ctx.target)
})
timer.addTickEvent(async function (ctx) {
  console.log("HELA RE")
})

timer.start()
*/
