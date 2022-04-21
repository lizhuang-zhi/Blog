# 算法

## 冒泡排序

> 描述：就像水冒泡一样，每冒泡一次就将最大的元素冒泡到数组末尾，这样冒泡`len - 1`次，就可以得到一个排序后的数组

```js
/* 
    冒泡排序
*/
let arr = [11, 4, 5, 8, 2];

function foo(array) {
    // 第一层执行次数
    for(let i = 0; i < array.length - 1; i++) {
        // 第二层进行冒泡
        for(let j = 0; j < array.length - 1; j++) {
            if(array[j] > array[j + 1]) {
                let tmp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = tmp;
            }
        }
    }
    return array;
}

let res = foo(arr);
console.log(res);  // [2, 4, 5, 8, 11]
```

现在第二层的循环，是每一次都从第一个比较到最后一个，其实我们发现，每次我们都会将最大的一个元素冒泡到数组的末尾，所以可以在第二次循环时，只从0开始，比较到前面的已经排为最大的元素的前面即可

```js
/* 
    冒泡排序
*/
let arr = [11, 4, 5, 8, 2];

function foo(array) {
    // 第一层执行次数
    for(let i = 0; i < array.length - 1; i++) {
        // 第二层进行冒泡(改动就是这里 -i )
        for(let j = 0; j < array.length - 1 - i; j++) {
            if(array[j] > array[j + 1]) {
                let tmp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = tmp;
            }
        }
    }
    return array;
}

let res = foo(arr);
console.log(res);  // [2, 4, 5, 8, 11]
```

## 选择排序

> 描述：从数组的头部开始，比较当前元素与后面的元素，将最小的元素换置前面，这样执行`len - 1`次

```js
let arr = [11, 4, 5, 8, 2];

function bar(array) {
    let len = array.length;
    for(let i = 0; i < len - 1; i++) {
        // 比较元素大小，将最小的元素移至下标 i 处
        for(let j = i + 1; j < len; j++) {
            if(array[i] > array[j]) {
                let tmp = array[i];
                array[i] = array[j];
                array[j] = tmp;
            }
        }
    }
    return array;
}

let res = bar(arr);
console.log(res);
```

因为在内层循环会频繁的交换元素，可以稍作改动，让我的内层循环遍历记录最小元素的下标索引即可，内层循环结束后，再进行交换元素

```js
let arr = [11, 4, 5, 8, 2];

function bar(array) {
    let len = array.length;
    for(let i = 0; i < len - 1; i++) {
        // 记录本次遍历元素的最小值索引
        let minValIndex = i;
        for(let j = i + 1; j < len; j++) {
            if(array[minValIndex] > array[j]) {
                minValIndex = j;
            }
        }
        // 交换一次即可
        let tmp = array[i];
        array[i] = array[minValIndex];
        array[minValIndex] = tmp;
    }
    return array;
}

let res = bar(arr);
console.log(res);
```

## 插入排序

> 描述：从未排序的位置开始（第二个位置），将当前元素设为比较值，从他的前一个往前遍历，如果前面的元素比比较值大，就将该元素往后移一位，最后找到比比较值小的元素，将比较值放在这个小的元素的后面即可。

```js
/* 
    插入排序
*/
let arr = [11, 4, 5, 8, 2];

function foo(array) {
    for(let i = 1; i < array.length; i++) {
        // 记录要比较的值
        let compareVal = array[i];
        // 记录要比较值的前一个元素下标索引
        let j = i - 1;
        // 用 compareVal 依次从下标 j 比较到下标 0
        while(j >= 0 && array[j] > compareVal) {
            // 当前下标 j 元素如果大于比较值，就将下标 j 元素往后移动
            array[j + 1] = array[j];
            j--;
        }
        // 最后将比较值放在小于它的后一位置
        // j 下标最后记录的是比比较值小的元素的下标
        array[j + 1] = compareVal;
    }    
    return array;
}

let res = foo(arr);
console.log(res);
```

## 快速排序

> （1）在数据集之中，选择一个元素作为"基准"（pivot）。
>
> （2）所有小于"基准"的元素，都移到"基准"的左边；所有大于"基准"的元素，都移到"基准"的右边。
>
> （3）对"基准"左边和右边的两个子集，不断重复第一步和第二步，直到所有子集只剩下一个元素为止。

```js
/* 
    快速排序
*/
let arr = [11, 4, 5, 8, 2];

function quickSort(array) {
    // 终止条件
    if(array.length <= 1) return array;

    // 记录基准数 povit
    let povitIndex = Math.floor(array.length / 2);
    let povit = array.splice(povitIndex, 1)[0];

    // 声明两个数组，分别存放小于基准数的数和大于基准数的数
    let left = [],
        right = [];

    // 遍历数组，将对应的数存入数组中
    for(let item of array) {
        if(item > povit) {
            right.push(item);
        }else {
            left.push(item);
        }
    }

    // 再递归遍历基准数的左右数组
    return quickSort(left).concat(povit, quickSort(right));
}

let res = quickSort(arr);
console.log(res);
```

## 顺序搜索

搜索效率最低的搜索

```js
let arr = [11, 6, 2, 23, 34, 13];

function search(array, target) {
    for(let i = 0; i < array.length; i++) {
        if(array[i] == target) {
            return i;
        }
    }
    return -1;
}

console.log(search(arr, 8));  // -1
console.log(search(arr, 6));  // 1
console.log(search(arr, 2));  // 2
```

## 二分搜索

首先数组需要是有序数组！！

```js
/* 
    二分查找：首先数组需要排序
*/
let arr = [2, 6, 11, 13, 23, 34];

function binarySearch(array, target) {
    let left = 0, 
    right = array.length - 1;
    while(left <= right) {
        let mid = Math.floor((left + right) / 2);
        if(target > array[mid]) {
            left = mid + 1;
        }else if(target < array[mid]) {
            right = mid - 1;
        }else {
            return mid;
        }
    }
    return -1;
}

console.log(binarySearch(arr, 6));  // 1
console.log(binarySearch(arr, 23));  // 4
console.log(binarySearch(arr, 22));  // -1
```

## 回溯算法总结

> 回溯三部曲

1. 递归函数的返回值与参数

2. 回溯函数的终止条件

3. 单层搜索的过程（回溯法的搜索过程就是一个树型结构的遍历过程，for循环用来横向遍历，递归的过程是纵向遍历）

4. 剪枝

> 函数模版

```js
void backtracking(参数) {
    if（剪枝条件）return;

    if (终止条件) {
        存放结果;
        return;
    }

    for (选择：本层集合中元素（树中节点孩子的数量就是集合的大小）) {
        处理节点;
        backtracking(路径，选择列表); // 递归
        回溯，撤销处理结果
    }
}
```

> <mark>总结</mark>

1. 涉及到剪去同层重复元素时，需要先排序数组，然后进行操作！

2. 常见的全排列问题，我们可以借助 used（记录使用过的元素数组）进行求解！

## 深度优先搜索算法（DFS）

需要非常熟悉的前、中、后序遍历的过程

这样的题，往往分两种：

1. 直接在遍历的过程中操作

   举例子：[二叉搜索树的最小绝对差](https://leetcode-cn.com/problems/minimum-absolute-difference-in-bst/)

   ```js
   /**
    * @param {TreeNode} root
    * @return {number}
    */
   var getMinimumDifference = function(root) {
       // 记录指向前一个结点的指针
       let pre = null;
       // 记录最小差值
       let minDiff = Infinity;
       dfs(root);
       return minDiff;
   
       function dfs(node) {
           if(!node) return node;
   
           dfs(node.left);
           if(pre == null) {
               pre = node;
           }else {
               let dif = Math.abs(node.val - pre.val);
               if(dif < minDiff) {
                   minDiff = dif;
               }
               pre = node;
           }
           dfs(node.right);
       }
   };
   ```

2. 递归有返回值，再操作

   举例子：[二叉树的最近公共祖先](https://leetcode-cn.com/problems/er-cha-shu-de-zui-jin-gong-gong-zu-xian-lcof/)

   ```js
   /**
    * @param {TreeNode} root
    * @param {TreeNode} p
    * @param {TreeNode} q
    * @return {TreeNode}
    */
   var lowestCommonAncestor = function(root, p, q) {
       if(!root || root == p || root == q) return root;
       let left = lowestCommonAncestor(root.left, p, q);
       let right = lowestCommonAncestor(root.right, p, q);
       if(left && right) return root;
       if(left) return left;
       if(right) return right;
   };
   ```

## 双指针总结

1. 左右指针（一般数组中可以使用，将两个指针分别置于数组的开头和末尾，然后操作）

   代表题目：

   * [剑指 Offer 21. 调整数组顺序使奇数位于偶数前面](https://leetcode-cn.com/problems/diao-zheng-shu-zu-shun-xu-shi-qi-shu-wei-yu-ou-shu-qian-mian-lcof/)

   * [剑指 Offer 57. 和为s的两个数字](https://leetcode-cn.com/problems/he-wei-sde-liang-ge-shu-zi-lcof/)

   * [143. 重排链表](https://leetcode-cn.com/problems/reorder-list/)（这题就是先把链表存为数组，然后左右指针）

2. 快慢指针（分两种）

   * 一种是slow跑的慢（一次走一步），fast跑的快（一次走两步）

     * 一般在涉及<mark>环形</mark>的题目时，会用到

     举例子：

     1. [141. 环形链表](https://leetcode-cn.com/problems/linked-list-cycle/)

     2. [142. 环形链表 II](https://leetcode-cn.com/problems/linked-list-cycle-ii/)

   * 一种是fast先跑几步，然后同时走

     * 一般在寻在倒数的节点时可用

     举例子：[19. 删除链表的倒数第 N 个结点](https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/)

3. 面对链表的题型时，如果涉及的想法很接近但是有漏洞时，不妨考虑下是否需要一个虚拟节点

   举例涉及虚拟节点的题目：

   1. [剑指 Offer 25. 合并两个排序的链表](https://leetcode-cn.com/problems/he-bing-liang-ge-pai-xu-de-lian-biao-lcof/)

   2. [19. 删除链表的倒数第 N 个结点](https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/)

   3. [86. 分隔链表](https://leetcode-cn.com/problems/partition-list/)

