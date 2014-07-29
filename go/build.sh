#!/bin/bash
##############################
#####Setting Environments#####
echo "Setting Environments"
set -e
export PWD=`pwd`
export LD_LIBRARY_PATH=/usr/local/lib
export PATH=$PATH:$GOPATH/bin:$HOME/bin:$GOROOT/bin
export GOPATH=$PWD:$GOPATH
export B_DIR=build
export GO_B_DIR=$B_DIR/go
export JS_B_DIR=$B_DIR/js
export WS_B_DIR=$B_DIR/ws
##############################
######Install Dependence######
echo "Installing Dependence"
go get github.com/Centny/Cny4go
##############################
#########Running Test#########
rm -rf $B_DIR
mkdir $B_DIR
mkdir $GO_B_DIR
mkdir $JS_B_DIR
mkdir $WS_B_DIR
echo "Running Test"
pkgs="\
 org.cny.ctf/ctf\
"
echo "mode: set" > $B_DIR/a.out
for p in $pkgs;
do
 echo $p
 go test -v --coverprofile=$B_DIR/c.out $p
 cat $B_DIR/c.out | grep -v "mode" >>$B_DIR/a.out
done

echo "Build main"
mkdir $WS_B_DIR/bin
###
go test org.cny.ctf/srv -c -i -cover -coverpkg org.cny.ctf/ctf,org.cny.ctf/srv
cp srv.test $WS_B_DIR/bin
###
cp -r www $WS_B_DIR
istanbul instrument --output $WS_B_DIR/www -x lib/** -x test/** www
jcr app -d www -o $WS_B_DIR/www -ex lib/.*,tpl/.*
###

##############################
######## Run Grunt############
mkdir $JS_B_DIR/e2e
mkdir $JS_B_DIR/uni
grunt dsrv

##############################
########Build main############

