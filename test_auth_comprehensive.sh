#!/bin/bash

# Comprehensive Authentication Testing Script
# Tests all authentication scenarios for the resurfacer backend

BASE_URL="http://localhost:8000/api"

echo "======================================"
echo "  AUTHENTICATION COMPREHENSIVE TESTS"
echo "======================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

test_count=0
pass_count=0
fail_count=0

# Helper function to run a test
run_test() {
    local test_name=$1
    local endpoint=$2
    local data=$3
    local expected_pattern=$4
    
    test_count=$((test_count + 1))
    echo -e "${YELLOW}Test $test_count: $test_name${NC}"
    
    response=$(curl -s -X POST "$BASE_URL$endpoint" \
        -H "Content-Type: application/json" \
        -d "$data")
    
    echo "Response: $response"
    
    if echo "$response" | grep -q "$expected_pattern"; then
        echo -e "${GREEN}✅ PASS${NC}"
        pass_count=$((pass_count + 1))
    else
        echo -e "${RED}❌ FAIL - Expected pattern: $expected_pattern${NC}"
        fail_count=$((fail_count + 1))
    fi
    echo ""
}

echo "SWIPE SESSIONS TESTS"
echo "--------------------"

run_test \
    "Valid token and userId match" \
    "/SwipeSessions/start" \
    '{"sessionToken":"session:user-123","userId":"user-123","queueTracks":["track1"]}' \
    'sessionId'

run_test \
    "Invalid token format" \
    "/SwipeSessions/start" \
    '{"sessionToken":"invalid-token","userId":"user-123","queueTracks":["track1"]}' \
    'Unauthorized: Invalid or missing session token'

run_test \
    "Token and userId mismatch" \
    "/SwipeSessions/start" \
    '{"sessionToken":"session:user-123","userId":"user-456","queueTracks":["track1"]}' \
    'Forbidden: Session userId does not match requested userId'

run_test \
    "Empty/invalid token" \
    "/SwipeSessions/start" \
    '{"sessionToken":"","userId":"user-123","queueTracks":["track1"]}' \
    'Unauthorized: Invalid or missing session token'

echo ""
echo "======================================"
echo "  TEST SUMMARY"
echo "======================================"
echo -e "Total tests:  $test_count"
echo -e "${GREEN}Passed:       $pass_count${NC}"
echo -e "${RED}Failed:       $fail_count${NC}"
echo ""

if [ $fail_count -eq 0 ]; then
    echo -e "${GREEN}All tests passed! 🎉${NC}"
    exit 0
else
    echo -e "${RED}Some tests failed.${NC}"
    exit 1
fi
