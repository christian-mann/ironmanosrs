#!/bin/bash

# ./grab.sh "Large spade"

set -e

urlencode() {
    # urlencode <string>
    old_lc_collate=$LC_COLLATE
    LC_COLLATE=C
    
    local length="${#1}"
    for (( i = 0; i < length; i++ )); do
        local c="${1:i:1}"
        case $c in
            [a-zA-Z0-9.~_-]) printf "$c" ;;
            *) printf '%%%02X' "'$c" ;;
        esac
    done
    
    LC_COLLATE=$old_lc_collate
}

find_real_image() {
	cat $1 | grep '"file"' | grep -o 'href="/images/[^"]\+"' | cut -d'"' -f2
}

title=$1
url=https://oldschool.runescape.wiki/w/File:"$(urlencode $(echo $title | sed 's/ /_/g'))".png
slug=$(echo $title | sed 's/ /-/g' | tr -cd '[a-zA-Z0-9_\-]' | tr '[A-Z]' '[a-z]')

echo $title
echo $url
echo $slug

wget $url -O /tmp/html.html

url=https://oldschool.runescape.wiki$(find_real_image /tmp/html.html)
echo $url
wget $url -O $slug.png

cat >> /tmp/to_add.txt <<EOF
<div class="item" id="item-$slug">
	<img class="icon image-bundle-splice item-acquired" image-bundle-name="clue-reward" image-id="$slug" src="images/clues/$slug.png" title="$title">
</div>
EOF
