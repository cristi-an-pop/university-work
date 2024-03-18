namespace DataCompressionModule
{
    internal class HuffmanNode : IComparable<HuffmanNode>
    {
        public int Frequency { get; set; }
        public HuffmanNode? Left { get; set; }
        public HuffmanNode? Right { get; set; }

        public HuffmanNode()
        {
            Frequency = 0;
            Left = null;
            Right = null;
        }

        public HuffmanNode(HuffmanNode left, HuffmanNode right)
        {
            Frequency = left.Frequency + right.Frequency;
            Left = left;
            Right = right;
        }

        public int CompareTo(HuffmanNode? other)
        {
            if (other == null)
            {
                return 1;
            }
            return Frequency.CompareTo(other.Frequency);
        }
    }
}
