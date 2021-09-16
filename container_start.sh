#!/bin/bash

echo "starting X server and VNC display"
touch ~/.Xauthority
Xvfb :1 -screen 0 1024x768x24 &
/usr/bin/x11vnc -display :1.0 -usepw -quiet &
DISPLAY=:1.0
export DISPLAY
echo "starting node server"
npm start