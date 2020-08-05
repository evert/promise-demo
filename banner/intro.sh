#!/bin/bash

echo -n "[38;5;1;48;5;16m"
printf ' %.0s' {1..300000}
echo -n "[1;1H"
cat ./ansi-art.utf.ans
echo -n "[38;5;1;48;5;16m"

PAD="                                                                                 "

echo "$PAD Implementing a Promise from scratch!"
echo ""
echo ""
echo "$PAD      Evert Pot for TorontoJS"
echo ""
echo "$PAD         twitter: @evertp"
read
