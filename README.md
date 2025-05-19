ReadMe for my CLI password generator
-------------------------------------

To run the password generator you would open the terminal and ensure you are in the correct directory before entering: node passwordGenerator.js --help        In this case my directory is the script folder.

The help flag should display a menu explaining all of the other flags you can use to generate your password and what exactly they do. The length <num> flag means that when you run the generator again using that flag it will want you to specify a number after the word length, not use the word num. As an example I enter into my terminal: node passwordGenerator.js --length 16 --symbols --uppercase 

These flags produced the password K@+P%%.YIK>[)V-+    obeying all of my flags as it uses uppercase letters, symbols and is 16 characters long. When you generate a password you will see other outputs I have added as well, a password strength and password entropy. Password strength is fairly straight forward, it will tell you how strong of a password has been generated based on how many different flags were used as the more flags you use the more unique your password will generate. Entropy is a measure of how much time it would take someone to guess your password and gain access to your account, 20 or fewer bits being fairly quick while 80 or more bits is considered secure or unguessable. In my example case my password generated with a very strong strength and an entropy of 93.73 bits.


To run the tests for the password generator open the terminal and enter: npm test

This should generate a default password with a low strength and entropy that should have several tests run against it. In this case I got the password xrbdsxxg  that shows as weak with an entropy of 37.60 and passes all seven of my tests. 

