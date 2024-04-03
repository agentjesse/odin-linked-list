/* Next task:
-
*/
/*
*/

//For Node.js, when importing local modules, include the file extension in the import statement.
import { logToConsole as lg, tableToConsole as tb } from './logger.js'; //shorthand loggers

//node creation fn
const makeNode = (value = null, next = null)=> ( { value, next } );
//linked list creation fn
const makeLinkedList = (head = null, tail = null)=> {
  let currentNode = null; //for traversal methods

  //management fns
  //fn to add node to end of list
  const append = (value)=> {
    //handle empty list
    if ( !head ) {
      head = makeNode(value);
      tail = head;
    } else { //handle non-empty list
      //create new node at tail
      tail.next = makeNode(value);
      tail = tail.next; //set new tail
    }
  };

  //fn to add node at beginning of list
  const prepend = (value)=> {
    //new node at head
    const newHead = makeNode(value);
    newHead.next = head;
    head = newHead;
  };

  //fn to return amount of nodes in list
  const getSize = ()=> {
    let size = 0;
    currentNode = head;
    while ( currentNode ) { //loop based on existence of next node
      size++;
      currentNode = currentNode.next;
    }
    return size;
  };

  //fn to get node from an index
  const at = (index)=> {
    currentNode = head; //start at head
    //todo: need to handle out of bounds indexes....
    for ( let currentIndex = 0; currentIndex <= index; currentIndex++ ) {
      if ( currentIndex === index) return currentNode;
      currentNode = currentNode.next; //move to next node
    }
  };

  //fn to remove tail node of list
  const pop = ()=> {
    //handle empty list
    if ( getSize() === 0 ) {
      lg( 'list empty, nothing to remove' );
      return;
    }
    //handle popping of last node
    if ( getSize() === 1 ) {
      [head, tail, currentNode] = [null, null, null];
      return;
    }
    //since this is not a doubly-linked list, we need to traverse the list to the end
    currentNode = head;
    while ( currentNode.next ) {
      tail = currentNode; //before changing currentNode, set tail to point to previous node
      currentNode = currentNode.next; //move to next node
    }
    //once tail is set correctly, pop last node.
    tail.next = null;
  };

  //fn to check if a value is in the list
  const contains = (value)=> {
    //traverse and compare
    currentNode = head;
    while ( currentNode ) {
      if ( currentNode.value === value ) return true;
      currentNode = currentNode.next; //move to next node
    }
    return false;//when value not in list
  };

  // given a value, get the index of the node if value exists in list
  const findIndex = (value)=> {
    //travese, compare, save index
    let index = 0;
    currentNode = head;
    while ( currentNode ) {
      if ( currentNode.value === value ) return index;
      index++;
      currentNode = currentNode.next; //move to next node
    }
    return null; //handle value not found
  };

  // splice a new node with value into list at an index
  const insertAt = (value, insertIndex)=> {
    //need to handle cases like: when there is no list; when the insertIndex is out of
    //bounds. start by checking if the provided index is in bounds

    // if ( insertIndex < 0 ) throw new Error('Invalid Index');
    // let lastListIndex = getSize() - 1;
    // if ( lastListIndex === -1 && insertIndex === 0 )
    // lg( lastListIndex );

  };

  const toString = ()=> {
    //handle empty list
    if ( getSize() === 0 ) {
      return 'linked list is empty';
    }
    let result = '';
    currentNode = head;
    //traverse, concat
    while ( currentNode ) {
      result += `( ${currentNode.value} ) -> `;
      currentNode = currentNode.next; //move to next node
    }
    result += 'null';
    return result;
  };

  return {
    append,
    prepend,
    getHead: ()=> head,
    getTail: ()=> tail,
    getSize,
    at,
    pop,
    contains,
    findIndex,
    toString,
    insertAt
  };
};

//testing
const linkedList1 = makeLinkedList();
linkedList1.append( 'banana' );
// linkedList1.append( 'pear' );
// linkedList1.append( 'cherry' );
// linkedList1.prepend( 'chocolate bar' );
// linkedList1.append( 'orange' );
linkedList1.pop();
// lg( JSON.stringify( linkedList1.getHead(), null, '\t' ) ); //wow!!!
lg( `nodes in linked list: ${ linkedList1.getSize() }` );
// lg( `tail of linked list: ${ JSON.stringify( linkedList1.getTail(), null, '\t' ) }` );
// lg( `index 2 node of linked list: ${ JSON.stringify( linkedList1.at(2), null, '\t' ) }` );
// lg( `'pear' in list?: ${ linkedList1.contains('pear') }` );
// lg( `'orange' in list?: ${ linkedList1.contains('orange') }` );
// lg( `index of 'cherry' in list: ${ linkedList1.findIndex('cherry') }` );
// lg( `index of 'banana' in list: ${ linkedList1.findIndex('banana') }` );
linkedList1.insertAt('apple', 2);
lg( linkedList1.toString() );
