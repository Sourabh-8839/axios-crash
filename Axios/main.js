//Axios Global
  axios.defaults.headers.common['X-auth-tokken']='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

// GET REQUEST
function getTodos() {

    // axios({
    //     method:'get',
    //     url:'https://jsonplaceholder.typicode.com/todos',
    //     params :{
    //         _limit:5
    //     }
    // })
    // .then(res=>showOutput(res))
    // .catch(err=>console.log(err));

    // axios.get('https://jsonplaceholder.typicode.com/todos', {params :{_limit:5}})
    // .then(res=>showOutput(res))
    // .catch(err=>console.log(err));

    
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=6',{timeout:5000})
    .then(res=>showOutput(res))
    .catch(err=>console.log(err));
    console.log('GET Request');
  }
  
  // POST REQUEST
  function addTodo() {
    // axios({
    //     method:'post',
    //     url:'https://jsonplaceholder.typicode.com/todos',
    //     data:{
    //         title:'radhe',
    //         completed:false,
    //     }
    // })
    // .then(res=>showOutput(res))
    // .catch(err=>console.log(err));

    axios.post('https://jsonplaceholder.typicode.com/todos',{title:'radhe',
    completed:false,})
    .then(res=>showOutput(res))
    .catch(err=>console.log(err));
    console.log('POST Request');
  }
  
  // PUT/PATCH REQUEST
  function updateTodo() {
    axios.patch('https://jsonplaceholder.typicode.com/todos/1',{
        title:'updated radhe',
        completed:true,
            })
    .then(res=>showOutput(res))
    .catch(err=>console.log(err));
    console.log('POST Request');
    console.log('PUT/PATCH Request');
  }
  
  // DELETE REQUEST
  function removeTodo() {
    axios.delete('https://jsonplaceholder.typicode.com/todos/1')
    .then(res=>showOutput(res))
    .catch(err=>console.log(err));
    console.log('DELETE Request');
  }
  
  // SIMULTANEOUS DATA
  function getData() {
    axios.all([
        axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'),
        axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
    ])
    .then(axios.spread((todos,post)=>
        showOutput(post)))
    .catch(err=>console.log(err));

    console.log('Simultaneous Request');
  }
  
  // CUSTOM HEADERS
  function customHeaders() {
    
    const config = {
      headers:{
        'Content-Type':'application/Json',
        Authorization:'sometoken'
      }
    }

    axios.post('https://jsonplaceholder.typicode.com/todos',{title:'radhe',
    completed:false,},config)
    .then(res=>showOutput(res))
    .catch(err=>console.log(err));
    console.log('POST Request');
  }
  
  // TRANSFORMING REQUESTS & RESPONSES
  function transformResponse() {
    const option={
        method:'post',
        url:'https://jsonplaceholder.typicode.com/todos',
        data:{
          title:'hello world',
        },
        transformResponse:axios.defaults.transformResponse.concat(data=>{
          data.title=data.title.toUpperCase();

          return data;
        })
    }

    axios(option).then(res=>showOutput(res));
  }
  
  // ERROR HANDLING
  function errorHandling() {
    
     
    axios.get('https://jsonplaceholder.typicode.com/todos5')
    .then(res=>showOutput(res))
    .catch(err=>{
      if(err.response){
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);

        if(err.response.status===404){
          alert('Error:Not find in the server');
        }
        else if(err.request){
          console.error(err.request)
        }
        else{
          console.error(err.message);
        }
      }
    });
  }
  
  // CANCEL TOKEN
  function cancelToken() {
    
    const source = axios.CancelToken.source();

    axios.get('https://jsonplaceholder.typicode.com/todos',
    {
      cancelToken:source.token
    })
    .then(res=>showOutput(res))
    .catch(err=>{
      if(axios.isCancel(err)){
        console.log('Request Cancel',err.message);
      }

      });

      if(true){
        source.cancel('Request Canceled !')
      }
  }
  
  // INTERCEPTING REQUESTS & RESPONSES

  axios.interceptors.request.use((config)=>{
    console.log(`${config.method.toUpperCase()} request sent to ${config.url} at ${new Date().getTime()}`);

    return config;
  },
  error=>{
     return Promise.reject(error);
  });
  
  // AXIOS INSTANCES

    const axiosInstances = axios.create({
      baseURL:'https://jsonplaceholder.typicode.com'
    })

    // axiosInstances.get('/comments').then(res=>showOutput(res));

  // Show output in browser
  function showOutput(res) {
    document.getElementById('res').innerHTML = `
    <div class="card card-body mb-4">
      <h5>Status: ${res.status}</h5>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Headers
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.headers, null, 2)}</pre>
      </div>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Data
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.data, null, 2)}</pre>
      </div>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Config
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.config, null, 2)}</pre>
      </div>
    </div>
  `;
  }
  
  // Event listeners
  document.getElementById('get').addEventListener('click', getTodos);
  document.getElementById('post').addEventListener('click', addTodo);
  document.getElementById('update').addEventListener('click', updateTodo);
  document.getElementById('delete').addEventListener('click', removeTodo);
  document.getElementById('sim').addEventListener('click', getData);
  document.getElementById('headers').addEventListener('click', customHeaders);
  document
    .getElementById('transform')
    .addEventListener('click', transformResponse);
  document.getElementById('error').addEventListener('click', errorHandling);
  document.getElementById('cancel').addEventListener('click', cancelToken);