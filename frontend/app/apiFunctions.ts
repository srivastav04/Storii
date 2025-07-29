import axios from "axios";

const BASEURL = process.env.NEXT_PUBLIC_URL;
console.log(BASEURL);

export const checkUser = async (userId: string): Promise<any> => {
  const res = await axios.get(`${BASEURL}/user/check-auth/${userId}`);
  return res.data;
};

export const setProfile = async (formData: FormData): Promise<any> => {
  try {
    const res = await axios.post(`${BASEURL}/user/setProfile`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (err: any) {
    const status = err.response?.status;
    const message = err.response?.data! || "Something went wrong";

    throw {
      status,
      message,
      full: err.response?.data,
    };
  }
};

export const createPost = async (data: {
  [key: string]: string;
}): Promise<any> => {
  try {
    const res = await axios.post(`${BASEURL}/post/create`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("in api", res.data);

    return res.data;
  } catch (err: any) {
    const status = err.response?.status;
    const message = err.response?.data! || "Something went wrong";

    throw {
      status,
      message,
      full: err.response?.data,
    };
  }
};

export const uploadToImageKit = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("fileName", file.name);

  const res = await fetch("/api/uploadToImageKit", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.details);
  } else {
    const data = await res.json();
    return data.url;
  }
};

export const getPosts = async () => {
  const res = await axios.get(`${BASEURL}/post/getPosts`);
  console.log(res.data);
  return res.data;
};

export const addComment = async (data: any) => {
  console.log(data);

  const res = await axios.post(`${BASEURL}/post/addComment`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(res.data);

  return res.data;
};

export const getUserPosts = async (userId: string) => {
  const res = await axios.get(`${BASEURL}/post/getUserPosts/${userId}`);
  console.log(res.data);
  return res.data;
};

export const getPost = async (postId: string) => {
  const res = await axios.get(`${BASEURL}/post/getPost/${postId}`);
  console.log(res.data);
  return res.data;
};

export const likePost = async (
  postId: string,
  userId: string,
  userName: string,
  avatar: string,
  fullName: string
) => {
  console.log(
    "in apiFunctions likePost",
    postId,
    userId,
    userName,
    avatar,
    fullName
  );
  console.log("fullName", fullName);

  const res = await axios.post(
    `${BASEURL}/post/likePost`,
    { postId, userId, userName, avatar, fullName },
    { headers: { "Content-Type": "application/json" } }
  );

  return res.data;
};

export const fetchPost = async (postId: string) => {
  const res = await axios.get(`${BASEURL}/post/fetchPost/${postId}`);
  console.log(res.data);
  return res.data;
};

export const updatePost = async (data: any) => {
  console.log(data);
  const res = await axios.post(`${BASEURL}/post/updatePost`, data, {
    headers: { "Content-Type": "application/json" },
  });
  console.log(res.data);
  return res.data;
};

export const deletePost = async (postId: string) => {
  const res = await axios.delete(`${BASEURL}/post/deletePost/${postId}`);
  console.log(res.data);
  return res.data;
};

export const editProfile = async (data: { [key: string]: string }) => {
  console.log(data);

  try {
    const res = await axios.post(`${BASEURL}/user/editProfile`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.data;
  } catch (err: any) {
    const status = err.response?.status;
    const message = err.response?.data! || "Something went wrong";

    throw {
      status,
      message,
      full: err.response?.data,
    };
  }
};

export const searchUsers = async (query: string) => {
  const res = await axios.get(`${BASEURL}/user/search`, {
    params: { query },
  });

  return res.data;
};

export const getAllData = async () => {
  const res = await axios.get(`${BASEURL}/post/getAllPosts`);
  console.log(res.data);
  return res.data;
};

export const deleteUser = async (userId: string) => {
  console.log(userId);

  const res = await axios.delete(`${BASEURL}/user/deleteUser/${userId}`);
  console.log(res.data);
  return res.data;
};
