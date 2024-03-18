using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataEncryptionModule
{
    public class TestDataEncryption
    {
        public static void Test()
        {
            string text = "Hello, World!";
            DataEncryption dataEncryption = new DataEncryption();
            string encryptedText = dataEncryption.Encrypt(text);
            Debug.Assert(encryptedText != text);
            string decryptedText = dataEncryption.Decrypt(encryptedText);
            Debug.Assert(decryptedText == text);
        }
    }
}
