import * as PostApi from "../api/PostRequest";
import { postActions } from "../redux/slice/postSlice";
export const getTimelinePosts = (id) => async (dispatch) => {
  dispatch(postActions.RETREIVING_START());

  try {
    const { data } = await PostApi.getTimelinePosts(id);
    dispatch(postActions.RETREIVING_SUCCESS(data));
  } catch (error) {
    console.log(error);
    dispatch(postActions.RETREIVING_FAIL());
  }
};
