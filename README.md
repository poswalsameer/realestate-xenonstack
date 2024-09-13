# realestate-xenonstack

### DESCRIPTION:
This web application serves the purpose of listing different available properties worldwide.

### TECH STACK USED:
Next.js is the primary framework used to build this application. 
The authentication part is handled by Next-Auth, which enables the user to sign in using their google accounts. 
Styling is done using Tailwind CSS. ShadCN and Aceternity UI are used to get pre-built components to simplify development.

### NAVIGATING THE APPLICAITON:
The users first land on the landing page, where they can login directly into the application through the help of Next-Auth. Route protection is taken care of by Next-Auth only. As soon as they sign in, they get to see all the property listings worldwide. A logout button is also given on the navbar to logout the user back to the homepage.

### FUTURE IMPROVEMENTS:
A recommendation model can be integrated using an AI algorithm to show only favourable listings to a particular user to maximize the chances of selling of properties.
