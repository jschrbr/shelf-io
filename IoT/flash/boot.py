# boot.py - - runs on boot-up
# This file is executed on every boot (including wake-boot from deepsleep)
import sys
from machine import idle
from network import STA_IF, WLAN
from auth import connectWifi

sys.path[1] = '/flash/lib'

wlan = WLAN(STA_IF)
wlan.active(True)
cred = connectWifi()
wlan.connect(cred[0], cred[1])

tmo = 50
while not wlan.isconnected():
    idle()
