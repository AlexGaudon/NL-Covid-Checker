# What is it?

A service that will notify you when your test results from eastern health become available.

# How do I use it?

Fill out the config.json file with your information in the correct format, and then run `npm i` followed by `npm run start`

The script supports desktop notifications, as well as discord message notifications via the use of [Webhooks](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks)

# Example config file

```
{
    "MCP": "123456789123",
    "FirstName": "FirstName",
    "LastName": "LastName",
    "DOB": "YYYYMMDD",
    "EXP": "YYYYMMDD",
    "WebHookURL": "https://discord.com/webhook_url_goes_here",
    "desktopNotifications": false,
    "email": "test@gmail.com",
    "emailPassword": "p4ssw0rd123"
}
```

# Email Notifications

The easiest way to set up email notifications is using an ["Application Specific Password"](https://support.google.com/accounts/answer/185833?hl=en) via gmail.

# Debugging

If you want to be able to test your notifications again, go to the config.json file, and delete the line that contains "TestCount", or set "TestCount" to 0.
