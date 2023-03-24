import React, { useEffect, useState } from 'react';
import Tree from 'react-d3-tree';

function Visuals(props) {

    const [tree, setTree] = useState({})

useEffect(() => {
  if (props.repo.commits.length > 0) {
    const rootCommit = props.repo.commits[0]
    const newTree = {
      name: rootCommit.message,
      attributes: {
        branch: rootCommit.branch,
        author: rootCommit.author,
        date: rootCommit.timestamp
      },
      children: []
    }

    for (let i = 1; i < props.repo.commits.length; i++) {
      const commit = props.repo.commits[i]
      const parentCommit = props.repo.commits[i - 1]

      const newCommit = {
        name: commit.message,
        attributes: {
          branch: commit.branch,
          author: commit.author,
          date: commit.timestamp
        },
        children: []
      }

      // Find the parent commit in the tree
      const parentNode = findNode(newTree, parentCommit)

      // Add the new commit to the parent node's children array
      parentNode.children.push(newCommit)
    }

    setTree(newTree)
  } else {
    setTree({})
  }
}, [props.repo.commits])

// Helper function to find a node in the tree
function findNode(node, commit) {
  if (node.attributes.branch === commit.branch && node.name === commit.message) {
    return node
  }

  for (const child of node.children) {
    const foundNode = findNode(child, commit)
    if (foundNode) {
      return foundNode
    }
  }

  return null
}

    function clickInfo(nodeData, evtData) {
        if (evtData.target.parentNode.lastElementChild.classList.contains("clicked")) {
            evtData.target.parentNode.lastElementChild.classList.remove("clicked");
            evtData.target.parentNode.lastElementChild.style.visibility = 'hidden';
        } else {
            evtData.target.parentNode.lastElementChild.classList.add("clicked");
            evtData.target.parentNode.lastElementChild.style.visibility = 'visible';
        }
    }
    function revealInfo(nodeData, evtData) {
        if (!evtData.target.parentNode.lastElementChild.classList.contains("clicked")) {
            evtData.target.parentNode.lastElementChild.style.visibility = 'visible';
        }
    }
    function hideInfo(nodeData, evtData) {
        if (!evtData.target.parentNode.lastElementChild.classList.contains("clicked")) {
            evtData.target.parentNode.lastElementChild.style.visibility = 'hidden';
        }
    }

    return (
        <div>
            <Tree data={tree}
                collapsible={false}
                rootNodeClassName="node__root"
                branchNodeClassName="node__branch"
                leafNodeClassName="node__leaf"
                onNodeMouseOver={revealInfo}
                onNodeMouseOut={hideInfo}
                onNodeClick={clickInfo}
                orientation="horizontal"
            />
        </div>
    );
}

export default Visuals;