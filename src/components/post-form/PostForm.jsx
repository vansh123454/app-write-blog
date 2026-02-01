import React, { useEffect, useCallback } from "react";
import service from "../../appwriteServices/config";
import authService from "../../appwriteServices/auth";
import { useSelector } from "react-redux";
import { Button, Input, Logo, RTE } from "../index";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Select from "../Select";

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    const user = await authService.getCurrentUser();
    const userId = user.$id;

    try {
      if (post) {
        const file = data.image[0]
          ? await service.uploadFile(data.image[0])
          : null;
        if (file) service.fileDelete(post.featuredImage);

        const dbPost = await service.updatePost(post.$id, {
          title: data.title,
          content: data.content,
          status: data.status,
          slug: data.slug,
          featuredImage: file ? file.$id : post.featuredImage,
        });
        if (dbPost) navigate(`/post/${dbPost.slug}`);
      } else {
        if (!data.image?.[0]) {
          alert("Please select an image");
          return;
        }
        const file = await service.uploadFile(data.image[0]);
        if (file) {
          const dbPost = await service.createPost({
            title: data.title,
            content: data.content,
            slug: data.slug,
            featuredImage: file.$id,
            status: data.status,
            userId,
          });
          if (dbPost) navigate(`/post/${dbPost.slug}`);
        }
      }
    } catch (error) {
      console.error("Error submitting post:", error);
      alert("Error submitting post. Check console for details.");
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
    }
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue, slugTransform]);

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8"
    >
      {/* Left section */}
      <div className="md:col-span-2 space-y-6">
        <Input
          label="Title"
          placeholder="Post Title"
          {...register("title", { required: true })}
        />

        <Input
          label="Slug"
          placeholder="post-slug"
          {...register("slug", { required: true })}
          onInput={(e) =>
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            })
          }
        />

        <div className="mt-4">
          <RTE
            label="Content"
            name="content"
            control={control}
            defaultValues={getValues("content")}
          />
        </div>
      </div>

      {/* Right section */}
      <div className="space-y-6">
        <Input
          label="Featured Image"
          type="file"
          accept="image/*"
          {...register("image", { required: !post })}
        />

        {post && (
          <div className="rounded-xl overflow-hidden border">
            <img
              src={service.getPreviewFile(post.featuredImage)}
              alt={post.title}
              className="w-full h-40 object-cover"
            />
          </div>
        )}

        <Select
          options={["active", "inactive"]}
          label="Status"
          {...register("status", { required: true })}
        />

        <Button
          type="submit"
          className="w-full cursor-pointer py-3 text-lg font-semibold"
        >
          {post ? "Update Post" : "Create Post"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
