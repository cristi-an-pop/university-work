using lab_2_modules.DataCompression;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataCompressionModule
{
    public class TestDataCompression
    {
        public static void Test()
        {
            string filePath = "Tests/text.txt";
            string text = DataReader.ReadTextFromFile(filePath);
            DataCompression dataCompression = new DataCompression(text);
            string encodedText = dataCompression.Encode();
            Console.WriteLine(encodedText);
            string decodedText = dataCompression.Decode(encodedText);
            Debug.Assert(decodedText == text);
        }
    }
}

