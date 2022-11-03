import * as UploadApi from "../api/UploadRequest";
import { postActions } from "../redux/slice/postSlice";

export const uploadPost = (data) => async (dispatch) => {
  dispatch(postActions.UPLOAD_START());

  try {
    const newPost = await UploadApi.uploadPost(data);
    dispatch(postActions.UPLOAD_SUCCESS(newPost.data));
  } catch (error) {
    console.log(error);
    dispatch(postActions.UPLOAD_FAIL());
  }
};
