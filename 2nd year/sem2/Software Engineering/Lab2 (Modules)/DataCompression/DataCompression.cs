using System.Text;

namespace DataCompressionModule
{
    public class DataCompression
    {
        private HuffmanNode? root;
        private readonly string text;
        private Dictionary<char, int> charFrequencies;
        private readonly Dictionary<char, string> huffmanCodes;

        public DataCompression(string text)
        {
            this.text = text;
            charFrequencies = new Dictionary<char, int>();
            huffmanCodes = new Dictionary<char, string>();
            FillCharFrequenciesMap();
        }

        private void FillCharFrequenciesMap()
        {
            foreach (char character in text)
            {
                if (charFrequencies.ContainsKey(character))
                    charFrequencies[character]++;
                else
                    charFrequencies[character] = 1;
            }
        }

        public string Encode()
        {

            PriorityQueue<HuffmanNode, int> queue = new PriorityQueue<HuffmanNode, int>();
            foreach (var entry in charFrequencies)
            {
                queue.Enqueue(new HuffmanLeaf(entry.Key, entry.Value), entry.Value);
            }

            while (queue.Count > 1)
            {
                var left = queue.Dequeue();
                var right = queue.Dequeue();
                queue.Enqueue(new HuffmanNode(left, right), left.Frequency + right.Frequency);
            }

            root = queue.Peek();
            GenerateHuffmanCodes(root, "");
            
            return GetEncodedText();
        }

        private void GenerateHuffmanCodes(HuffmanNode? node, string code)
        {
            if (node == null)
                return;

            if (node is HuffmanLeaf leaf)
            {
                huffmanCodes[leaf.Character] = code;
                return;
            }

            GenerateHuffmanCodes(node.Left, code + "0");
            GenerateHuffmanCodes(node.Right, code + "1");
        }

        private string GetEncodedText()
        {
            StringBuilder sb = new StringBuilder();
            foreach (char character in text)
            {
                sb.Append(huffmanCodes[character]);
            } 
            return sb.ToString();
        }

        public string Decode(string encodedText)
        {
            if (root == null)
                return string.Empty;

            StringBuilder sb = new StringBuilder();
            HuffmanNode? current = root;
            foreach (char character in encodedText)
            {
                current = character == '0' ? current.Left : current.Right;
                if (current is HuffmanLeaf leaf)
                {
                    sb.Append(leaf.Character);
                    current = root;
                }
            }
            return sb.ToString();
        }
    }
}
