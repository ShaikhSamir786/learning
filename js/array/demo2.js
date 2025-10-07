// 4.2 Use Array#push instead of direct assignment to add items to an array

// Reduces mistakes – avoids off-by-one errors in manual indexing.
       // arr[arr.length + 1] = item; // creates a hole in the array       
// Prevents sparse arrays – direct assignment with a wrong index can create holes ([ <3 empty items>, "x" ]).
        const arr = [];
        arr[5] = 'x'; // [ <5 empty items>, 'x' ]

        console.log(arr);
        console.log('Length of arr:', arr.length);


        console.log('=========================================');
        

// array push
// Clearer intent – push() explicitly means "add to the end of the array".
// Automatically manages the index – no need to calculate arr.length manually.
     const item = []

    item.push('1'); // ['1']
    console.log('item:', item);
    console.log('length of item', item.length);
    
    

// More maintainable – easier for other developers to read and understand.
// Consistent with standard array operations – integrates well with methods like pop(), shift(), etc
