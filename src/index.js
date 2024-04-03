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

  const prepend = (value)=> {
    //new node at head
    const newHead = makeNode(value);
    newHead.next = head;
    head = newHead;
  };

  const getSize = ()=> {
    let size = 0;
    currentNode = head;
    while ( currentNode ) { //loop based on existence of next node
      size++;
      currentNode = currentNode.next;
    }
    return size;
  };

  const at = (index)=> {
    currentNode = head; //start at head
    //todo: need to handle out of bounds indexes....
    for ( let currentIndex = 0; currentIndex <= index; currentIndex++ ) {
      if ( currentIndex === index) return currentNode;
      currentNode = currentNode.next; //move to next node
    }
  };

  const pop = ()=> {
    //since this is not a doubly-linked list, we need to traverse the list to the end
    currentNode = head;
    while ( currentNode.next ) {
      tail = currentNode; //before changing currentNode, set tail to point to previous node
      currentNode = currentNode.next; //move to next node
    }
    //once tail is set correctly, pop last node.
    tail.next = null;
  };

  const contains = (value)=> {
    //traverse and search
    currentNode = head;
    while ( currentNode ) {
      if ( currentNode.value === value ) return true;
      currentNode = currentNode.next;
    }
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
  };
};

//testing
const linkedList1 = makeLinkedList();
linkedList1.append( 'banana' );
linkedList1.append( 'pear' );
linkedList1.prepend( 'chocolate bar' );
linkedList1.append( 'orange' );
linkedList1.pop();
lg( JSON.stringify( linkedList1.getHead(), null, '\t' ) ); //wow!!!
lg( `nodes in linked list: ${ linkedList1.getSize() }` );
// lg( `tail of linked list: ${ JSON.stringify( linkedList1.getTail(), null, '\t' ) }` );
// lg( `index 2 node of linked list: ${ JSON.stringify( linkedList1.at(2), null, '\t' ) }` );
lg( `'pear' in list?: ${ linkedList1.contains('pear') }` );
