#!/bin/bash

# Check if abmet service is already running
if ! pgrep -f "c3ops-1.0.0-SNAPSHOT" > /dev/null; then
    echo "Starting c3ops service..."
    C3OPS_DEV="awsd"
    export C3OPS_DEV
    PATH=/opt/tomcat:$PATH
    cd /home/ec2-user/c3ops-1.0.0-SNAPSHOT
    rm -rf RUNNING_PID
    chmod 754 start
    sed -i 's/exec java/exec java -Dhttp.port=7000 -Dhttps.protocols=TLSv1.2/g' start
    ./start &
else
    echo "C3Ops service already running. Skipping..."
fi
