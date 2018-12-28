# Currency Exchange

This project contains the code for a currency exchange wrapped into a single, exportable component. The component is developed for mobile first for SEO purposes, and then adapts when viewports grow larger.

I want to adress the mix between traditional function declarations (`function x()`) and the ES6 arrow functions (`x = () => {}`). I am only using arrow functions when the function needs acces to the `this` scope. As creating an arrow function, create a duplicate function, overuse of arrow functions can be taxing on memory. This is why I use the traditional function declarations when the functions does not need to access `this`.

I decided not to use Redux for this project, as the project was simply to small to warrent the use of a giant framework like Redux. The amount of overhead and boilerplate code it adds, did not seem appropriate for this exact project.

To check out the component, just run `yarn start --reset-cache` in the root. The component will lay out itself appropriatly to the container in which it is wrapped, using only percentage delimiters for sizes. This makes sure that it adheres to a wrapping component rather than the screen size itself.
