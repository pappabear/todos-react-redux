import request from 'superagent'

const dataService = store => next => action => {
  /*
  Pass all actions through by default
  */
  next(action)
  
  switch (action.type) {
    
    case 'GET_TODO_DATA':
        /*
        In case we receive an action to send an API request, send the appropriate request
        */
        request
        .get('http://localhost:3001/todos')
        .end((err, res) => {
            if (err) {
            /*
            in case there is any error, dispatch an action containing the error
            */
            return next({
                type: 'GET_TODO_DATA_ERROR',
                err
            })
            }
            //console.log('res=' + res)
            //console.log('res.text=' + res.text)
            const data = JSON.parse(res.text)
            /*
            Once data is received, dispatch an action telling the application
            that data was received successfully, along with the parsed data
            */
            next({
            type: 'GET_TODO_DATA_RECEIVED',
            data
            })
        })
        break

    case 'ADD_TODO':
        //console.log('data service ADD_TODO called but empty right now')
        request
        .post('http://localhost:3001/todos')
        .send({ title: action.title, complete: false, owner: 'chip.irek@gmail.com' })
        //.set('X-API-Key', 'foobar')
        .set('Accept', 'application/json')
        .end(function(err, res){
          if (err || !res.ok) {
            console.log('Oh no! error');
          } else {
            console.log('api is happy!  ' + JSON.stringify(res.body));
          }
        })
        break

    /*
    Do nothing if the action does not interest us
    */
    default:
        break
  }

};

export default dataService
