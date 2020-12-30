#!/bin/bash

# This script takes an argument that is the directory to add localization to and creates a new directory
#  in that directory which contain the lang files and the localization.js with the class based on the dir path
#  also adds appropriate information to the foundation-components.serge.json file

usage() {
	echo "Usage: ${0} dir" >&2
	echo "  dir is the relative path from the foundation-components folder to the folder where localization is to be added" >&2
	exit 1
}

if [ $# -ne 1 ]; then
	usage
fi

dir=$1
name=$(echo $1 | awk -F'/' '{print $(NF-1),$NF}')
seperated=( $name )
class=$(echo ${seperated[@]^} | sed 's/ //g')
langDir="$dir/lang"
relDir="../$dir/lang"
localization="localization.js"

if [ -e "$relDir" ]; then
	echo "lang directory already exist in $dir" >&2
else
	mkdir "$relDir"
	cp lang/en.js "$relDir"
	cat "lang/$localization" | sed "s/LocalizeX/Localize${class}/" > "$relDir/$localization"
	echo "localization files added"
fi

sergeFile="../foundation-components.serge.json"

if grep "$class" ../foundation-components.serge.json &>/dev/null; then
	echo "$class already exists in serge file" >&2
else
	head -n -2 ${sergeFile} > temp
	echo '  },' >> temp
	cat lang/serge-template.json | sed "s/ClassName/${class}/" | sed "s%FileLocation%${langDir}%" >> temp
	echo "]" >> temp
	mv temp $sergeFile
	echo "$class added to serge file"
fi
