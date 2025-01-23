using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading;
using Lab4.model;
using Lab4.util;

namespace Lab4
{
    public static class DirectCallbacks
    {
        private static List<string> HOSTS;

        public static void run(List<string> hostnames)
        {
            HOSTS = hostnames;

            for (var i = 0; i < HOSTS.Count; i++)
            {
                doStart(i);
                Thread.Sleep(5000);
            }
        }

        private static void doStart(object idObject)
        {
            var id = (int)idObject;

            StartClient(HOSTS[id], id);
        }

        private static void StartClient(string host, int id)
        {
            var ipHostInfo = Dns.GetHostEntry(host.Split('/')[0]);
            var ipAddress = ipHostInfo.AddressList[0];
            var remoteEndpoint = new IPEndPoint(ipAddress, HttpUtils.HTTP_PORT);

            var client = new Socket(ipAddress.AddressFamily, SocketType.Stream, ProtocolType.Tcp);

            var state = new StateObject
            {
                socket = client,
                serverHostname = host.Split('/')[0],
                requestEndpoint = host.Contains("/") ? host.Substring(host.IndexOf("/")) : "/",
                serverEndpoint = remoteEndpoint,
                clientId = id
            };

            state.socket.BeginConnect(state.serverEndpoint, Connected, state);
        }

        private static void Connected(IAsyncResult ar)
        {
            var state = (StateObject)ar.AsyncState;
            var clientSocket = state.socket;
            var clientId = state.clientId;
            var hostname = state.serverHostname;

            clientSocket.EndConnect(ar);
            Console.WriteLine("{0} --> Socket connected to {1} ({2})", clientId, hostname, clientSocket.RemoteEndPoint);

            var byteData = Encoding.ASCII.GetBytes(HttpUtils.GetRequestString(state.serverHostname, state.requestEndpoint));

            state.socket.BeginSend(byteData, 0, byteData.Length, 0, Sent, state);
        }

        private static void Sent(IAsyncResult ar)
        {
            var state = (StateObject)ar.AsyncState;
            var clientSocket = state.socket;
            var clientId = state.clientId;

            var bytesSent = clientSocket.EndSend(ar);
            Console.WriteLine("{0} --> Sent {1} bytes to server.", clientId, bytesSent);

            state.socket.BeginReceive(state.buffer, 0, StateObject.BUFFER_SIZE, 0, Receiving, state);
        }

        private static void Receiving(IAsyncResult ar)
        {
            var state = (StateObject)ar.AsyncState;
            var clientSocket = state.socket;
            var clientId = state.clientId;

            try
            {
                var bytesRead = clientSocket.EndReceive(ar);

                state.responseContent.Append(Encoding.ASCII.GetString(state.buffer, 0, bytesRead));

                if (!HttpUtils.ResponseHeaderFullyObtained(state.responseContent.ToString()))
                {
                    clientSocket.BeginReceive(state.buffer, 0, StateObject.BUFFER_SIZE, 0, Receiving, state);
                }
                else
                {
                    var responseBody = HttpUtils.getResponseBody(state.responseContent.ToString());

                    var contentLengthHeaderValue = HttpUtils.getContentLength(state.responseContent.ToString());
                    if (responseBody.Length < contentLengthHeaderValue)
                    {
                        clientSocket.BeginReceive(state.buffer, 0, StateObject.BUFFER_SIZE, 0, Receiving, state);
                    }
                    else
                    {
                        //foreach (var i in state.responseContent.ToString().Split('\r', '\n'))
                        //{
                        //    Console.WriteLine(i);
                        //}
                        Console.WriteLine(
                            "{0} --> Response received : expected {1} chars in body, got {2} chars (headers + body)",
                            clientId, contentLengthHeaderValue, state.responseContent.Length);

                        clientSocket.Shutdown(SocketShutdown.Both);
                        clientSocket.Close();
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
            }
        }
    }
}