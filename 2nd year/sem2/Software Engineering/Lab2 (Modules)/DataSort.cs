using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataSortModule
{
    public class DataSort
    {
        public enum SortingType
        {
            BUBBLE_SORT,
            MERGE_SORT,
            GNOME_SORT
        }

        /// <summary>
        /// Sorts a list using the bubble sort algorithm.
        /// </summary>
        /// <typeparam name="T">Represents any type of elements.</typeparam>
        /// <param name="list">The list to be sorted.</param>
        /// <param name="reverse">The boolean flag for reversing the list.</param>
        private static void BubbleSort<T>(List<T> list, bool reverse) where T : IComparable<T>
        {
            // Sorting the elements of the list in reverse order
            if (reverse)
            {
                for (int i = 0; i < list.Count - 1; ++i)
                    for (int j = i + 1; j < list.Count; ++j)
                    {
                        if (list[i].CompareTo(list[j]) < 0)
                        {
                            T aux = list[i];
                            list[i] = list[j];
                            list[j] = aux;
                        }
                    }
            }
            // Sorting the elements of the list in ascending order
            else
            {
                for (int i = 0; i < list.Count - 1; ++i)
                    for (int j = i + 1; j < list.Count; ++j)
                    {
                        if (list[i].CompareTo(list[j]) > 0)
                        {
                            T aux = list[i];
                            list[i] = list[j];
                            list[j] = aux;
                        }
                    }
            }
        }

        /// <summary>
        /// Merges two lists togheter in a separate list.
        /// </summary>
        /// <typeparam name="T">Represents any type of elements.</typeparam>
        /// <param name="list">The list where the left and right sided lists will be merged.</param>
        /// <param name="leftList">The left sided list.</param>
        /// <param name="rightList">The right sided list.</param>
        /// <param name="reverse">The boolean flag for reversing the list.</param>
        private static void Merge<T>(List<T> list, List<T> leftList, List<T> rightList, bool reverse) where T : IComparable<T>
        {
            int leftIndex = 0, rightIndex = 0, primaryIndex = 0;

            // Sorting the elements in reverse order
            if (reverse)
            {
                // Compare the left and right sided lists till one of them is completely parsed
                while (leftIndex < leftList.Count && rightIndex < rightList.Count)
                {
                    if (leftList[leftIndex].CompareTo(rightList[rightIndex]) < 0)
                    {
                        list[primaryIndex] = rightList[rightIndex];
                        primaryIndex++;
                        rightIndex++;
                    }
                    else
                    {
                        list[primaryIndex] = leftList[leftIndex];
                        primaryIndex++;
                        leftIndex++;
                    }
                }

                // Copy the remaning elements from the left sided list into the main list
                while (leftIndex < leftList.Count)
                {
                    list[primaryIndex] = leftList[leftIndex];
                    primaryIndex++;
                    leftIndex++;
                }

                // Copy the remaning elements from the right sided list into the main list
                while (rightIndex < rightList.Count)
                {
                    list[primaryIndex] = rightList[rightIndex];
                    primaryIndex++;
                    rightIndex++;
                }
            }
            // Sorting the elements in ascending order
            else
            {
                // Compare the left and right sided lists till one of them is completely parsed
                while (leftIndex < leftList.Count && rightIndex < rightList.Count)
                {
                    if (leftList[leftIndex].CompareTo(rightList[rightIndex]) > 0)
                    {
                        list[primaryIndex] = rightList[rightIndex];
                        primaryIndex++;
                        rightIndex++;
                    }
                    else
                    {
                        list[primaryIndex] = leftList[leftIndex];
                        primaryIndex++;
                        leftIndex++;
                    }
                }

                // Copy the remaning elements from the left sided list into the main list
                while (leftIndex < leftList.Count)
                {
                    list[primaryIndex] = leftList[leftIndex];
                    primaryIndex++;
                    leftIndex++;
                }

                // Copy the remaning elements from the right sided list into the main list
                while (rightIndex < rightList.Count)
                {
                    list[primaryIndex] = rightList[rightIndex];
                    primaryIndex++;
                    rightIndex++;
                }
            }
        }
        /// <summary>
        /// Sorts a list using the merge sort algorithm.
        /// </summary>
        /// <typeparam name="T">Represents any type of elements.</typeparam>
        /// <param name="list">The list to be sorted.</param>
        /// <param name="reverse">The boolean flag for reversing the list.</param>
        private static void MergeSort<T>(List<T> list, bool reverse) where T : IComparable<T>
        {
            if (list.Count <= 1)
            {
                return;
            }

            int mid = list.Count / 2;
            List<T> leftList = list.GetRange(0, mid);
            List<T> rightList = list.GetRange(mid, list.Count - mid);

            // Recursively sort left and right sided lists
            MergeSort(leftList, reverse);
            MergeSort(rightList, reverse);

            // Merge the sorted halves
            Merge(list, leftList, rightList, reverse);
        }

        /// <summary>
        /// Sorts a list using the gnome sort algorithm.
        /// </summary>
        /// <typeparam name="T">Represents any type of elements.</typeparam>
        /// <param name="list">The list to be sorted.</param>
        /// <param name="reverse">The boolean flag for reversing the list.</param>
        private static void GnomeSort<T>(List<T> list, bool reverse) where T : IComparable<T>
        {
            // Sorting the elements of the list in reverse order
            if (reverse)
            {
                int position = 0;
                while (position < list.Count)
                {
                    if (position == 0 || list[position].CompareTo(list[position - 1]) <= 0)
                        position++;
                    else
                    {
                        T aux = list[position];
                        list[position] = list[position - 1];
                        list[position - 1] = aux;
                        position -= 1;
                    }
                }
            }
            // Sorting the elements of the list in ascending order
            else
            {
                int position = 0;
                while (position < list.Count)
                {
                    if (position == 0 || list[position].CompareTo(list[position - 1]) >= 0)
                        position++;
                    else
                    {
                        T aux = list[position];
                        list[position] = list[position - 1];
                        list[position - 1] = aux;
                        position -= 1;
                    }
                }
            }
        }

        /// <summary>
        /// A configurable method for sorting a list.
        /// </summary>
        /// <typeparam name="T">Represents any type of elements.</typeparam>
        /// <param name="list">The list to be sorted.</param>
        /// <param name="type">Defines the sort algorithm that will sort the list. Default value is set to MERGE_SORT.</param>
        /// <param name="reverse">The boolean flag for reversing a list. Default value is set to flase.</param>
        /// <exception cref="Exception">Throws an exception if the specified algorithm type is not known.</exception>
        public static void Sort<T>(List<T> list, bool reverse = false, SortingType type = SortingType.MERGE_SORT) where T : IComparable<T>
        {
            switch (type)
            {
                case SortingType.BUBBLE_SORT:
                    BubbleSort(list, reverse);
                    return;
                case SortingType.MERGE_SORT:
                    MergeSort(list, reverse);
                    return;
                case SortingType.GNOME_SORT:
                    GnomeSort(list, reverse);
                    return;
                default:
                    throw new Exception("The proposed type is not supported!");
            }
        }
    }
}
