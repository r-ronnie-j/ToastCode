export const allHttpHeaders = {
    "Accept": [
        "application/json",
        "application/xml",
        "text/html",
        "text/plain",
        "image/png",
        "image/jpeg",
        "application/pdf"
    ],
    "Accept-Encoding": [
        "gzip",
        "compress",
        "deflate",
        "br",
        "identity"
    ],
    "Authorization": [
        "Bearer <token>",
        "Basic <credentials>",
        "Digest <credentials>"
    ],
    "Cache-Control": [
        "no-cache",
        "no-store",
        "max-age=<seconds>",
        "must-revalidate",
        "public",
        "private"
    ],
    "Content-Type": [
        "application/json",
        "application/x-www-form-urlencoded",
        "multipart/form-data",
        "text/plain",
        "text/html",
        "application/javascript",
        "application/octet-stream"
    ],
    "User-Agent": [
        "Mozilla/5.0",
        "Chrome/91.0.4472.124",
        "Safari/537.36",
        "Edge/90.0.818.46",
        "Opera/9.80"
    ],
    "Connection": [
        "keep-alive",
        "close",
        "upgrade"
    ],
    "Host": [
        "example.com",
        "localhost",
        "api.example.com",
        "mywebsite.com"
    ],
    "Content-Encoding": [
        "gzip",
        "deflate",
        "compress",
        "identity",
        "br"
    ],
    "Content-Length": [
        "<length in bytes>",
        "0",
        "<calculated length>"
    ],
    "Transfer-Encoding": [
        "chunked",
        "compress",
        "deflate",
        "gzip"
    ],
    "X-Requested-With": [
        "XMLHttpRequest"
    ],
    "Accept-Charset": [
        "utf-8",
        "iso-8859-1",
        "windows-1251"
    ],
    "Accept-Language": [
        "en-US",
        "en-GB",
        "fr-FR",
        "es-ES",
        "de-DE",
        "ru-RU"
    ],
    "Access-Control-Allow-Origin": [
        "*",
        "https://example.com",
        "https://api.example.com"
    ],
    "Access-Control-Allow-Methods": [
        "GET",
        "POST",
        "PUT",
        "DELETE",
        "OPTIONS",
        "HEAD"
    ],
    "Access-Control-Allow-Headers": [
        "Authorization",
        "Content-Type",
        "X-Requested-With",
        "Accept"
    ],
    "Origin": [
        "https://example.com",
        "https://localhost"
    ],
    "Referer": [
        "https://example.com/page",
        "https://api.example.com/endpoint"
    ],
    "If-Modified-Since": [
        "<date>",
        "Sat, 29 Oct 1994 19:43:31 GMT"
    ],
    "If-None-Match": [
        "<etag>",
        "W/\"67ab43\", \"54ed21\""
    ],
    "Upgrade-Insecure-Requests": [
        "1",
        "0"
    ],
    "Proxy-Authorization": [
        "Basic <credentials>",
        "Bearer <token>"
    ],
    "X-Forwarded-For": [
        "<client IP>",
        "<proxy IP>"
    ],
    "X-Forwarded-Proto": [
        "http",
        "https"
    ],
    "Sec-Fetch-Mode": [
        "navigate",
        "cors",
        "no-cors",
        "same-origin"
    ],
    "Sec-Fetch-Site": [
        "same-origin",
        "cross-site",
        "none"
    ],
    "Sec-Fetch-Dest": [
        "document",
        "image",
        "script",
        "style",
        "iframe"
    ]
};