# JumboSecure

JumboSecure is an example app with security vulnerabilities, built as a CTF game for JumboCode.

### Level 1

Deleting a post is supposedly an action that only admins can take, but removing the `disabled` attribute on the button allows normal users to take it anyway.

### Level 2

The "reset password" screen uses two API endpoints: one verifies that the emailed one-time code is correct, and the other allows changing the password. The second API endpoint does not rely on the first, making it possible to change a user's password without having the correct code.

### Level 3
