const fs = require('fs');
const {flatten} = require('underscore');
const input = fs.readFileSync(__dirname + '/input.txt', 'utf-8').trim().split('\n');

function getTree (input) {
  let re = /\((\d+)\)/;
  return input.reduce((tree, line) => {
    let key = line.slice(0, line.indexOf(' '));
    
    let weight = Number(re.exec(line)[1]);
    let children = line.includes('-') ? line.slice(line.indexOf('-') + 3).split(' ').map(c => c.replace(',', '')) : [];
    tree[key] = {
      children, weight, sumWeight: weight
    }
    return tree;
  }, {});
}

// Which node has children, but doesn't appear in the child list of anyone else?

function findRootNode (tree) {
  // also adds the parent property to the tree
  let childArrs = [];
  const nodesWithChilden = Object.keys(tree).reduce((withChil, node) => {
    if (tree[node].children.length)  {
      withChil.push(node);
      childArrs.push(tree[node].children);
      tree[node].children.forEach(child => {
        tree[child].parent = node;
      });
    }
    return withChil
  }, []);
  childArrs = flatten(childArrs);
  return nodesWithChilden.find(node => {
    return !childArrs.includes(node);
  });
}

function getCombinedChildWeight (tree, node) {
  let children = tree[node].children;
  return children.reduce((acc, child) => (acc + tree[child].weight), 0);
}

function addSumToCurrNodeAndParents (tree, currNode, sum) {
  let cur = tree[currNode];
  while (cur && cur.parent) {
    cur.sumWeight += sum;
    let parentStr = cur.parent;
    cur = tree[parentStr];
  }
}

const tree = getTree(input);
const rootNode = findRootNode(tree);

// Travel to each Node and add the weights of the combined direct children onto the parents

function BFS (tree, startNode) {
  let queue = [startNode];
  while (queue.length > 0) {
    let currNode = queue.shift();
    let w = getCombinedChildWeight(tree, currNode);
    addSumToCurrNodeAndParents(tree, currNode, w);
    queue = queue.concat(tree[currNode].children)
  }
}

BFS(tree, rootNode);

// BFS to find first node where one of the children is the wrong weight.
function findFirstUnbalanced (tree, startNode) {
  let q = [startNode];
  let unbalanced;
  while (!unbalanced) {
    let cur = q.shift();
    console.log(tree[cur]);
    let children = tree[cur].children;
    unbalanced = findNodeOfWrongWeight(tree, children);
    q = q.concat(children);
  }
  
  // from the first unbalanced node
  // amongst its children, find the unbalanced one
  // keep doing this until all the children are balanced
  // the final unbalanced child must have its weight adapted
  function walkThroughUnbalanced (tree, children, startNode) {
    let unbalanced = findNodeOfWrongWeight(tree, children);
    if (unbalanced === false) return startNode;
    return walkThroughUnbalanced(tree, tree[unbalanced.unbalanced].children, unbalanced.unbalanced);
  }

  let topUnbalanced = walkThroughUnbalanced(tree, tree[unbalanced.unbalanced].children, unbalanced.unbalanced);

}

let res = findFirstUnbalanced(tree, rootNode);


function findNodeOfWrongWeight (tree, arr) {
  let freq = arr.reduce((acc, n) => {
    let v = tree[n].sumWeight;
    acc[v] ? acc[v].push(n) : acc[v] = [n];
    return acc;
  }, {});
  if (Object.keys(freq).length === 1) return false;
  else {
    let unbalanced = findOddNode(freq);
    return {
      unbalanced,
      siblings: arr.filter(n => n !== unbalanced)
    };
  } 

  function findOddNode (freq) {
    for (let key in freq) {
      if (freq[key].length === 1) return freq[key].pop(); 
    }
  }
}