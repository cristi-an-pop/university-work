using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace DataSortModule
{
    public class TestDataSort
    {
        public static void Test()
        {
            List<int> list = new List<int> { 3, 2, 1, 5, 4 };
            DataSort.Sort(list, false);
            List<int> expected = new List<int> { 1, 2, 3, 4, 5 };
            for (int i = 0; i < list.Count; ++i)
                Debug.Assert(list[i] == expected[i]);
        }
    }
}
