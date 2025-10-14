#!/bin/bash

echo "Benchmarking without cache:"
time curl -s http://localhost:3000/popular-posts > /dev/null

echo "Benchmarking with cache (immediate repeat):"
time curl -s http://localhost:3000/popular-posts > /dev/null
