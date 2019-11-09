#!/bin/bash

set -e

fname=$1

convert $fname -background none -gravity center -extent 32X32 $fname
