using System;

namespace Lab4.util
{
    public class HttpUtils
    {
        public static readonly int HTTP_PORT = 80;

        public static string getResponseBody(string responseContent)
        {
            var responseParts = responseContent.Split(new[] { "\r\n\r\n" }, StringSplitOptions.RemoveEmptyEntries);

            return responseParts.Length > 1 ? responseParts[1] : "";
        }

        public static bool ResponseHeaderFullyObtained(string responseContent)
        {
            return responseContent.Contains("\r\n\r\n");
        }


        public static int getContentLength(string responseContent)
        {
            var contentLength = 0;
            var responseLines = responseContent.Split('\r', '\n');

            foreach (var responseLine in responseLines)
            {
                var headerDetails = responseLine.Split(':');

                if (headerDetails[0].CompareTo("Content-Length") == 0)
                {
                    contentLength = int.Parse(headerDetails[1]);
                }
            }

            return contentLength;
        }

        public static string GetRequestString(string hostname, string endpoint)
        {
            return "GET " + endpoint + " HTTP/1.1\r\n" +
                   "Host: " + hostname + "\r\n" +
                   "User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36\r\n" +
                   "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,#1#*;q=0.8\r\n" +
                   "Accept-Language: en-US,en;q=0.9,ro;q=0.8\r\n" +
                   "Accept-Encoding: gzip, deflate\r\n" +
                   "Connection: keep-alive\r\n" +
                   "Upgrade-Insecure-Requests: 1\r\n" +
                   "Pragma: no-cache\r\n" +
                   "Cache-Control: no-cache\r\n" +
                   "Content-Length: 0\r\n\r\n";
        }
    }
}