import uuid from 'uuid/v1'
import superagent from 'superagent';

let API = `${__API_URL__}/api/todo`;

export const todoInitialize = () => dispatch => {
    // console.log(API, 'API -actions line 9')

    superagent.get(API)
        .then(res => dispatch(initAction(res.body)) )
        .catch(console.error);

}

export const todoCreate = payload => dispatch => {

    // payload._id = uuid();

    superagent.post(API)
        .send(payload)
        .then(res => dispatch(createAction(res.body)) )
        .catch(console.error);

};

export const todoUpdate = payload => dispatch => {

    let URL = `${API}/${payload._id}`;

    superagent.put(URL)
        .send(payload)
        .then(res => dispatch(updateAction(res.body)) )
        .catch(console.error);

}

export const todoDelete = payload => dispatch => {

    let URL = `${API}/${payload._id}`

    superagent.delete(URL)
        .send(payload)
        .then(res => dispatch(deleteAction(res.body)))
        .catch(console.error);

    // dispatch( deleteAction(payload) );

}

// export const todoDelete = payload => dispatch => {

//     dispatch( deleteAction(payload) );

// }

const initAction = list => ({
   type: 'INIT',
   payload: list
});

const createAction = todo => ({
    type: 'CREATE',
    payload: todo
});

const updateAction = todo => ({
  type: 'UPDATE',
  payload: todo
});

const deleteAction = todo => ({
  type: 'DELETE',
  payload: todo
});