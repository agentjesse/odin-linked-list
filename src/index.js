/* Next task:
- insertAt fn need to handle insertions at the head and tail
*/
/**/

//For Node.js, when importing local modules, include the file extension in the import statement.
import { logToConsole as lg, tableToConsole as tb } from './logger.js'; //shorthand loggers

//node creation fn
const makeNode = (value = null, next = null)=> ( { value, next } );
//linked list creation fn
const makeLinkedList = (head = null, tail = null)=> {
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

  //fn to return amount of nodes in list.
  const getSize = ()=> {
    let size = 0;
    let currentNode = head;
    while ( currentNode ) { //loop based on existence of next node
      size++;
      currentNode = currentNode.next;
    }
    return size;
  };

  //fn to get node from an index
  const at = (index)=> {
    let currentNode = head;
    if ( index < 0 || index >= getSize() ) {
      throw new Error('Index outside list bounds [list is zero-indexed]');
    }
    for ( let currentIndex = 0; currentIndex <= index; currentIndex++ ) {
      if ( currentIndex === index) return currentNode;
      currentNode = currentNode.next; //move to next node..broken
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
      [head, tail] = [null, null];
      return;
    }
    //since this is not a doubly-linked list, we need to traverse the list to the end
    let currentNode = head;
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
    let currentNode = head;
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
    let currentNode = head;
    while ( currentNode ) {
      if ( currentNode.value === value ) return index;
      index++;
      currentNode = currentNode.next; //move to next node
    }
    return null; //handle value not found
  };

  // splice a new node with value into list at an index
  const insertAt = (value, insertIndex)=> {
    lg( 'value to insert: ' + value );
    // throw error if the list does not have the indexed space created.
    if ( insertIndex < 0 || insertIndex >= getSize() ) {
      //todo: log message to offer using append option when list is empty
      throw new Error('Index outside list bounds');
    }
    // todo: handle node insertions at head and tail
    
    //handle insertion at an index within the list that is not head or tail.
    const nextNode = at(insertIndex);
    const previousNode = at(insertIndex - 1);
    //create new node with value and the nextNode
    previousNode.next = makeNode(value, nextNode);

  };

  const toString = ()=> {
    //handle empty list
    if ( getSize() === 0 ) {
      return 'linked list is empty';
    }
    let result = '';
    let currentNode = head;
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
linkedList1.append( 'pear' );
// linkedList1.prepend( 'chocolate bar' );
linkedList1.append( 'cherry' );
// linkedList1.pop();
// lg( JSON.stringify( linkedList1.getHead(), null, '\t' ) ); //wow!!!
lg( `nodes in linked list: ${ linkedList1.getSize() }` );
// lg( `tail of linked list: ${ JSON.stringify( linkedList1.getTail(), null, '\t' ) }` );
// lg( `node at index 1 of linked list: ${ JSON.stringify( linkedList1.at(1), null, '\t' ) }` );
// lg( `'pear' in list?: ${ linkedList1.contains('pear') }` );
// lg( `'orange' in list?: ${ linkedList1.contains('orange') }` );
// lg( `index of 'cherry' in list: ${ linkedList1.findIndex('cherry') }` );
// lg( `index of 'banana' in list: ${ linkedList1.findIndex('banana') }` );

linkedList1.insertAt('apple', 1);
lg( linkedList1.toString() );
