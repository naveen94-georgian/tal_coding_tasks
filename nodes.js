'use strict'
/**
 * Class Node represent a Tree or a Tree Node.
 */
class Node {
    /**
     * Creates a tree node
     * @param {number} value - value of a tree node.
     */
    constructor(value) {
        this._value = value;
        this._children = [];
    }

    /**
     * Get the value of a tree node.
     * @return {number} - The value of a tree node.
     */
    get value() {
        return this._value
    }

    /**
     * Get the children of a tree node.
     * @return {Node[]} - children of a node.
     */
    get children(){
        return this._children;
    }

    /**
     * Returns True if a tree node has children.
     * @return {boolean}
     */
    get hasChildren(){
        return this._children.length > 0;
    }

    /**
     * Adds a child node to tree node.
     * @param {Node} node 
     */
    addChild(node) {
        this._children.push(node);
    }
}

/**
 * TreeBuilder functions builds a tree from an input array.
 */
function TreeBuilder() {

    /**
     * The onBuildTreeClicked function triggered when the Build Tree button is clicked. 
     * 
     * @return {Node} - The root node of a tree.
     */
    function onBuildTreeClicked(){
        let node = new Node(1);
        // let edgeList = [[4, 5], [5, 3], [1, 5], [2, 1]];
        //let edgeList = [[4, 5], [5, 3], [1, 5], [2, 5]];
        let edgeList = [[4, 5], [5, 3], [1, 5], [2, 5], [6, 2], [2, 7], [3, 8], [9, 3],[3,10]];
        let tree = buildTree(node, edgeList);
        let treeDOM = printTree(tree);
        $('#tf-tree').children().remove();
        $('#tf-tree').append('<ul class="tree">'+treeDOM+'</ul>');
        return tree;
    };

    /**
     * The function buildTree builds a tree with the input list of edges and
     * returns the root node of a tree.
     * 
     * @param {Node} node - Root node
     * @param {number[][]} edgeList - List of edges.
     * @returns {Node} - Root node of the built tree.
     */
    function buildTree(node, edgeList) {
        let edges = edgeList.filter((item) => item.indexOf(node.value) >= 0);
        edgeList = edgeList.filter((item) => edges.indexOf(item) < 0);
        edges.forEach((edge) => {
            let childNode = new Node(edge.filter((item) => item != node.value)[0]);
            node.addChild(childNode);
            buildTree(childNode, edgeList);
        });
        return node;
    };

    /**
     * Generates a DOM model for the Tree.
     * 
     * @param {Node} tree 
     * @returns {string} - DOM string of the tree.
     */
    function printTree(tree){
        let treeDOM = '';
        if(tree.hasChildren){
            treeDOM += treeDOM + `<li><span>${tree.value}</span><ul>`;
            tree.children.forEach((item) => {
                treeDOM += printTree(item, treeDOM);
            });
            treeDOM += '</ul></li>'
        }else{
            treeDOM += `<li><span>${tree.value}</span></li>`;
        }
        return treeDOM;
    };

    /**
     * The function bindEvents binds the events triggered in the view.
     */
    TreeBuilder.prototype.bindEvents = () => {
        $('#btn_build_tree').on('click', () => {
            $('#div_tree').removeClass('d-none');
            onBuildTreeClicked();
        });
    };
};

/**
 * Called once the document is loaded.
 */
$(() => {
    new TreeBuilder().bindEvents();
});