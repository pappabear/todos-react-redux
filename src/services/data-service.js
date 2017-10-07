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
        request
        .post('http://localhost:3001/todos')
        .send({ title: action.title, complete: false, owner: 'chip.irek@gmail.com' })
        //.set('X-API-Key', 'foobar')
        .set('Accept', 'application/json')
        .end(function(err, res){
          if (err || !res.ok) {
            console.log('Oh no! error ' + err);
          } else {
            console.log('SuperAgent is happy, and API call was successful!  ' + JSON.stringify(res.body));
          }
        })
        break

    case 'UPDATE_TODO':
      request
      .put('http://localhost:3001/todos/' + action.id)
      .send({ title:action.title })
      //.set('X-API-Key', 'foobar')
      .set('Accept', 'application/json')
      .end(function(err, res){
        if (err || !res.ok) {
          console.log('Oh no! error ' + err);
        } else {
          console.log('SuperAgent is happy, and API call was successful!  ' + JSON.stringify(res.body));
        }
      })
      break

    case 'TOGGLE_TODO':
        request
        .put('http://localhost:3001/todos/' + action.id)
        .send({ complete: action.complete })
        //.set('X-API-Key', 'foobar')
        .set('Accept', 'application/json')
        .end(function(err, res){
          if (err || !res.ok) {
            console.log('Oh no! error ' + err);
          } else {
            console.log('SuperAgent is happy, and API call was successful!  ' + JSON.stringify(res.body));
          }
        })
        break

    case 'DELETE_TODO':
        request
        .delete('http://localhost:3001/todos/' + action.id)
        .end(function(err, res){
          if (err || !res.ok) {
            console.log('Oh no! error ' + err);
          } else {
            console.log('SuperAgent is happy, and API call was successful!  ' + JSON.stringify(res.body));
          }
        })
        break

    case 'CLEAR_COMPLETED':
        request
        .put('http://localhost:3001/todos/clear_complete')
        .end(function(err, res){
          if (err || !res.ok) {
            console.log('Oh no! error ' + err);
          } else {
            console.log('SuperAgent is happy, and API call was successful!  ' + JSON.stringify(res.body));
          }
        })
        break

    /*
    Do nothing if the action does not interest us
    */
    default:
        console.log('dataService default() because ' + action.type)
        break
  }

};

export default dataService
