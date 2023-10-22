#!/bin/bash

while true
do
    echo "Starting Xlicon-Md..."
    node client.js

    # Check the exit status of the Node.js process
    if [ $? -eq 0 ]; then
        echo "Xlicon-Md has exited gracefully."
    else
        echo "Xlicon-Md has exited with an error. Restarting..."
    fi

    # Add a delay before restarting (e.g., 5 seconds)
    sleep 5
done
