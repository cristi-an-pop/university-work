// Program.cs
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Lab4
{
    public static class Program
    {
        private static readonly List<string> HOSTS = new List<string> {
            "www.cs.ubbcluj.ro/~rlupsa/edu/pdp",
            "facebook.com",
            "google.com",
        };

        public static void Main(string[] args)
        {
            DirectCallbacks.run(HOSTS);
            //TaskMechanism.run(HOSTS);
            //AsyncTaskMechanism.run(HOSTS);
        }
    }
}
