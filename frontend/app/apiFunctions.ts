import axios from "axios";

export const checkUser = async (userId: string): Promise<any> => {
  const res = await axios.get(
    `http://localhost:3001/user/check-auth/${userId}`
  );
  return res.data;
};

export const setProfile = async (formData: FormData): Promise<any> => {
  try {
    const res = await axios.post(
      "http://localhost:3001/user/setProfile",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

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
    const res = await axios.post("http://localhost:3001/post/create", data, {
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
  const res = await axios.get("http://localhost:3001/post/getPosts");
  console.log(res.data);
  return res.data;
};

export const addComment = async (data: any) => {
  console.log(data);

  const res = await axios.post("http://localhost:3001/post/addComment", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(res.data);

  return res.data;
};

export const getUserPosts = async (userId: string) => {
  const res = await axios.get(
    `http://localhost:3001/post/getUserPosts/${userId}`
  );
  console.log(res.data);
  return res.data;
};

export const getPost = async (postId: string) => {
  const res = await axios.get(`http://localhost:3001/post/getPost/${postId}`);
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
  console.log(postId, userId, userName, avatar);

  const res = await axios.post(
    "http://localhost:3001/post/likePost",
    { postId, userId, userName, avatar, fullName },
    { headers: { "Content-Type": "application/json" } }
  );

  return res.data;
};

export const fetchPost = async (postId: string) => {
  const res = await axios.get(`http://localhost:3001/post/fetchPost/${postId}`);
  console.log(res.data);
  return res.data;
};

export const updatePost = async (data: any) => {
  console.log(data);
  const res = await axios.post("http://localhost:3001/post/updatePost", data, {
    headers: { "Content-Type": "application/json" },
  });
  console.log(res.data);
  return res.data;
};

export const deletePost = async (postId: string) => {
  const res = await axios.delete(
    `http://localhost:3001/post/deletePost/${postId}`
  );
  console.log(res.data);
  return res.data;
};

export const editProfile = async (data: { [key: string]: string }) => {
  console.log(data);

  try {
    const res = await axios.post(
      "http://localhost:3001/user/editProfile",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

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
  const res = await axios.get("http://localhost:3001/user/search", {
    params: { query },
  });

  return res.data;
};

export const getAllData = async () => {
  const res = await axios.get("http://localhost:3001/post/getAllPosts");
  console.log(res.data);
  return res.data;
};
