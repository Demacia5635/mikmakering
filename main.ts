function updateTraficLights (list2: number[]) {
    // this should be the green light
    if (pins.digitalReadPin(DigitalPin.P2) != list2[0]) {
        pins.digitalWritePin(DigitalPin.P2, list2[0])
    }
    // this should ne yellow
    if (pins.digitalReadPin(DigitalPin.P3) != list2[1]) {
        pins.digitalWritePin(DigitalPin.P3, list2[1])
    }
    // this should be red
    if (pins.digitalReadPin(DigitalPin.P4) != list2[2]) {
        pins.digitalWritePin(DigitalPin.P4, list2[2])
    }
}
function updateHumidityAnndTemp () {
    Temp = Math.idiv(300 * pins.analogReadPin(AnalogPin.P1), 1023)
    humidity = pins.analogReadPin(AnalogPin.P0) / 5
}
let humidity = 0
let Temp = 0
let list3 = [0, 1]
let optimumtemp = 0
let minimumHumidty = 0
let optimumhumdity = 0
led.enable(true)
basic.forever(function () {
    if (humidity >= optimumhumdity) {
        list3 = [1, 0, 0]
        updateTraficLights(list3)
    } else if (minimumHumidty >= humidity && humidity >= optimumhumdity) {
        list3 = [0, 1, 0]
        updateTraficLights(list3)
    } else {
        list3 = [0, 0, 1]
        updateTraficLights(list3)
    }
})
basic.forever(function () {
    updateHumidityAnndTemp()
    serial.writeValue("temperature(C)", Temp)
    serial.writeValue("humidity(%)", humidity)
    if (humidity < minimumHumidty) {
        while (humidity >= optimumhumdity) {
            pins.digitalWritePin(DigitalPin.P5, 1)
            basic.pause(1000)
            pins.digitalWritePin(DigitalPin.P5, 0)
        }
    } else if (Temp < optimumtemp) {
        while (humidity >= optimumhumdity / 2) {
            pins.digitalWritePin(DigitalPin.P5, 1)
            basic.pause(1000)
            pins.digitalWritePin(DigitalPin.P5, 0)
        }
    }
})
