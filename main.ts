input.onButtonPressed(Button.A, function () {
    pins.digitalWritePin(DigitalPin.P8, 0)
})
input.onButtonPressed(Button.B, function () {
    pins.digitalWritePin(DigitalPin.P8, 1)
})
function updateHumidityAnndTemp () {
	
}
let humidity = 0
let Temp = 0
let list3: number[] = []
let optimumtemp = 40
let minimumHumidty = 20
let optimumhumdity = 60
led.enable(true)
basic.forever(function () {
	
})
basic.forever(function () {
    serial.writeValue("temperature(C)", Temp)
    serial.writeValue("realTemp", input.temperature())
    serial.writeValue("humidity(%)", humidity)
    Temp = Math.idiv(300 * pins.analogReadPin(AnalogPin.P3), 3069) / 2.5
    humidity = pins.analogReadPin(AnalogPin.P0) / 5
    if (humidity >= optimumhumdity) {
        pins.digitalWritePin(DigitalPin.P1, 1)
        pins.digitalWritePin(DigitalPin.P2, 0)
        pins.digitalWritePin(DigitalPin.P13, 0)
    } else if (minimumHumidty >= humidity && humidity >= optimumhumdity) {
        pins.digitalWritePin(DigitalPin.P1, 0)
        pins.digitalWritePin(DigitalPin.P2, 1)
        pins.digitalWritePin(DigitalPin.P13, 0)
    } else {
        pins.digitalWritePin(DigitalPin.P1, 0)
        pins.digitalWritePin(DigitalPin.P2, 0)
        pins.digitalWritePin(DigitalPin.P13, 1)
    }
    if (humidity < minimumHumidty) {
        while (minimumHumidty >= humidity) {
            serial.writeValue("humidity(%)", humidity)
            pins.digitalWritePin(DigitalPin.P8, 1)
            basic.pause(100)
            humidity = pins.analogReadPin(AnalogPin.P0) / 4
        }
        pins.digitalWritePin(DigitalPin.P8, 0)
    } else if (Temp > optimumtemp) {
        while (minimumHumidty >= humidity) {
            serial.writeValue("humidity(%)", humidity)
            pins.digitalWritePin(DigitalPin.P8, 1)
            basic.pause(100)
            humidity = pins.analogReadPin(AnalogPin.P0) / 4
        }
    }
})
