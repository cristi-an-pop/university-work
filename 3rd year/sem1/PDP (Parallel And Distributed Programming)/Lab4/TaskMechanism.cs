using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;
using Lab4.model;
using Lab4.util;

namespace Lab4
{
    public static class TaskMechanism
    {
        private static List<string> HOSTS;

        public static void run(List<string> hostnames)
        {
            HOSTS = hostnames;

            var tasks = new List<Task>();

            for (var i = 0; i < HOSTS.Count; i++)
            {
                tasks.Add(Task.Factory.StartNew(doStart, i));
            }

            Task.WaitAll(tasks.ToArray());
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

            ConnectWrapper(state).Wait();

            SendWrapper(state, HttpUtils.GetRequestString(state.serverHostname, state.requestEndpoint)).Wait();

            ReceiveWrapper(state).Wait();

            Console.WriteLine(
                "{0}) Response received : expected {1} chars in body, got {2} chars (headers + body)",
                id, HttpUtils.getContentLength(state.responseContent.ToString()), state.responseContent.Length);

            client.Shutdown(SocketShutdown.Both);
            client.Close();
        }

        private static Task ConnectWrapper(StateObject state)
        {
            state.socket.BeginConnect(state.serverEndpoint, ConnectCallback, state);

            return Task.FromResult(state.connectCompleted.WaitOne());
        }

        private static void ConnectCallback(IAsyncResult ar)
        {
            var state = (StateObject)ar.AsyncState;
            var clientSocket = state.socket;
            var clientId = state.clientId;
            var hostname = state.serverHostname;
 
            clientSocket.EndConnect(ar);

            Console.WriteLine("{0} --> Socket connected to {1} ({2})", clientId, hostname, clientSocket.RemoteEndPoint);

            state.connectCompleted.Set();
        }

        private static Task SendWrapper(StateObject state, string data)
        { 
            var byteData = Encoding.ASCII.GetBytes(data);

            state.socket.BeginSend(byteData, 0, byteData.Length, 0, SendCallback, state);

            return Task.FromResult(state.sendCompleted.WaitOne());
        }

        private static void SendCallback(IAsyncResult ar)
        {
            var state = (StateObject)ar.AsyncState;
            var clientSocket = state.socket;
            var clientId = state.clientId;

            var bytesSent = clientSocket.EndSend(ar);
            Console.WriteLine("{0} --> Sent {1} bytes to server.", clientId, bytesSent);

            state.sendCompleted.Set();
        }

        private static Task ReceiveWrapper(StateObject state)
        {
            state.socket.BeginReceive(state.buffer, 0, StateObject.BUFFER_SIZE, 0, ReceiveCallback, state);

            return Task.FromResult(state.receiveCompleted.WaitOne());
        }

        private static void ReceiveCallback(IAsyncResult ar)
        {
            var state = (StateObject)ar.AsyncState;
            var clientSocket = state.socket;

            try
            {
                var bytesRead = clientSocket.EndReceive(ar);

                state.responseContent.Append(Encoding.ASCII.GetString(state.buffer, 0, bytesRead));

                if (!HttpUtils.ResponseHeaderFullyObtained(state.responseContent.ToString()))
                {
                    clientSocket.BeginReceive(state.buffer, 0, StateObject.BUFFER_SIZE, 0, ReceiveCallback, state);
                }
                else
                {
                    var responseBody = HttpUtils.getResponseBody(state.responseContent.ToString());

                    if (responseBody.Length < HttpUtils.getContentLength(state.responseContent.ToString()))
                    {
                        clientSocket.BeginReceive(state.buffer, 0, StateObject.BUFFER_SIZE, 0, ReceiveCallback, state);
                    }
                    else
                    {
                        state.receiveCompleted.Set();
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