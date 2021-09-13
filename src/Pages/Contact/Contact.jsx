import React from "react";
import Layout from "../../Components/Layout";

export default () => {
  return (
    <Layout>
      <h2>Contact our Support</h2>
      <form
        action="https://plus.dropzone.dev/_p/613ef759f02d1532e38aa7b9"
        method="post"
        enctype="multipart/form-data"
      >
        <input type="text" name="name" placeholder="Name" />
        <input type="text" name="email" placeholder="Email" />

        <h3>Attach an image (optional)</h3>
        <input type="file" name="image" />

        <button type="submit">Send</button>
      </form>
    </Layout>
  );
};
