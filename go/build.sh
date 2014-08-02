#!/bin/bash
##############################
#####Setting Environments#####
echo "Setting Environments"
set -e
export PWD=`pwd`
export LD_LIBRARY_PATH=/usr/local/lib
export PATH=$PATH:$GOPATH/bin:$HOME/bin:$GOROOT/bin
export GOPATH=$PWD:$GOPATH
export B_DIR=$PWD/build
export GO_B_DIR=$B_DIR/go
export JS_B_DIR=$B_DIR/js
export WS_B_DIR=$B_DIR/ws
##############################
######Install Dependence######
echo "Installing Dependence"
go get github.com/Centny/Cny4go
# npm install git://github.com/Centny/istanbul.git
# npm install git://github.com/Centny/grunt-srv.git
##############################
#########Running Test#########
rm -rf $B_DIR
mkdir $B_DIR
mkdir $GO_B_DIR
mkdir $JS_B_DIR
mkdir $WS_B_DIR
##############################
#########Running Test#########
echo "Running Go Unit Test"
pkgs="\
 org.cny.ctf/ctf\
"
echo "mode: set" > $GO_B_DIR/a.out
for p in $pkgs;
do
 echo $p
 go test -v --coverprofile=$GO_B_DIR/c.out $p
 cat $GO_B_DIR/c.out | grep -v "mode" >>$GO_B_DIR/a.out
done
rm -f $GO_B_DIR/c.out

##############################
######## Run Grunt############
echo "Build Executable"
mkdir $WS_B_DIR/bin
go test org.cny.ctf/srv -c -i -cover -coverpkg org.cny.ctf/ctf,org.cny.ctf/srv
cp srv.test $WS_B_DIR/bin

##############################
##Instrument Js And Web Page##
echo "Instrument Js And Web Page"
cp -r www $WS_B_DIR
istanbul instrument --prefix $PWD/www --output $WS_B_DIR/www -x lib/** -x test/** www
jcr app -d www -o $WS_B_DIR/www -ex www/lib/.*,tpl/.*

##############################
######## Run Grunt############
echo "Running Web Testing"
mkdir $JS_B_DIR/e2e
mkdir $JS_B_DIR/uni
npm install
grunt --force

##############################
#####Create Coverage Report###
echo "Create Coverage Report"
mrepo $GO_B_DIR/all.out $GO_B_DIR/a.out $GO_B_DIR/ig.out

gocov convert $GO_B_DIR/a.out > $GO_B_DIR/coverage_a.json
cat $GO_B_DIR/coverage_a.json | gocov-xml -b $PWD/src > $GO_B_DIR/coverage_a.xml
cat $GO_B_DIR/coverage_a.json | gocov-html $GO_B_DIR/coverage_a.json > $GO_B_DIR/coverage_a.html

gocov convert $GO_B_DIR/ig.out > $GO_B_DIR/coverage_ig.json
cat $GO_B_DIR/coverage_ig.json | gocov-xml -b $PWD/src > $GO_B_DIR/coverage_ig.xml
cat $GO_B_DIR/coverage_ig.json | gocov-html $GO_B_DIR/coverage_ig.json > $GO_B_DIR/coverage_ig.html

gocov convert $GO_B_DIR/all.out > $GO_B_DIR/coverage.json
cat $GO_B_DIR/coverage.json | gocov-xml -b $PWD/src > $GO_B_DIR/coverage.xml
cat $GO_B_DIR/coverage.json | gocov-html $GO_B_DIR/coverage.json > $GO_B_DIR/coverage.html

mkdir $JS_B_DIR/all
cd www
istanbul report --root=$JS_B_DIR --dir=$JS_B_DIR/all cobertura
istanbul report --root=$JS_B_DIR --dir=$JS_B_DIR/all html
cd ../

mcobertura -o $B_DIR/coverage.xml $JS_B_DIR/all/cobertura-coverage.xml $GO_B_DIR/coverage.xml

