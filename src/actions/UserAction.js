import * as UserApi from "../api/UserRequest";
import { authActions } from "../redux/slice/authSlice";

export const updateUser = (id, formData) => async (dispatch) => {
  dispatch(authActions.UPDATE_START());

  try {
    const { data } = await UserApi.updateUser(id, formData);

    dispatch(authActions.AUTH_SUCCESS(data));
  } catch (err) {
    dispatch(authActions.UPDATE_FAIL());
  }
};

export const followUser = (id, data) => async (dispatch) => {
  dispatch(authActions.FOLLOW_USER(id, data));
  UserApi.followUser(id, data);
};

export const unFollowUser = (id, data) => async (dispatch) => {
  dispatch(authActions.UNFOLLOW_USER(id, data));
  UserApi.unFollowUser(id, data);
};
