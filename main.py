def updateTraficLights(list2: List[number]):
    # this should be the green light
    if pins.digital_read_pin(DigitalPin.P2) != list2[0]:
        pins.digital_write_pin(DigitalPin.P2, list2[0])
    # this should ne yellow
    if pins.digital_read_pin(DigitalPin.P3) != list2[1]:
        pins.digital_write_pin(DigitalPin.P3, list2[0])
    # this should be red
    if pins.digital_read_pin(DigitalPin.P4) != list2[1]:
        pins.digital_write_pin(DigitalPin.P4, list2[0])
def updateHumidityAnndTemp():
    global Temp, humidity
    Temp = Math.idiv(300 * pins.analog_read_pin(AnalogPin.P1), 1023)
    humidity = pins.analog_read_pin(AnalogPin.P0) / 5
list3: List[number] = []
humidity = 0
Temp = 0
minimumHumidty = 0
optimumhumdity = 0
optimumtemp = 0
led.enable(True)

def on_forever():
    global list3
    if humidity >= optimumhumdity:
        list3 = [1, 0, 0]
        updateTraficLights(list3)
    elif minimumHumidty >= humidity and humidity >= optimumhumdity:
        list3 = [0, 1, 0]
        updateTraficLights(list3)
    else:
        list3 = [0, 0, 1]
        updateTraficLights(list3)
basic.forever(on_forever)

def on_forever2():
    updateHumidityAnndTemp()
    serial.write_value("temperature(C)", Temp)
    serial.write_value("humidity(%)", humidity)
    while False:
        pass
basic.forever(on_forever2)
