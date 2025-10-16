#!/bin/bash

echo "Testing Nginx to backend routing..."
curl -i http://localhost

echo -e "\n\nExpected: 200 OK with backend response\n"
