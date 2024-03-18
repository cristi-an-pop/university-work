namespace DataCompressionModule
{
    internal class HuffmanLeaf : HuffmanNode
    {
        public char Character { get; private set; }

        public HuffmanLeaf(char character, int frequency) : base()
        {
            Character = character;
            Frequency = frequency;
        }
    }
}
