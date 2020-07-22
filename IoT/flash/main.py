from m5stack import lcd
from scales import Scales
import views
import time
import math
import api

massFactor = 4000
scales = Scales(d_out=22, pd_sck=21)
delay_read = 0.1
delay_post = 0.8


def readScale():
    val = abs(scales.stable_value())
    return val


def getCount(raw_val):
    val = math.floor(raw_val/massFactor)
    val = str(max(0, val))
    return val


partId = views.get_partBtn()

prev_val = getCount(readScale())
scales.tare()
prev_val = getCount(readScale())


while True:
    raw_val = readScale()
    val = getCount(raw_val)
    lcd.text(lcd.CENTER, 0, str(raw_val))
    if (val != prev_val):
        time.sleep(delay_post)
        val = getCount(readScale())
        if (val != prev_val):
            prev_val = val
            api.updateParts(partId, val)
            views.get_partBtn()

    time.sleep(delay_read)
