#!/bin/bash

# Authentication Testing Script for Resurfacer 4c
# Tests that syncs properly enforce authentication

API_BASE="http://localhost:8000/api"
VALID_TOKEN="session:user:test123"
VALID_USER="user:test123"
INVALID_TOKEN="invalid_token"
WRONG_USER="user:different456"

echo "======================================"
echo "Resurfacer Backend Authentication Tests"
echo "======================================"
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counter
PASSED=0
FAILED=0

# Helper function to test endpoint
test_endpoint() {
  local test_name=$1
  local endpoint=$2
  local payload=$3
  local expected_status=$4
  
  echo -n "Testing: $test_name... "
  
  response=$(curl -s -w "\n%{http_code}" -X POST \
    -H "Content-Type: application/json" \
    -d "$payload" \
    "$API_BASE/$endpoint" 2>/dev/null)
  
  status_code=$(echo "$response" | tail -n1)
  body=$(echo "$response" | head -n -1)
  
  if [ "$status_code" = "$expected_status" ]; then
    echo -e "${GREEN}PASS${NC} (Status: $status_code)"
    PASSED=$((PASSED + 1))
  else
    echo -e "${RED}FAIL${NC} (Expected: $expected_status, Got: $status_code)"
    echo "  Response: $body"
    FAILED=$((FAILED + 1))
  fi
}

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "1. Testing INCLUDED routes (should work WITHOUT auth)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Included routes should work without session token
test_endpoint \
  "LibraryCache/getLiked (no token)" \
  "LibraryCache/getLiked" \
  '{"userId":"user:test123"}' \
  "200"

test_endpoint \
  "TrackScoring/preview (no token)" \
  "TrackScoring/preview" \
  '{"userId":"user:test123","source":"liked","size":10}' \
  "200"

test_endpoint \
  "PlaylistHealth/getReport (no token)" \
  "PlaylistHealth/getReport" \
  '{"snapshotId":"snapshot:test"}' \
  "200"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "2. Testing EXCLUDED routes WITHOUT session token"
echo "   (Should FAIL with 500/error)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# These should fail without token
test_endpoint \
  "SwipeSessions/start (no token)" \
  "SwipeSessions/start" \
  '{"userId":"user:test123","queueTracks":["track:1"],"size":1}' \
  "500"

test_endpoint \
  "PlatformLink/listLinks (no token)" \
  "PlatformLink/listLinks" \
  '{"userId":"user:test123"}' \
  "500"

test_endpoint \
  "TrackScoring/keep (no token)" \
  "TrackScoring/keep" \
  '{"userId":"user:test123","trackId":"track:1"}' \
  "500"

test_endpoint \
  "LibraryCache/sync (no token)" \
  "LibraryCache/sync" \
  '{"userId":"user:test123","tracks":[],"likes":[],"plays":[],"playlists":[]}' \
  "500"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "3. Testing EXCLUDED routes WITH invalid token"
echo "   (Should FAIL with 500/error)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

test_endpoint \
  "SwipeSessions/start (invalid token)" \
  "SwipeSessions/start" \
  "{\"sessionToken\":\"$INVALID_TOKEN\",\"userId\":\"$VALID_USER\",\"queueTracks\":[\"track:1\"],\"size\":1}" \
  "500"

test_endpoint \
  "TrackScoring/updateWeights (invalid token)" \
  "TrackScoring/updateWeights" \
  "{\"sessionToken\":\"$INVALID_TOKEN\",\"userId\":\"$VALID_USER\",\"lastPlayedW\":0.5,\"likedWhenW\":0.3,\"timesSkippedW\":0.2}" \
  "500"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "4. Testing EXCLUDED routes WITH wrong userId"
echo "   (Valid token but userId mismatch - should FAIL)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

test_endpoint \
  "SwipeSessions/start (userId mismatch)" \
  "SwipeSessions/start" \
  "{\"sessionToken\":\"$VALID_TOKEN\",\"userId\":\"$WRONG_USER\",\"queueTracks\":[\"track:1\"],\"size\":1}" \
  "500"

test_endpoint \
  "PlatformLink/startAuth (userId mismatch)" \
  "PlatformLink/startAuth" \
  "{\"sessionToken\":\"$VALID_TOKEN\",\"userId\":\"$WRONG_USER\",\"platform\":\"spotify\",\"scopes\":[\"user-library-read\"],\"redirectUri\":\"http://localhost:3000/callback\"}" \
  "500"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "5. Testing EXCLUDED routes WITH valid token"
echo "   (Should SUCCEED - these may fail for other reasons but not auth)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Note: These might still fail due to business logic (e.g., user not found),
# but the auth check should pass and we should get past the auth error

echo -e "${YELLOW}NOTE: These tests verify auth passes. They may fail for business logic reasons.${NC}"
echo ""

test_endpoint \
  "PlatformLink/startAuth (valid token)" \
  "PlatformLink/startAuth" \
  "{\"sessionToken\":\"$VALID_TOKEN\",\"userId\":\"$VALID_USER\",\"platform\":\"spotify\",\"scopes\":[\"user-library-read\"],\"redirectUri\":\"http://localhost:3000/callback\"}" \
  "200"

test_endpoint \
  "TrackScoring/updateWeights (valid token)" \
  "TrackScoring/updateWeights" \
  "{\"sessionToken\":\"$VALID_TOKEN\",\"userId\":\"$VALID_USER\",\"lastPlayedW\":0.5,\"likedWhenW\":0.3,\"timesSkippedW\":0.2}" \
  "200"

test_endpoint \
  "LibraryCache/sync (valid token)" \
  "LibraryCache/sync" \
  "{\"sessionToken\":\"$VALID_TOKEN\",\"userId\":\"$VALID_USER\",\"tracks\":[],\"likes\":[],\"plays\":[],\"playlists\":[]}" \
  "200"

test_endpoint \
  "PlaylistHealth/snapshot (valid token)" \
  "PlaylistHealth/snapshot" \
  "{\"sessionToken\":\"$VALID_TOKEN\",\"playlistId\":\"playlist:test\",\"userId\":\"$VALID_USER\",\"trackIds\":[\"track:1\",\"track:2\"]}" \
  "200"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "6. Testing Special Cases"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# CompleteAuth is public (PKCE verification in concept)
test_endpoint \
  "PlatformLink/completeAuth (public - no token needed)" \
  "PlatformLink/completeAuth" \
  '{"state":"state:test","code":"auth_code_123"}' \
  "500"  # Will fail due to invalid state, but not auth error

echo ""
echo "======================================"
echo "Test Summary"
echo "======================================"
echo -e "${GREEN}Passed: $PASSED${NC}"
echo -e "${RED}Failed: $FAILED${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
  echo -e "${GREEN}✅ All authentication tests passed!${NC}"
  exit 0
else
  echo -e "${RED}❌ Some tests failed. Check the output above.${NC}"
  exit 1
fi
