using System.Reflection;

namespace lab_2_modules.DataCompression
{
    public class DataReader
    {
        public static string ReadTextFromFile(string filePath)
        {
            try
            {
                string text = File.ReadAllText(filePath);
                return text;
            }
            catch (Exception e)
            {
                throw new Exception("Error reading the file: " + e.Message);
            }
        }
    }
}
