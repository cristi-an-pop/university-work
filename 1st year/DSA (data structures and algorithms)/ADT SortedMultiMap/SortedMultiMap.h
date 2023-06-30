#pragma once
//DO NOT INCLUDE SMMITERATOR

//DO NOT CHANGE THIS PART
#include <vector>
#include <utility>
typedef int TKey;
typedef int TValue;
typedef std::pair<TKey, TValue> TElem;
typedef TValue(*Transformer)(TKey, TValue);
#define NULL_TVALUE -111111
#define NULL_TELEM pair<TKey, TValue>(-111111, -111111)
using namespace std;
class SMMIterator;
typedef bool(*Relation)(TKey, TKey);

class SortedMultiMap {
    friend class SMMIterator;

private:
    struct BSTNode {
        TElem information;
        int left, right;

        BSTNode();

        BSTNode(TElem information, int left, int right);

        const TKey& getKey() const;

        const TValue& getValue() const;
    };

    BSTNode* elements;
    Relation relation;

    int length, capacity;
    int root;
    int firstEmpty;

    void resizeArray();

    int insertRecursive(int node, TElem new_element);

    void computeFirstEmptyAfterAddition();

    int findMinimumElement(int node);

    int removeRecursive(int node, TElem element, bool& removed);

public:

    SortedMultiMap(Relation r);

    void add(TKey c, TValue v);

    vector<TValue> search(TKey c) const;

    bool remove(TKey c, TValue v);

    int size() const;

    bool isEmpty() const;

    //replaces the value of every key, with the result given by a function invoked on the pair
    void replaceAll(Transformer t);

    void replaceAllRecursive(int node, Transformer t);

    SMMIterator iterator() const;

    ~SortedMultiMap();
};