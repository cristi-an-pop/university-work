using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataEncryptionModule
{
    public class DataEncryption
    {
        private Dictionary<char, char> substitutionCypher;

        public DataEncryption()
        {
            substitutionCypher = new Dictionary<char, char>();
            // 32 - 126 is the range of printable ASCII characters
            // 32 is the space character and 126 is the ~ character
            for (char c = (char)32; c < 127; c++)
            {
                // shift each character by 3
                // modulo 95 to get values in the range 0 - 94 then add 32 to get values in the range 32 - 126
                substitutionCypher[c] = (char)((c + 3) % 95 + 32);
            }
        }

        public void SetSubstitutionCypher(Dictionary<char, char> cypher)
        {
            // Validate cypher
            for (char c = (char)32; c < 127; c++)
            {
                if (!cypher.ContainsKey(c))
                {
                    throw new ArgumentException("Cypher must contain all printable ASCII characters");
                }
            }

            var duplicates = cypher.GroupBy(x => x.Value).Where(x => x.Count() > 1).Select(x => x.Key).ToList();
            if (duplicates.Count > 0)
            {
                throw new ArgumentException("Cypher must not contain duplicate values");
            }

            substitutionCypher = cypher;
        }

        public string Encrypt(string text)
        {
            StringBuilder encryptedText = new StringBuilder();
            foreach (char c in text)
            {
                encryptedText.Append(substitutionCypher[c]);
            }
            return encryptedText.ToString();
        }

        public string Decrypt(string text)
        {
            StringBuilder decryptedText = new StringBuilder();
            foreach (char c in text)
            {
                decryptedText.Append(substitutionCypher.FirstOrDefault(x => x.Value == c).Key);
            }
            return decryptedText.ToString();
        }
    }
}
