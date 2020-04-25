#!/bin/bash

#Simple script to start ADMap.py


#Now start GUI
cd gui

npm start run &

#Start API
cd ..
cd api

python ADMap.py

