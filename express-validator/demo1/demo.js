// app.post('/',
//   [
//     body('username')
//       .isLength({ min: 6 })
//       .withMessage("Username must be at least 6 characters long"),
    
//     body('age')
//       .isInt({ min: 6 })
//       .withMessage("Age must be a positive integer")
//   ],
//   (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     res.json({ message: 'Hello from POST!', data: req.body });
//   }
// );



let a =10;
function change(a) {
  return a+10;
}
change(a);


console.log(a);