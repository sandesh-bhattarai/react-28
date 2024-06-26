# Hook
- are the functions defined for some special use cases
- hook functions always start with 'use' keyword in their name 
- hook can only be used in functional components
- Basic hooks that are used in react in many way are: 
  - State Hook 
    - to maintain a state in any react functional component 
    - useState()
    - useState hook return two data, a. state data b. stateFunction to manipulate state data in an array
    - whenever any state value/variable in our component gets updated/changed then the component will re-render
    - You can never update/change/modify/manipulate your any state variable within the component, without rendering your component once

  - Effect Hook
    - to listen or execute/redner the component whenever there is any change on any states/dependency defined in the component 
    - useEffect() is the effect hook 
    - there are 3 major implementation in useEffect hook 
    - useEffect(() => { })   ===> This hook executes on any state change of the component 
    - useEffect(() => {}, [])   ===> This hook executes only once when the component is loaded/mounted
    - useEffect(() => {}, [depencylist,...]) => this hook exectues only when any of the mentioned dependencylist gets changed 

###
Cookie => Volatile 
  * Cookie gets destroyed when mature 
  * cookie has a limitation of 50 per domain 
  * Cookie are stored in always key value but as a string data 
  
  document.cookie="key=value;expires=timeIso;"
  document.cookie="key1=value;expires=timeIso;"

  const cookie = document.cookie;
  // key=value;key1=value

LocalStorage 
  -> size => 5mb of string data 
  -> any no 
  -> persist 
  -> after forceful clear, gets deleted

  localStorage.setItem('key', 'value as string'),
  localStorage.getItem("key")
  localStorage.removeItem("key")
  localStorage.clear();

  sessionStorage.setItem('key', 'value as string'),
  sessionStorage.getItem("key")
  sessionStorage.removeItem("key")
  sessionStorage.clear();

  


React Component  ====> Event trigger ======> Local State =====> Multiple component use 

                        Global State Management tool
React Component ====>   Redux - state - reduucers 





UI(react component) ======> Action =========> State