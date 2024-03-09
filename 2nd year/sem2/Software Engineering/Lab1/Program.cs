using System;
using System.Collections.Generic;

namespace Lab1
{
    internal class Program
    {
        static void Main(string[] args)
        {
            int[][] intervals = new int[][]
            {
                new int[] {1, 3},
                new int[] {2, 6},
                new int[] {8, 10},
                new int[] {15, 18}
            };

            int[][] mergedIntervals = MergeIntervals(intervals);

            foreach (var interval in mergedIntervals)
            {
                Console.WriteLine($"[{interval[0]}, {interval[1]}]");
            }
        }

        public static int[][] MergeIntervals(int[][] intervals)
        {
            if (intervals.Length < 2)
            {
                return intervals;
            }

            List<int[]> mergedIntervals = new List<int[]>();

            Array.Sort(intervals, (a, b) => a[0].CompareTo(b[0]));

            int[] currentInterval = intervals[0];

            mergedIntervals.Add(currentInterval);

            foreach (int[] interval in intervals)
            {
                int currentEnd = currentInterval[1];
                int nextBegin = interval[0];
                int nextEnd = interval[1];

                if (currentEnd >= nextBegin)
                {
                    currentInterval[1] = Math.Max(currentEnd, nextEnd);
                }
                else
                {
                    currentInterval = interval;
                    mergedIntervals.Add(currentInterval);
                }
            }

            return mergedIntervals.ToArray();
        }
    }
}
