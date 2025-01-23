using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading;

namespace Lab4.model
{
    public class StateObject
    {
        // client socket
        public Socket socket = null;

        // size of receive buffer
        public const int BUFFER_SIZE = 512;

        // receive buffer  
        public byte[] buffer = new byte[BUFFER_SIZE];

        // received data  
        public StringBuilder responseContent = new StringBuilder();

        // client id
        public int clientId;

        // server's hostname
        public string serverHostname;

        // request path
        public string requestEndpoint;

        // server's ip address
        public IPEndPoint serverEndpoint;

        // mutex for "connect" operation
        public ManualResetEvent connectCompleted = new ManualResetEvent(false);

        // mutex for "send" operation
        public ManualResetEvent sendCompleted = new ManualResetEvent(false);

        // mutex for "receive" operation
        public ManualResetEvent receiveCompleted = new ManualResetEvent(false);
    }
}