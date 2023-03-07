def updateTraficLights(list2: List[number]):
    # this should be the green light
    if pins.digital_read_pin(DigitalPin.P2) != list2[0]:
        pins.digital_write_pin(DigitalPin.P1, list2[0])
    # this should ne yellow
    if pins.digital_read_pin(DigitalPin.P2) != list2[1]:
        pins.digital_write_pin(DigitalPin.P1, list2[1])
    # this should be red
    if pins.digital_read_pin(DigitalPin.P16) != list2[2]:
        pins.digital_write_pin(DigitalPin.P2, list2[2])
def updateHumidityAnndTemp():
    global Temp, humidity
    Temp = Math.idiv(300 * pins.analog_read_pin(AnalogPin.P4), 3069) / 2.5
    humidity = pins.analog_read_pin(AnalogPin.P0) / 4
list3: List[number] = []
humidity = 0
Temp = 0
optimumtemp = 0
minimumHumidty = 20
optimumhumdity = 60
led.enable(True)

def on_forever():
    pass
basic.forever(on_forever)

def on_forever2():
    global list3
    updateHumidityAnndTemp()
    basic.pause(100)
    serial.write_value("temperature(C)", Temp)
    serial.write_value("realTemp", input.temperature())
    serial.write_value("humidity(%)", humidity)
    if humidity >= optimumhumdity:
        list3 = [1, 0, 0]
        updateTraficLights(list3)
    elif minimumHumidty >= humidity and humidity >= optimumhumdity:
        list3 = [0, 1, 0]
        updateTraficLights(list3)
    else:
        list3 = [0, 0, 1]
        updateTraficLights(list3)
    basic.pause(1000)
basic.forever(on_forever2)
