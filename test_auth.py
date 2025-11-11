#!/usr/bin/env python3
"""
Authentication Testing Script for Resurfacer 4c Backend
Tests that all syncs properly enforce authentication
"""

import requests
import json
from typing import Dict, Any, Optional

API_BASE = "http://localhost:8000/api"
VALID_TOKEN = "session:user:test123"
VALID_USER = "user:test123"
INVALID_TOKEN = "invalid_token"
WRONG_USER = "user:different456"

# ANSI color codes
class Colors:
    GREEN = '\033[0;32m'
    RED = '\033[0;31m'
    YELLOW = '\033[1;33m'
    BLUE = '\033[0;34m'
    NC = '\033[0m'  # No Color

class TestResult:
    def __init__(self):
        self.passed = 0
        self.failed = 0
        self.tests = []
    
    def add_pass(self, name: str, details: str = ""):
        self.passed += 1
        self.tests.append((name, True, details))
        print(f"{Colors.GREEN}✓{Colors.NC} {name}")
        if details:
            print(f"  {details}")
    
    def add_fail(self, name: str, details: str = ""):
        self.failed += 1
        self.tests.append((name, False, details))
        print(f"{Colors.RED}✗{Colors.NC} {name}")
        if details:
            print(f"  {details}")
    
    def summary(self):
        print("\n" + "="*60)
        print("TEST SUMMARY")
        print("="*60)
        print(f"{Colors.GREEN}Passed: {self.passed}{Colors.NC}")
        print(f"{Colors.RED}Failed: {self.failed}{Colors.NC}")
        print(f"Total: {self.passed + self.failed}")
        
        if self.failed == 0:
            print(f"\n{Colors.GREEN}✅ All authentication tests passed!{Colors.NC}\n")
            return True
        else:
            print(f"\n{Colors.RED}❌ Some tests failed. Review the output above.{Colors.NC}\n")
            return False

def test_endpoint(
    result: TestResult,
    test_name: str,
    endpoint: str,
    payload: Dict[str, Any],
    should_succeed: bool,
    check_auth_error: bool = False
):
    """
    Test an API endpoint
    
    Args:
        result: TestResult object to track results
        test_name: Name of the test
        endpoint: API endpoint (e.g., "SwipeSessions/start")
        payload: Request payload
        should_succeed: Whether we expect a 200 response
        check_auth_error: Whether to check for auth-specific error message
    """
    url = f"{API_BASE}/{endpoint}"
    
    try:
        response = requests.post(url, json=payload, timeout=5)
        status = response.status_code
        
        # Try to parse response body
        try:
            body = response.json()
        except:
            body = response.text
        
        # Check if auth error message is present
        is_auth_error = False
        if isinstance(body, dict) and 'error' in body:
            error_msg = str(body['error']).lower()
            is_auth_error = 'unauthorized' in error_msg or 'forbidden' in error_msg or 'session' in error_msg
        elif isinstance(body, str):
            error_msg = body.lower()
            is_auth_error = 'unauthorized' in error_msg or 'forbidden' in error_msg or 'session' in error_msg
        
        # Determine if test passed
        if should_succeed:
            if status == 200:
                result.add_pass(test_name, f"Status: {status}")
            else:
                result.add_fail(test_name, f"Expected 200, got {status}. Response: {body}")
        else:
            if check_auth_error and is_auth_error:
                result.add_pass(test_name, f"Correctly rejected with auth error: {body}")
            elif status >= 400:
                result.add_pass(test_name, f"Correctly rejected with status {status}")
            else:
                result.add_fail(test_name, f"Expected failure but got {status}. Response: {body}")
    
    except requests.exceptions.ConnectionError:
        result.add_fail(test_name, "Connection error - is the server running?")
    except requests.exceptions.Timeout:
        result.add_fail(test_name, "Request timed out")
    except Exception as e:
        result.add_fail(test_name, f"Unexpected error: {str(e)}")

def main():
    result = TestResult()
    
    print("="*60)
    print("RESURFACER BACKEND AUTHENTICATION TESTS")
    print("="*60)
    print(f"Testing API at: {API_BASE}")
    print()
    
    # Test 1: Included routes (should work without auth)
    print(f"\n{Colors.BLUE}{'='*60}")
    print("1. INCLUDED ROUTES - Should work WITHOUT authentication")
    print(f"{'='*60}{Colors.NC}\n")
    
    test_endpoint(
        result,
        "LibraryCache/getLiked (no token)",
        "LibraryCache/getLiked",
        {"userId": VALID_USER},
        should_succeed=True
    )
    
    test_endpoint(
        result,
        "TrackScoring/preview (no token)",
        "TrackScoring/preview",
        {"userId": VALID_USER, "source": "liked", "size": 10},
        should_succeed=True
    )
    
    test_endpoint(
        result,
        "PlaylistHealth/getReport (no token)",
        "PlaylistHealth/getReport",
        {"snapshotId": "snapshot:test"},
        should_succeed=True
    )
    
    # Test 2: Excluded routes without token (should fail)
    print(f"\n{Colors.BLUE}{'='*60}")
    print("2. EXCLUDED ROUTES - Missing token (Should FAIL)")
    print(f"{'='*60}{Colors.NC}\n")
    
    test_endpoint(
        result,
        "SwipeSessions/start (no token)",
        "SwipeSessions/start",
        {"userId": VALID_USER, "queueTracks": ["track:1"], "size": 1},
        should_succeed=False,
        check_auth_error=True
    )
    
    test_endpoint(
        result,
        "PlatformLink/listLinks (no token)",
        "PlatformLink/listLinks",
        {"userId": VALID_USER},
        should_succeed=False,
        check_auth_error=True
    )
    
    test_endpoint(
        result,
        "TrackScoring/keep (no token)",
        "TrackScoring/keep",
        {"userId": VALID_USER, "trackId": "track:1"},
        should_succeed=False,
        check_auth_error=True
    )
    
    test_endpoint(
        result,
        "LibraryCache/sync (no token)",
        "LibraryCache/sync",
        {"userId": VALID_USER, "tracks": [], "likes": [], "plays": [], "playlists": []},
        should_succeed=False,
        check_auth_error=True
    )
    
    # Test 3: Invalid token (should fail)
    print(f"\n{Colors.BLUE}{'='*60}")
    print("3. EXCLUDED ROUTES - Invalid token (Should FAIL)")
    print(f"{'='*60}{Colors.NC}\n")
    
    test_endpoint(
        result,
        "SwipeSessions/start (invalid token)",
        "SwipeSessions/start",
        {"sessionToken": INVALID_TOKEN, "userId": VALID_USER, "queueTracks": ["track:1"], "size": 1},
        should_succeed=False,
        check_auth_error=True
    )
    
    test_endpoint(
        result,
        "TrackScoring/updateWeights (invalid token)",
        "TrackScoring/updateWeights",
        {
            "sessionToken": INVALID_TOKEN,
            "userId": VALID_USER,
            "lastPlayedW": 0.5,
            "likedWhenW": 0.3,
            "timesSkippedW": 0.2
        },
        should_succeed=False,
        check_auth_error=True
    )
    
    test_endpoint(
        result,
        "PlaylistHealth/snapshot (invalid token)",
        "PlaylistHealth/snapshot",
        {
            "sessionToken": INVALID_TOKEN,
            "playlistId": "playlist:test",
            "userId": VALID_USER,
            "trackIds": ["track:1", "track:2"]
        },
        should_succeed=False,
        check_auth_error=True
    )
    
    # Test 4: Valid token but wrong userId (should fail)
    print(f"\n{Colors.BLUE}{'='*60}")
    print("4. EXCLUDED ROUTES - userId mismatch (Should FAIL)")
    print(f"{'='*60}{Colors.NC}\n")
    
    test_endpoint(
        result,
        "SwipeSessions/start (userId mismatch)",
        "SwipeSessions/start",
        {"sessionToken": VALID_TOKEN, "userId": WRONG_USER, "queueTracks": ["track:1"], "size": 1},
        should_succeed=False,
        check_auth_error=True
    )
    
    test_endpoint(
        result,
        "PlatformLink/startAuth (userId mismatch)",
        "PlatformLink/startAuth",
        {
            "sessionToken": VALID_TOKEN,
            "userId": WRONG_USER,
            "platform": "spotify",
            "scopes": ["user-library-read"],
            "redirectUri": "http://localhost:3000/callback"
        },
        should_succeed=False,
        check_auth_error=True
    )
    
    # Test 5: Valid authentication (should succeed or fail for business logic, not auth)
    print(f"\n{Colors.BLUE}{'='*60}")
    print("5. EXCLUDED ROUTES - Valid authentication (Should pass AUTH)")
    print(f"{Colors.YELLOW}Note: These may fail for business logic reasons, but auth should pass{Colors.NC}")
    print(f"{'='*60}{Colors.NC}\n")
    
    test_endpoint(
        result,
        "PlatformLink/startAuth (valid auth)",
        "PlatformLink/startAuth",
        {
            "sessionToken": VALID_TOKEN,
            "userId": VALID_USER,
            "platform": "spotify",
            "scopes": ["user-library-read"],
            "redirectUri": "http://localhost:3000/callback"
        },
        should_succeed=True  # Auth should pass even if business logic fails
    )
    
    test_endpoint(
        result,
        "TrackScoring/updateWeights (valid auth)",
        "TrackScoring/updateWeights",
        {
            "sessionToken": VALID_TOKEN,
            "userId": VALID_USER,
            "lastPlayedW": 0.5,
            "likedWhenW": 0.3,
            "timesSkippedW": 0.2
        },
        should_succeed=True
    )
    
    test_endpoint(
        result,
        "LibraryCache/sync (valid auth)",
        "LibraryCache/sync",
        {
            "sessionToken": VALID_TOKEN,
            "userId": VALID_USER,
            "tracks": [],
            "likes": [],
            "plays": [],
            "playlists": []
        },
        should_succeed=True
    )
    
    # Test 6: Special cases
    print(f"\n{Colors.BLUE}{'='*60}")
    print("6. SPECIAL CASES")
    print(f"{'='*60}{Colors.NC}\n")
    
    test_endpoint(
        result,
        "PlatformLink/completeAuth (public endpoint, no token)",
        "PlatformLink/completeAuth",
        {"state": "state:test", "code": "auth_code_123"},
        should_succeed=False  # Will fail due to invalid state, but not auth
    )
    
    # Print summary
    success = result.summary()
    
    return 0 if success else 1

if __name__ == "__main__":
    exit(main())
