#!/bin/sh
rshell --buffer-size=30 -p /dev/ttyUSB0 -f ./utils/put-py.sh
esptool.py --port /dev/ttyUSB0 flash_id
