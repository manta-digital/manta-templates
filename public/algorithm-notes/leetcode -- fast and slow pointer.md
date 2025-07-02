array of n+1 integers in 1..n.  only 1 is repeated.  this means it has every other integer, so it contains 1..n.  the sum of the first n integers is (n * (n+1))/2.  add up all the numbers.  subtract (n*(n+1))/2 from it.  that difference is the repeated number

1 2 3 4 5 4
sum: 19
sum (no repeats): 15.  difference: 4
ah, apparently only one number can be repeated, but it can be repeated multiple times and this is supposed to be a 'fast and slow pointers' problem.

okay so use space for 2 elements, one for the fast pointer one for the slow.  just store the index into the array, we can always access the value in O(1) time.

start fast, slow pointers at indices 1, 2 (using 1-based because the problem is 1-based).  if array.val(fast) == array.val(slow) then this is the repeated value.  we might want to store it.  or are we just done then, we don't have to do anything with it other than find it?

if not equal, move fast pointer.  keep moving fast pointer this way and see if you find the equal.  if not, move slow pointer and repeat.  n-squared seems horrible surely there is something better.  if slow pointer hits n you are done but that only saves one iteration (done because there are n+1 things at least 1 must repeat so if you haven't found by 2nd to last then it and last are the same).

is there a better way?  surely there is?  or maybe not.  we can't sort, and the repeated number may occur more than once.  on each iteration we start at the new slow index, as we already know the previous numbers will match nothing.  or do we?  suppose we have all numbers in order, and the last 2 repeat.  First we check 1 against everything an find no match.  then we check 2 against everything.  we don't need to check it against 1 so we start at index 2.  then we go to index 3 and check everything.  same deal we already know 1 and 2 don't match.

does this still work if numbers can be anything?  for example if we have 10 3 6 (etc)?  First we check and find no matches for 10, then we check matches for 3 and we don't need to check 10.  So yes it provides a reasonable but not amazing optimization by speeding up the fast pointer.  
3