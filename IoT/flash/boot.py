# boot.py - - runs on boot-up
# This file is executed on every boot (including wake-boot from deepsleep)
import sys
from machine import idle
from network import STA_IF, WLAN
from auth import connectWifi
from m5stack import lcd

lcd.hsb2rgb(0.5, 0.5, 0.5)

sys.path[1] = '/flash/lib'
wlan = WLAN(STA_IF)

wlan.active(True)
cred = connectWifi()

wlan.connect(cred[0], cred[1])
lcd.text(lcd.CENTER, lcd.LASTY, "Connecting to {}".format(cred[0]))

elli = ""
tmo = 0
tm = 0
while not wlan.isconnected():
    if tmo == 300:
        lcd.clear()
        tm += 1
        elli += "."
        tmo = 0
        if tm == 4:
            tm = 0
            elli = ""
    lcd.text(lcd.CENTER, lcd.CENTER, elli)

    tmo += 1

    idle()
