import { startGetLIkes, getLIkes, failGetLikes } from '../Action/action';

const url = 'https://warm-inlet-48309.herokuapp.com/api/likes';
const fetchLikes = () => (fetch(url));
const thunkLikes = () => (dispatch) => {
  dispatch(startGetLIkes());
  fetchLikes()
    .then((res) => res.json())
    .then((result) => dispatch(getLIkes(result)))
    .catch((err) => dispatch(failGetLikes(err.message)));
};

export default thunkLikes;
